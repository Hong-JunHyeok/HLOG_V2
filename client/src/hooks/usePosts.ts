import { useQuery } from 'react-query';
import customAxios from '@/utils/customAxios';

interface AxiosResponseWithPayload<T=any> {
  payload: {
    [key: string]: T;
  }
}

const getRecentPosts =  () => {
  return customAxios.get<AxiosResponseWithPayload>('/post/recent');
}

const getPopularPosts =  () => {
  return customAxios.get<AxiosResponseWithPayload>('/post/popular');
}

type PostsQueryType = "RECENT" | "POPULAR";

export default function usePosts (queryType: PostsQueryType) {
  switch(queryType) {
    case "RECENT":
      return useQuery('recent_posts', getRecentPosts);
    case "POPULAR":
      return useQuery('popular_posts', getPopularPosts);
    default:
      throw new Error(`Unhandled Query Type : ${queryType}`)
  }
};
