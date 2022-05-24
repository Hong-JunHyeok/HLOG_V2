import { FormEvent, useCallback, useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import S from './StyledLoginForm';
import useLocationPush from "@/hooks/useLocationPush";
import useForm from "@/hooks/useForm";

const LoginForm = () => {
  const auth = useAuth();
  const [loginFormData, changeLoginFormData] = useForm({
    email: '',
    password: '',
  });

  const handlePushMain = useLocationPush('/');

  const handleLogin = async(event: FormEvent) => {
    event.preventDefault();
    try {
      const { email,password } = loginFormData;
      await auth.login(email, password);
      handlePushMain();
    } catch(error) {
      console.log(error.response.data.message);
    }
  }

  return (
    <S.Container>
      <S.Form onSubmit={handleLogin}>
        <div className="form_head">
          <h1>로그인</h1>
          <span>계정에 접근하려면 정보를 입력하세요.</span>
        </div>

        <button className="login_with_google">Google로 로그인</button>
        <div className="sep_line" />

        <label htmlFor="email">아이디 (이메일)</label>
        <input type="text" className="login_input" id="email" name="email" onChange={changeLoginFormData} />

        <label htmlFor="password">비밀번호</label>
        <input type="password" className="login_input" id="password" name="password" onChange={changeLoginFormData} />

        <button className="login_btn">로그인</button>
        
        <Link to="/join" className="not_a_user">회원이 아니신가요?</Link>
        <Link to="/forgot" className="forgot_password">비밀번호를 잊으셨나요?</Link>
      </S.Form>
      <S.Info>
        <span className="info_text">HLOG에서 글을 작성해보세요.</span>
      </S.Info>
    </S.Container>
  )
};

export default LoginForm;
