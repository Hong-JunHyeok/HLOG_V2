import React from "react";
import S from './StyledFooter';

interface FooterProps {}

const Footer: React.FunctionComponent<FooterProps> = () => {
  return (
    <S.FooterContainer>
      <S.FooterLogo>HLOG</S.FooterLogo>
    </S.FooterContainer>
  );
};

export default Footer;
