import React, { useState } from 'react';

const useForm = <T>(initialState: T): [T, (e: React.ChangeEvent<HTMLInputElement>) => void] => {
  const [formData, setFormData] = useState(initialState);

  const changeFormData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return [formData, changeFormData];
};

export default useForm;
