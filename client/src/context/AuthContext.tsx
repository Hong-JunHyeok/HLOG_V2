import { createContext, Dispatch, useState } from "react";

type Context = {
  user: User;
  setUser: Dispatch<React.SetStateAction<User>>;
}
const AuthContext = createContext<Context>({
  user: null,
  setUser: null,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;
