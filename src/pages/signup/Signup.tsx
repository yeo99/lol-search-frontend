import styled from 'styled-components';

const Signup: React.FC = () => {
  const handleContinue = () => {
    console.log("계속하기 버튼 클릭됨");
  };

  return (
    <SignupWrapper>
      <Title>가입을 환영합니다!</Title>
      <Description>
        LOL CHAT은 소환사 사이의 커넥션을 이루는 커뮤니티를 지향합니다. <br />
        Riot ID와 태그를 입력 완료 후 모험을 시작하세요.
      </Description>

      <Form>
        <InputWrapper>
          <Input type="text" placeholder="Riot ID" />
          <Input type="text" placeholder="KR1" />
        </InputWrapper>
        <ContinueButton onClick={handleContinue}>계속하기</ContinueButton>
      </Form>
    </SignupWrapper>
  );
};

const SignupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const Description = styled.p`
  font-size: 1rem;
  text-align: center;
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const Form = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 1rem;

  input:first-child {
    flex: 2;
  }

  input:last-child {
    flex: 1;
  }
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
  width: 100%;
`;

const ContinueButton = styled.button`
  padding: 1rem;
  background-color: #005A82;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #004066;
  }
`;

export default Signup;
