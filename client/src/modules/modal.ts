import { AnyAction } from 'redux';

export const MODAL_OPEN = 'MODAL_OPEN' as const;
export const MODAL_CLOSE = 'MODAL_CLOSE' as const;

interface AuthStateType {
  isOpen: boolean;
}

const initialState: AuthStateType = {
  isOpen: false,
};

function modalReducer(state = initialState, action: AnyAction): AuthStateType {
  switch (action.type) {
    case MODAL_OPEN:
      return {
        isOpen: true,
      };
    case MODAL_CLOSE:
      return {
        isOpen: false,
      };
    default:
      return { ...state };
  }
}

export default modalReducer;
