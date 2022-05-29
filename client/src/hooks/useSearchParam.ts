import { useLocation } from 'react-router-dom';
import qsParser from '@/utils/qsParser';

const useSearchParam = () => {
  const { search } = useLocation();
  if (!search) return;
  const result = qsParser(search);

  return result;
};

export default useSearchParam;
