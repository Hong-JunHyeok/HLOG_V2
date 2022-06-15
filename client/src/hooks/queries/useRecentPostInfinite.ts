import { useInfiniteQuery } from 'react-query';
import customAxios from '@/utils/customAxios';
import { RECENT_POSTS_QUERY_KEY } from '@/constants/queries';

const useRecentPostInfinite = () => {
  const fetchPost = async ({ pageParam = 1 }) => {
    const result = await customAxios.get(`/post/recent?page=${pageParam}&size=10`);

    const { posts, isLast } = result.data.payload;
    return {
      result: posts,
      nextPage: pageParam + 1,
      isLast,
    };
  };

  const query = useInfiniteQuery([RECENT_POSTS_QUERY_KEY], fetchPost, {
    getNextPageParam: (lastPage) => {
      if (!lastPage.isLast) return lastPage.nextPage;
      return undefined;
    },
    select: null,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    retry: 1,
  });

  return query;
};

export default useRecentPostInfinite;
