import styled from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";

function Header() {
  return (
    <HeaderStyle>
      <h1 style={{ fontSize: '1.5rem' }}>LOL Search</h1>
      <GiHamburgerMenu style={{ fontSize: '1.5rem' }}/>
    </HeaderStyle>
  )
}

const HeaderStyle = styled.header`
  @font-face {
    font-family: 'KimjungchulMyungjo-Bold';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2302_01@1.0/KimjungchulMyungjo-Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
  }

  font-family: 'KimjungchulMyungjo-Bold';
  background: linear-gradient(#0A323C, #005A82);
  color: #C89B3C;
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`

export default Header;