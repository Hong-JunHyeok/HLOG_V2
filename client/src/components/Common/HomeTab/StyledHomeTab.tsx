import styled from '@emotion/styled';
import ColorSet from '@/styles/colorSet';
import mediaQueryHelper from '@/styles/mediaHelper';

const StyledHomeTab = {
  PostMenu: styled.ul`
    display: flex;
    margin-bottom: 2rem;
    & > li {
     list-style: none;
     display: flex;
     align-items: center;
     padding: 0 1rem;
     color: ${ColorSet['--grey700']};
     & > a {
     padding: 12px 10px;
     font-size: 15px;
     line-height: 20px;
     color: currentColor;
     border-radius: 8px;
     border: 0;
     cursor: pointer;
     background-color: transparent;
     text-decoration: none;
     text-align: left;
     &:hover {
        background-color: ${ColorSet['--greyOpacity100']}
     }
     }
    }

    padding: 5rem 0 0 0;
    ${mediaQueryHelper('medium')} {
      padding-top: 6rem;
    }

    ${mediaQueryHelper('large')} {
      padding-top: 7rem;
    }
 `,
};

export default StyledHomeTab;
