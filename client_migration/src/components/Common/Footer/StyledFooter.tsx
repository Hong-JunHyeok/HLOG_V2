import styled from '@emotion/styled';
import ColorSet from '@/styles/colorSet';
import mediaQueryHelper from '@/styles/mediaHelper'

const CssVariable = {}

const StyledFooter = {
  FooterContainer: styled.footer`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 0;
    background-color: ${ColorSet['--grey800']};
    color: ${ColorSet['--white']};
  `,
  FooterLogo: styled.span`
    line-height: 3rem;
    font-size: 26px;
    font-weight: lighter;
    padding: 0 .5rem;
  `
}

export default StyledFooter;
