import useModals from '@/hooks/useModals';
import ModalPortal from './ModalPortal';
import Modal from '@/components/Modal';

const ModalsProvider = () => {
  const {
    openedModals,
    closeModal,
  } = useModals();

  const modalsMap = Object.entries(openedModals)
    .map(([modalKey, { Component, props }]) => {
      const handleOutsideClick = () => {
        closeModal(modalKey);
      };

      return (
        <Modal
          key={modalKey}
          outsideClickHandler={handleOutsideClick}
        >
          <Component {...props} />
        </Modal>
      );
    });

  return (
    <ModalPortal>
      {modalsMap}
    </ModalPortal>
  );
};

export default ModalsProvider;
