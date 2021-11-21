import React, { createContext, useReducer, useContext } from "react";

export type AuthContextType = {
  isLoggedIn: boolean;
  loginLoading: boolean;
  loginError: Error | null;
};

function authReducer(state: AuthContextType, action: any): AuthContextType {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: false,
        loginLoading: true,
        loginError: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loginLoading: false,
        isLoggedIn: true,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        loginError: action.payload,
      };
  }
}

const initialState = {
  isLoggedIn: false,
  loginError: null,
  loginLoading: false,
};

export const AuthStateContext = createContext(null);
export const AuthDispatchContext = createContext(null);

const AuthProvider: React.FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <React.Fragment>
      <AuthStateContext.Provider value={state}>
        <AuthDispatchContext.Provider value={dispatch}>
          {children}
        </AuthDispatchContext.Provider>
      </AuthStateContext.Provider>
    </React.Fragment>
  );
};

export default AuthProvider;

export const useAuthState = (): AuthContextType => {
  return useContext(AuthStateContext);
};

export const useAuthDispatch = () => {
  return useContext(AuthDispatchContext);
};
