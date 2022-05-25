import { Dispatch, useContext } from 'react';
import AuthContext from '@/context/AuthContext';

type Context = {
  user: User;
  setUser: Dispatch<any>;
}

const useUser = (): Context => {
  return useContext(AuthContext)
}

export default useUser
