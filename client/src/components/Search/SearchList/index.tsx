import { useAutoAnimate } from '@formkit/auto-animate/react';
import useSearch from '@/hooks/queries/useSearch';
import useSearchData from '@/hooks/useSearchData';
import SearchItem from '../SearchItem';
import StyledSearchList from './StyledSearchList';
import useDebounce from '@/hooks/useDebounce';

const SearchList = () => {
  const [animatedParentRef] = useAutoAnimate<HTMLDivElement>();
  const { search } = useSearchData();
  const debouncedSearch = useDebounce(search);
  const { data } = useSearch(debouncedSearch);

  return (
    <StyledSearchList.Container ref={animatedParentRef}>
      {data?.posts.map((post) => <SearchItem key={post.id} post={post} />)}
    </StyledSearchList.Container>
  );
};

export default SearchList;
