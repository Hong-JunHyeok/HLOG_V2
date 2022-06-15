import { AnyAction } from 'redux';

export const OPEN_MODAL = 'OPEN_MODAL' as const;
export const CLOSE_MODAL = 'CLOSE_MODAL' as const;
export const CLOSE_ALL_MODAL = 'CLOSE_ALL_MODAL' as const;

interface ModalType {
  Component: React.ElementType;
  props: { [key: string]: unknown }
}

interface ModalStateType {
  openedModals: { [key: string]: ModalType };
}

const initialState: ModalStateType = {
  openedModals: {},
};

function modalReducer(state = initialState, action: AnyAction): ModalStateType {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        openedModals: {
          ...state.openedModals,
          [action.payload.modalKey]: {
            Component: action.payload.Component,
            props: action.payload.props,
          },
        },
      };
    case CLOSE_MODAL: {
      const temp = { ...state.openedModals };
      delete temp[action.payload.modalKey];
      return {
        ...state,
        openedModals: temp,
      };
    }
    case CLOSE_ALL_MODAL:
      return {
        ...state,
        openedModals: {},
      };
    default:
      return { ...state };
  }
}

export default modalReducer;
