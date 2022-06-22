import styled from '@emotion/styled';
import ColorSet from '@/styles/colorSet';
import mediaQueryHelper from '@/styles/mediaHelper';

const StyledMenuList = {
  MenuContainer: styled.ul`
    position: absolute;
    top: 4rem;
    background-color: white;
    right: 1rem;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    transition: .3s;

    ${mediaQueryHelper('medium')} {
      top: 5rem;
    }
    ${mediaQueryHelper('large')} {
      top: 6.5rem;
    }
  `,
  MenuItem: styled.li`
    min-width: 200px;
    line-height: 1.5;
    font-weight: 500;
    cursor: pointer;
    
    .list-item {
      width: 100%;
      padding: 0.75rem 1rem;
      text-decoration: none;
      color: ${ColorSet['--grey800']};
      &:hover {
        color: ${ColorSet['--primary']};
        background-color: ${ColorSet['--greyOpacity200']};
      }
    }

    ${mediaQueryHelper('medium')} {
      font-size: 1.2rem;
      min-width: 300px;
    }
    ${mediaQueryHelper('large')} {
      min-width: 400px;
    }
  `,
};

export default StyledMenuList;
