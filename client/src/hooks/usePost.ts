import customAxios from "@/utils/customAxios";
import { useQuery } from "react-query";

const getPost = (id: number) => {
  return customAxios.get(`/post/${id}`);
}

export default function usePost (id: number) {
  return useQuery([`post_view_${id}`, id], () => getPost(id));
}
