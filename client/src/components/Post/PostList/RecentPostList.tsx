import { useCallback, useMemo } from 'react';
import useIntersection from '@/hooks/useIntersection';
import PostList from '.';

import useRecentPostInfinite from '@/hooks/queries/useRecentPostInfinite';

const RecentPostList = () => {
  const {
    fetchNextPage, hasNextPage, data, isLoading,
  } = useRecentPostInfinite();

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

export default RecentPostList;
