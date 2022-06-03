import { useAutoAnimate } from '@formkit/auto-animate/react';
import useSearch from '@/hooks/queries/useSearch';
import useSearchData from '@/hooks/useSearchData';
import SearchItem from '../SearchItem';
import StyledSearchList from './StyledSearchList';

const SearchList = () => {
  const [animatedParentRef] = useAutoAnimate<HTMLDivElement>();
  const { search } = useSearchData();
  const { data } = useSearch(search);

  return (
    <StyledSearchList.Container ref={animatedParentRef}>
      {data?.posts.map((post) => <SearchItem key={post.id} post={post} />)}
    </StyledSearchList.Container>
  );
};

export default SearchList;
