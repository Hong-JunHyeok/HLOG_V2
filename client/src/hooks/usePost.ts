
import { PostType } from "@/@types/post";
import { useQuery, UseQueryResult } from "react-query";
import useInterceptedAxios from "./useInterceptedAxios";

interface QueryResult {
  post: PostType;
}

export default function usePost (id: number): UseQueryResult<QueryResult> {
  const customAxios = useInterceptedAxios();
  const getPost = (id: number) => {
    return customAxios.get(`/post/${id}`);
  }
  return useQuery([`post_view_${id}`, id], () => getPost(id));
}
