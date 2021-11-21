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
