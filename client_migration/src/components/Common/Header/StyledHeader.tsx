import styled from '@emotion/styled';
import ColorSet from '@/styles/colorSet';
import mediaQueryHelper from '@/styles/mediaHelper'

const CssVariable = {
  ['--header-height-min']: '50px',
  ['--header-height-mid']: '70px',
  ['--header-height-max']: '90px' 
}

const StyledHeader = {
  HeaderContainer: styled.header`
    display: flex;
    width: 100%;
    height: ${CssVariable['--header-height-max']};
    background-color: ${ColorSet['--white']};
    user-select: none;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    padding: 0 3rem;
    transition: 0.4s;

    ${mediaQueryHelper('medium')} {
      height: ${CssVariable['--header-height-min']};
      padding: 1rem;
      padding: 0 1rem;
    }

    ${mediaQueryHelper('large')} {
      height: ${CssVariable['--header-height-mid']};
      padding: 1rem;
      padding: 0 2rem;
    }
  `,

  HeaderTitle: styled.h1`
    display: flex;
    align-items: center;
    font-size: 2rem;
    font-weight: lighter;
    &::first-letter {
      color: colors.$primary_color;
    }

    ${mediaQueryHelper('medium')} {
      font-size: 1rem;
    }

    ${mediaQueryHelper('large')} {
      font-size: 1.5rem;
    }
  `,

  HeaderMenus: styled.div`
    width: 100%;
    display: flex;
    list-style: none;
    margin: 0 2rem 0 auto;
    display: flex;
    ul {
      display: flex;
      & > li {
        height: 100%;
        list-style: none;
        display: flex;
        align-items: center;
        padding: 0 8px;
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
    }

    .mobile_layout_menus {
      position: relative;
      display: flex;
      flex-grow: 1;
      justify-content: center;
      button {
        background-color: ${ColorSet['--white']};
        border: none;
      }

      ul {
        background-color: ${ColorSet['--white']};
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        position: absolute;
        width: 150px;
        top: 80px;
        left: 50%;
        transform: translate(-50%, 0%);
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        z-index: 100;
        padding: 10px 0;
      }
      a {
        width: 100%;
        padding: 1rem
        margin: 0;
      }

      .menu_opened{
        position: absolute;
        left: 0;
        top: 0;
      }
    } 

    & > ul {
      display: none;
    }

    ${mediaQueryHelper('medium')} {
      .mobile_layout_menus {
        display: none;
      }
      & > ul {
        display: flex;
      }
    }
  `,

  HeaderProfile: styled.div`
    display: flex;
    align-items: center;
    padding-right: 1rem;
    svg {
      width: 50px;
      height: 50px;
      ${mediaQueryHelper('medium')} {
        width: 30px;
        height: 30px; 
      }

      ${mediaQueryHelper('large')} {
        width: 40px;
        height: 40px;
      }
    }
  `
};

export default StyledHeader
