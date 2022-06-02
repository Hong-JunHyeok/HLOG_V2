import { useCallback, useMemo } from 'react';
import PageLayout from '@/components/Common/PageLayout';
import SEOHelmet from '@/components/Common/SEOHelmet';
import HomeTab from '@/components/Common/HomeTab';
import usePopularPostInfinite from '@/hooks/queries/usePopularPostInfinite';
import PostList from '@/components/Post/PostList';
import useIntersection from '@/hooks/useIntersection';

const PopularPage = () => {
  const { fetchNextPage, data } = usePopularPostInfinite();
  const mergePosts = useMemo(() => data.pages.flatMap((page) => page.result), [data.pages]);

  const onIntersect = useCallback(async (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver,
  ) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      await fetchNextPage();
      observer.observe(entry.target);
    }
  }, [fetchNextPage]);

  const target = useIntersection(onIntersect);

  return (
    <>
      <SEOHelmet
        title="HLOG | 인기 게시글"
      />
      <PageLayout>
        <HomeTab />
        <PostList posts={mergePosts} />
        <div ref={target}>Target</div>
      </PageLayout>
    </>
  );
};

export default PopularPage;
