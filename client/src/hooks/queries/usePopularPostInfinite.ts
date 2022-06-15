import { useInfiniteQuery } from 'react-query';
import customAxios from '@/utils/customAxios';
import { POPULAR_POSTS_QUERY_KEY } from '@/constants/queries';

const usePopularPostInfinite = () => {
  const fetchPost = async ({ pageParam = 1 }) => {
    const result = await customAxios.get(`/post/popular?page=${pageParam}&size=10`);

    const { posts, isLast } = result.data.payload;
    return {
      result: posts,
      nextPage: pageParam + 1,
      isLast,
    };
  };

  const query = useInfiniteQuery([POPULAR_POSTS_QUERY_KEY], fetchPost, {
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

export default usePopularPostInfinite;
