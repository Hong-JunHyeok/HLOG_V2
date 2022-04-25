interface IJoinData {
  email: string;
  password: string;
  checkPassword: string;
  username: string;
}

type ValidatorReturnType = {
  message: string;
  type: "EMPTY" | "WRONG" | "SUCCESS";
};

export const joinValidation = (joinData: IJoinData): ValidatorReturnType => {
  const { email, password, checkPassword, username } = joinData;

  process.env.NODE_ENV === "development" && console.table(joinData);

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
  } else if (!checkPassword.trim()) {
    return {
      message: "확인용 비밀번호를 입력해주세요.",
      type: "EMPTY",
    };
  } else if (!username.trim()) {
    return {
      message: "이름을 입력해주세요.",
      type: "EMPTY",
    };
  } else {
    return {
      message: "회원가입 성공",
      type: "SUCCESS",
    };
  }
};
