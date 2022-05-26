import { UserType } from "@/@types/user";
import { useQuery, UseQueryResult } from "react-query";
import useInterceptedAxios from "./useInterceptedAxios";

interface QueryResult {
  user: UserType
}

export default function useUserInfo(userId: number): UseQueryResult<QueryResult> {
  const customAxios = useInterceptedAxios();

  const getUserInfo = (id: number) => {
    return customAxios.get(`/user/${id}`);
  }
  return useQuery(`user_info`, () => getUserInfo(userId));
}
