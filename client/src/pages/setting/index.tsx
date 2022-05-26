import { useEffect } from 'react';
import useMyInfo from '@/hooks/useMyInfo';

function SettingPage() {
  const { data } = useMyInfo();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return <>Setting Page</>;
}

export default SettingPage;
