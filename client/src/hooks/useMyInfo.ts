import customAxios from "@/utils/customAxios";
import { useQuery } from "react-query";

const getMyInfo = (id: number) => {
  return customAxios.get(`/user/${id}`);
}

export default function useMyInfo(userId: number) {
  return useQuery(`my_info`, () => getMyInfo);
}
