import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';

const Login: React.FC = () => {
  const handleGoogleLogin = () => {
    console.log("구글 로그인 클릭됨");
  };

  return (
    <LoginWrapper>
        <Title>로그인</Title>
        <LoginButton onClick={handleGoogleLogin}>
          <FcGoogle size={30} />
          <span>구글 계정으로 로그인</span>
        </LoginButton>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
`;

const Title = styled.text`
  font-size: 2rem;
  fon-weight: lighter;
  margin-bottom: 2rem;
`;

const LoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: #fff;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #f1f1f1;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  span {
    font-size: 1rem;
  }
`;

export default Login;