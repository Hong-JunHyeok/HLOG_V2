import { useDispatch } from "react-redux";
import { ModalState, open } from '@/modules/modal.slice';

const useModal = () => {
  const dispatch = useDispatch();

  const openModal = (payload: ModalState) => {
    dispatch(open(payload))
  }

  return { openModal };
}

export default useModal;
