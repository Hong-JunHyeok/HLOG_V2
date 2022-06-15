import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@/modules';
import { CLOSE_ALL_MODAL, CLOSE_MODAL, OPEN_MODAL } from '@/modules/modal';

const useModals = () => {
  const { openedModals } = useTypedSelector((state) => state.modal);
  const dispatch = useDispatch();

  const openModal = (
    modalKey: string,
    Component: React.ElementType,
    props?: { [key: string]: unknown },
  ) => {
    dispatch({
      type: OPEN_MODAL,
      payload: {
        modalKey,
        Component,
        props,
      },
    });
  };

  const closeModal = (modalKey: string) => {
    dispatch({
      type: CLOSE_MODAL,
      payload: {
        modalKey,
      },
    });
  };

  const closeAllModal = () => {
    dispatch({
      type: CLOSE_ALL_MODAL,
    });
  };

  return {
    openedModals,
    openModal,
    closeModal,
    closeAllModal,
  };
};

export default useModals;
