import { PostType } from "@/@types/post";
import { useQuery, UseQueryResult } from "react-query";
import useInterceptedAxios from "./useInterceptedAxios";

interface QueryResult {
  posts: PostType[]
}

export default function useUserPosts(userId: number): UseQueryResult<QueryResult> {
  const customAxios = useInterceptedAxios();

  const getUserPosts = (id: number) => {
    return customAxios.get(`/post/user/${id}`);
  }
  return useQuery(`user_posts`, () => getUserPosts(userId));
}
