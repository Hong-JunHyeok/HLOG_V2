import customAxios from "../utils/customAxios";

interface ILoginData {
  email: string;
  password: string;
}

export const loginRequest = async (loginData: ILoginData) => {
  try {
    const response = await customAxios.post(`/auth/login`, {
      email: loginData.email,
      password: loginData.password,
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

interface IJoinData {
  email: string;
  password: string;
  username: string;
}

export const joinRequest = async (joinData: IJoinData) => {
  try {
    const response = await customAxios.post(`/auth/join`, {
      ...joinData,
    });

    return response.data;
  } catch (error) {
    return error.response;
  }
};
