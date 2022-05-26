import { UserType } from "@/@types/user";
import { useQuery, UseQueryResult } from "react-query";
import useInterceptedAxios from "./useInterceptedAxios";

interface QueryResult {
  user: UserType;
}

export default function useMyInfo (): UseQueryResult<QueryResult> {
  const customAxios = useInterceptedAxios();
  const getMyInfo = () => {
    return customAxios.get(`/user/me`);
  }
  return useQuery([`my_info`], () => getMyInfo());
}
