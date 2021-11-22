import customAxios from "../customAxios";
import { getMyInfoRequest } from "../../apis/user";

const loginInitializer = (authDispatch: Function) => {
  const accessToken = localStorage.getItem("hlog_access_token");
  getMyInfoRequest(accessToken).then((response) => {
    authDispatch({
      type: "GET_MY_INFO_SUCCESS",
      payload: response.payload,
    });
  });

  customAxios.defaults.headers.common["authorization"] = accessToken;
};

export default loginInitializer;
