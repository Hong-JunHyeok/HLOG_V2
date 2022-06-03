import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@/modules';
import { SET_SEARCH } from '@/modules/search';

const useSearchData = () => {
  const { search } = useTypedSelector((state) => state.search);
  const dispatch = useDispatch();

  const setSearch = (keyword: string) => {
    dispatch({
      type: SET_SEARCH,
      payload: keyword,
    });
  };

  return {
    search,
    setSearch,
  };
};

export default useSearchData;
