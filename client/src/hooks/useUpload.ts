import { useState } from 'react';
import useInterceptedAxios from './useInterceptedAxios';

const useUpload = (endPoint: string) => {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const customAxios = useInterceptedAxios();

  if (!endPoint) {
    throw new Error('endPoint is required');
  }

  const upload = async (formData: FormData) => {
    setUploading(true);
    await customAxios({
      data: formData,
      url: endPoint,
      method: 'patch',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const newProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress(newProgress);
      },
    });

    setUploading(false);
  };

  return {
    upload,
    progress,
    uploading,
  };
};

export default useUpload;
