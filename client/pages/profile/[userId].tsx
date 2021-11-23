import React, { useEffect } from "react";
import Header from "../../components/Common/Header";
import NoData from "../../assets/svg/no_data.svg";
import loginInitializer from "../../utils/initializer/loginInitializer";
import { useAuthDispatch } from "../../contexts/AuthContext";

export default function Profile() {
  const authDispatch = useAuthDispatch();

  useEffect(() => {
    loginInitializer(authDispatch);
  }, []);

  return (
    <React.Fragment>
      <Header />
      <div
        style={{
          textAlign: "center",
        }}
      >
        <h1>프로필 페이지는 개발중입니다.</h1>
        <img
          src={NoData}
          alt=""
          style={{
            width: "500px",
          }}
        />
      </div>
      {/* <Footer /> */}
    </React.Fragment>
  );
}
