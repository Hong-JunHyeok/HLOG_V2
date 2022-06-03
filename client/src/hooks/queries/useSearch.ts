import { useQuery, UseQueryResult } from 'react-query';
import customAxios from '@/utils/customAxios';
import { PostType } from '@/@types/post';

interface QueryResult {
  posts: PostType[];
}

const useSearch = (keyword: string): UseQueryResult<QueryResult> => {
  const getPostsByKeyword = (q: string) => customAxios.get('/post/search', {
    params: { q },
  });
  return useQuery(['search', keyword], () => getPostsByKeyword(keyword), {
    enabled: Boolean(keyword),
  });
};

export default useSearch;
