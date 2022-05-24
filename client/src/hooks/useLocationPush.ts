import { useNavigate } from 'react-router-dom';

const useLocationPush = (path: string) => {
  const navigate = useNavigate();

  return () => navigate(path);
}

export default useLocationPush;
