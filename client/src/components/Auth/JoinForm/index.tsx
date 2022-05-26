import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorModal from '@/components/Modal/Error/ErrorModal';
import S from './StyledJoinForm';
import useInterceptedAxios from '@/hooks/useInterceptedAxios';

interface JoinFormType {
  email: string;
  password: string;
  passwordCheck: string;
  username: string;
}

const JoinForm = () => {
  const customAxios = useInterceptedAxios();
  const {
    register, handleSubmit, formState: { errors },
    getValues,
  } = useForm({ mode: 'onChange' });

  const navigate = useNavigate();
  const [errorModalOpened, setErrorModalOpened] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handlePushLogin = () => navigate('/login');

  const onSubmit = async (data: JoinFormType) => {
    const { email, password, username } = data;
    try {
      await customAxios.post('/auth/join', { email, password, username });
      handlePushLogin();
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setErrorModalOpened(true);
    }
  };

  const onError = (error) => error;

  return (
    <>
      <S.Container>
        <S.Form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="form_head">
            <h1>회원가입</h1>
            <span>정보를 입력하여 HLOG에 합류해주세요.</span>
          </div>

          <label htmlFor="id">아이디 (이메일)</label>
          <input
            type="text"
            className="join_input"
            id="email"
            name="email"
            {...register('email', {
              required: {
                message: '이메일을 입력해주세요.',
                value: true,
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '이메일 형식이 맞지 않습니다.',
              },
              minLength: {
                message: '이메일은 최소 10자 이상이여야 합니다.',
                value: 10,
              },
            })}
          />
          <span className="form_error">{errors.email && errors.email.message}</span>

          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            className="join_input"
            id="password"
            name="password"
            {...register('password', {
              required: {
                message: '비밀번호를 입력해주세요.',
                value: true,
              },
              minLength: {
                message: '비밀번호는 최소 8자 이상이여야 합니다.',
                value: 8,
              },
            })}
          />
          <span className="form_error">{errors.password && errors.password.message}</span>

          <label htmlFor="password_check">비밀번호 확인</label>
          <input
            type="password"
            className="join_input"
            id="password_check"
            name="passwordCheck"
            {...register('passwordCheck', {
              required: {
                message: '비밀번호를 입력해주세요.',
                value: true,
              },
              validate: (value) => value === getValues('password') || '비밀번호가 일치하지 않습니다.',
            })}
          />
          <span className="form_error">{errors.passwordCheck && errors.passwordCheck.message}</span>

          <label htmlFor="name">이름</label>
          <input
            type="text"
            className="join_input"
            id="name"
            name="username"
            {...register('username', {
              required: {
                message: '이름을 입력해주세요.',
                value: true,
              },
            })}
          />
          <span className="form_error">{errors.username && errors.username.message}</span>

          <button className="join_btn">회원가입</button>

          <Link to="/login" className="go_to_login">이미 회원이신가요?</Link>
        </S.Form>
        <S.Info>
          <span className="info_text">HLOG에서 양질의 포스트들을 확인해보세요.</span>
        </S.Info>
      </S.Container>

      {errors && <p>{errors.toString()}</p>}

      {errorModalOpened
        && (
        <ErrorModal
          errorTitle={errorMessage}
          onClose={() => setErrorModalOpened(false)}
        />
        )}
    </>
  );
};

export default JoinForm;
