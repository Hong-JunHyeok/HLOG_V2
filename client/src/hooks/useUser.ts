import { Dispatch, useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import type { UserType } from '@/@types/user';

type Context = {
  user: UserType;
  setUser: Dispatch<any>;
}

const useUser = (): Context => {
  return useContext(AuthContext)
}

export default useUser
