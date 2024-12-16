import styled from "styled-components";
import Footer from "../footer/Footer";
import Header from "../header/Header";

interface LayoutProps {
  children: React.ReactNode; //리액트로 만든 컴포넌트
}

function Layout({children}: LayoutProps) {

  return (
    <LayoutContainer>
      <Header />
      <LayoutStyle>{children}</LayoutStyle>
      <Footer />
    </LayoutContainer>
  )
}

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const LayoutStyle = styled.main`
  flex: 1;
  display: flex; 
  justify-content: center;
  align-items: center;
  padding: 0.8rem;
`;

export default Layout;