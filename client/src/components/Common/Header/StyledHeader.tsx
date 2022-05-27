import styled from '@emotion/styled';
import ColorSet from '@/styles/colorSet';
import mediaQueryHelper from '@/styles/mediaHelper';

const CssVariable = {
  '--header-height-min': '50px',
  '--header-height-mid': '70px',
  '--header-height-max': '90px',
};

interface ProfileProps {
  profileUrl?: string;
}

const StyledHeader = {
  HeaderContainer: styled.header`
    position: fixed;
    display: flex;
    width: 100%;
    height: ${CssVariable['--header-height-min']};
    background-color: ${ColorSet['--white']};
    user-select: none;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    padding: 0 1rem;
    transition: 0.4s;
    z-index: 9999;

    ${mediaQueryHelper('medium')} {
      height: ${CssVariable['--header-height-mid']};
      padding: 1rem;
      padding: 0 1rem;
    }

    ${mediaQueryHelper('large')} {
      height: ${CssVariable['--header-height-max']};
      padding: 1rem;
      padding: 0 2rem;
    }
  `,

  HeaderTitle: styled.div`
    cursor: pointer;
    align-items: center;
    font-size: 1rem;
    font-weight: lighter;
    display: flex;
    &::first-letter {
      color: colors.$primary_color;
    }

    ${mediaQueryHelper('medium')} {
      font-size: 1.5rem;
    }

    ${mediaQueryHelper('large')} {
      font-size: 2rem;
    }
  `,

  HeaderMenus: styled.div`
    width: 100%;
    display: flex;
    list-style: none;
    margin: 0 2rem 0 auto;
    display: flex;
    .write {
      margin: auto 0 auto auto; 
      padding: .5rem 1rem;
      font-size: 1rem;
      border-radius: 1rem;
      outline: none;
      font-weight: bold;
      word-break: keep-all;
      border: 1px solid ${ColorSet['--greyOpacity700']};;
      background-color: ${ColorSet['--white']};
      color: ${ColorSet['--greyOpacity700']};
      transition: all 0.125s ease-in 0s;
      cursor: pointer;
      text-decoration: none;

      &:hover {
        background-color: ${ColorSet['--greyOpacity700']};;
        color: ${ColorSet['--white']};
      }
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
    cursor: pointer;
    svg {
      width: 40px;
      height: 40px; 
    }

    &::after {
      content: '▼';
      margin-left: 10px;
    }

    .header_menu {
      position: absolute;
      top: 110%;
      right: 10px;
      width: 200px;
      background-color: ${ColorSet['--white']};
      padding: 0.75rem 1rem;
      line-height: 1.5;
      font-weight: 500;
      cursor: pointer;

      ${mediaQueryHelper('medium')} {
        width: 300px;
      }

      ${mediaQueryHelper('large')} {
        width: 400px;
      }

      & > li {
        padding: 1rem;
      }
    }
  `,
  ProfileContainer: styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
  `,
  Figure: styled.figure<ProfileProps>`
    width: 100%;
    height: 100%;
    background-image: url(${(props) => props.profileUrl});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  `,
  LoginButton: styled.button`
      margin: auto 0 auto auto; 
      padding: .5rem 1rem;
      font-size: 1rem;
      border-radius: 1rem;
      outline: none;
      font-weight: bold;
      word-break: keep-all;
      border: 1px solid ${ColorSet['--greyOpacity700']};;
      color: ${ColorSet['--white']};
      background-color: ${ColorSet['--greyOpacity700']};
      transition: all 0.125s ease-in 0s;
      cursor: pointer;
      text-decoration: none;

      &:hover {
        color: ${ColorSet['--greyOpacity700']};;
        background-color: ${ColorSet['--white']};
      }    
  `,
};

export default StyledHeader;
