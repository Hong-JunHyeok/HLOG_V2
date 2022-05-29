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

  return useQuery(
    queryType === 'RECENT' ? 'recent_posts' : 'popular_posts',
    queryType === 'RECENT' ? getRecentPosts : getPopularPosts,
    {
      onSuccess: () => {},
    },
  );
}
