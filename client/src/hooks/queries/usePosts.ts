import { useQuery, UseQueryResult } from 'react-query';
import useInterceptedAxios from '../useInterceptedAxios';
import { PostType } from '@/@types/post';

type PostsQueryType = 'RECENT' | 'POPULAR';

interface QueryResult {
  posts: PostType[];
}

export default function usePosts(queryType: PostsQueryType): UseQueryResult<QueryResult> {
  const customAxios = useInterceptedAxios();

  const getRecentPosts = () => customAxios.get('/post/recent');

  const getPopularPosts = () => customAxios.get('/post/popular');

  switch (queryType) {
    case 'RECENT':
      return useQuery('recent_posts', getRecentPosts);
    case 'POPULAR':
      return useQuery('popular_posts', getPopularPosts);
    default:
      throw new Error(`Unhandled Query Type : ${queryType}`);
  }
}
