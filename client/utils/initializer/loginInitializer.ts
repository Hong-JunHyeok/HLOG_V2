import customAxios from "../customAxios";
import { getMyInfoRequest } from "../../apis/user";

const loginInitializer = (authDispatch: Function) => {
  const accessToken = localStorage.getItem("hlog_access_token");

  if (!accessToken) {
    return;
  }

  getMyInfoRequest(accessToken)
    .then((response) => {
      if (response.status === 401) {
        alert("토큰이 만료되었습니다.");
      }

      authDispatch({
        type: "GET_MY_INFO_SUCCESS",
        payload: response.payload,
      });
    })
    .catch((error) => {
      authDispatch({
        type: "GET_MY_INFO_ERROR",
        payload: error,
      });
    });

  customAxios.defaults.headers.common["authorization"] = accessToken;
};

export default loginInitializer;
