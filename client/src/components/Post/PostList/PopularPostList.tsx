import { useCallback, useMemo } from 'react';
import usePopularPostInfinite from '@/hooks/queries/usePopularPostInfinite';
import useIntersection from '@/hooks/useIntersection';
import PostList from '.';

const PopularPostList = () => {
  const {
    fetchNextPage, hasNextPage, data, isLoading,
  } = usePopularPostInfinite();

  const onIntersect = useCallback(() => {
    if (hasNextPage && !isLoading) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isLoading]);

  const mergePosts = useMemo(() => data.pages.flatMap((page) => page.result), [data.pages]);
  const target = useIntersection(onIntersect, {
    disable: !hasNextPage,
  });

  return (
    <>
      <PostList posts={mergePosts} />
      <div ref={target} />
    </>
  );
};

export default PopularPostList;
