import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@/modules';
import { MODAL_CLOSE, MODAL_OPEN } from '@/modules/modal';

const useModal = () => {
  const { isOpen } = useTypedSelector((state) => state.modal);
  const dispatch = useDispatch();

  const openModal = useCallback(() => {
    dispatch({
      type: MODAL_OPEN,
    });
  }, [dispatch]);

  const closeModal = useCallback(() => {
    dispatch({
      type: MODAL_CLOSE,
    });
  }, [dispatch]);

  // TODO: Returns Modal, openModal, closeModal
  return {
    isOpen,
    openModal,
    closeModal,
  };
};

export default useModal;
