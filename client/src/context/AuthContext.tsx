import type { UserType } from "@/@types/user";
import { createContext, Dispatch, useState } from "react";

type Context = {
  user: UserType;
  setUser: Dispatch<React.SetStateAction<UserType>>;
}
const AuthContext = createContext<Context>({
  user: null,
  setUser: null,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<UserType>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;
