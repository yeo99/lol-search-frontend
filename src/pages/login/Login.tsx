import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate(); 

  const handleGoogleLogin = () => {
    const url = `https://accounts.google.com/o/oauth2/auth?` +
      `client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&` +
      `redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&` +
      `response_type=code&` +
      `scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;
    window.location.href = url;
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const code = query.get('code');
    
    if (code) {
      const fetchUserData = async (code: string) => {
        try {
          const response = await fetch('http://localhost:9999/users/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
          });

          if (response.ok) {
            const data = await response.json();
            if (data.token) {
              console.log('로그인 성공:', data);
              localStorage.setItem('token', data.token);
              navigate('/');
            } else {
              console.error('로그인 실패: 응답에 토큰이 없습니다.', data);
            }
          } else {
            console.error('HTTP 에러:', response.status);
            const errorData = await response.json();
            console.error('에러 메시지:', errorData.message || '에러 메시지가 없습니다.');
          }
        } catch (error) {
          console.error('네트워크 에러:', error);
        }
      };

      fetchUserData(code);
    }
  }, [navigate]);

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

const Title = styled.p`
  font-size: 2rem;
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
