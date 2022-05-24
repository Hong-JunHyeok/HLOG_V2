import useAuth from "@/hooks/useAuth";
import useForm from "@/hooks/useForm";
import useLocationPush from "@/hooks/useLocationPush";
import customAxios from "@/utils/customAxios";
import { FormEvent } from "react";
import { Link } from "react-router-dom";
import S from './StyledJoinForm';

const JoinForm = () => {
  const [joinFormData, changeJoinFormData] = useForm({
    email: '',
    password: '',
    passwordCheck: '',
    username: ''
  })

  const handlePushLogin = useLocationPush('/login');

  const handleJoin = async(event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await customAxios.post('/auth/join', joinFormData)
      console.log(response.data);
      
      handlePushLogin();
    } catch(error) {
      // Error Modal
      console.log("회원가입에 실패했습니다.")
    }
  }

  return (
    <S.Container>
        <S.Form onSubmit={handleJoin}>
          <div className="form_head">
            <h1>회원가입</h1>
            <span>정보를 입력하여 HLOG에 합류해주세요.</span>
          </div>

          <label htmlFor="id">아이디 (이메일)</label>
          <input type="text" className="join_input" id="id" name="email" onChange={changeJoinFormData} />

          <label htmlFor="password">비밀번호</label>
          <input type="password" className="join_input" id="password" name="password" onChange={changeJoinFormData} />

          <label htmlFor="password_check">비밀번호 확인</label>
          <input type="password" className="join_input" id="password_check" name="passwordCheck" onChange={changeJoinFormData} />

          <label htmlFor="name">이름</label>
          <input type="text" className="join_input" id="name" name="username" onChange={changeJoinFormData} />

          <button className="join_btn">회원가입</button>
          
          <Link to="/login" className="go_to_login">이미 회원이신가요?</Link>
        </S.Form>
        <S.Info>
          <span className="info_text">HLOG에서 양질의 포스트들을 확인해보세요.</span>
        </S.Info>
      </S.Container>
  )
}

export default JoinForm;
