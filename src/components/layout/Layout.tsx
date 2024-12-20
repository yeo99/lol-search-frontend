import styled from "styled-components";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import { LayoutProps } from "../../types/type";

function Layout({ children }: LayoutProps) {
  return (
    <LayoutContainer>
      <Header />
      <LayoutStyle>{children}</LayoutStyle>
      <Footer />
    </LayoutContainer>
  );
}

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const LayoutStyle = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 0.8rem;
`;

export default Layout;
