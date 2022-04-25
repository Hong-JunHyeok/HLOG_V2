interface ILoginData {
  email: string;
  password: string;
}

type ValidatorReturnType = {
  message: string;
  type: "EMPTY" | "WRONG" | "SUCCESS";
};

export const loginValidation = (loginData: ILoginData): ValidatorReturnType => {
  const { email, password } = loginData;

  process.env.NODE_ENV === "development" && console.table(loginData);

  //* EMPTY Validate
  if (!email.trim()) {
    return {
      message: "이메일을 입력해주세요.",
      type: "EMPTY",
    };
  } else if (!password.trim()) {
    return {
      message: "비밀번호를 입력해주세요.",
      type: "EMPTY",
    };
  } else {
    return {
      message: "로그인 성공",
      type: "SUCCESS",
    };
  }
};
