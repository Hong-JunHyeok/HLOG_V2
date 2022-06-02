import { useInfiniteQuery } from 'react-query';
import customAxios from '@/utils/customAxios';

const usePopularPostInfinite = () => {
  const fetchPost = async ({ pageParam = 1 }) => {
    const result = await customAxios.get(`/post/popular?page=${pageParam}&size=5`);

    const { posts, isLast } = result.data.payload;
    return {
      result: posts,
      nextPage: pageParam + 1,
      isLast,
    };
  };

  const query = useInfiniteQuery(['popular_posts'], fetchPost, {
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
