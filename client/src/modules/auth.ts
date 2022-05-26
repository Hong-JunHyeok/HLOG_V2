import { AnyAction } from 'redux';

export const LOG_IN = 'LOG_IN' as const;
export const LOG_OUT = 'LOG_OUT' as const;

interface AuthStateType {
  isAuthenticated: boolean;
}

const initialState: AuthStateType = {
  isAuthenticated: false,
};

function authReducer(state = initialState, action: AnyAction): AuthStateType {
  switch (action.type) {
    case LOG_IN:
      return {
        isAuthenticated: true,
      };
    case LOG_OUT:
      return {
        isAuthenticated: false,
      };
    default:
      return { ...state };
  }
}

export default authReducer;
