import styled from "styled-components";

function Footer() {
  return (
    <FooterStyled>
      <hr style={{border: '1px solid #005A82'}}/>
      <FooterText>Copyright © 2024 LOL Search</FooterText>
    </FooterStyled>
  )
}

const FooterStyled = styled.footer`
  text-align: center;
`

const FooterText = styled.p`
  margin: 0.8rem;
`

export default Footer;