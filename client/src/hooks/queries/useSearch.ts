import { useQuery, UseQueryResult } from 'react-query';
import customAxios from '@/utils/customAxios';
import { PostType } from '@/@types/post';
import { SEARCH_QUERY_KEY } from '@/constants/queries';

interface QueryResult {
  posts: PostType[];
}

const useSearch = (keyword: string): UseQueryResult<QueryResult> => {
  const getPostsByKeyword = (q: string) => customAxios.get('/post/search', {
    params: { q },
  });
  return useQuery([SEARCH_QUERY_KEY, keyword], () => getPostsByKeyword(keyword), {
    enabled: Boolean(keyword),
  });
};

export default useSearch;
