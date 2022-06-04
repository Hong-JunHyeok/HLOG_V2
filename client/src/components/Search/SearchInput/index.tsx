import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import useSearchData from '@/hooks/useSearchData';
import StyledSearchInput from './StyledSearchInput';

const SearchInput = () => {
  const { search, setSearch } = useSearchData();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleClearSearchData = () => setSearch('');

  // TODO: debouncing

  useEffect(() => {
    // TODO: Focus when rendering
  }, []);

  return (
    <StyledSearchInput.Container>
      <FontAwesomeIcon icon={solid('magnifying-glass')} className="search-icon" />
      <input
        type="text"
        value={search}
        onChange={handleChange}
        className="search_input"
        placeholder="포스트를 검색해보세요."
      />
      <button
        className={`search_clear_button ${search ? 'visible' : ''}`}
        type="button"
        onClick={handleClearSearchData}
      >
        <FontAwesomeIcon icon={regular('circle-xmark')} className="search-icon" />
      </button>
    </StyledSearchInput.Container>
  );
};
export default SearchInput;
