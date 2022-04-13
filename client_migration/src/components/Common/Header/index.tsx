import React from "react";
import { Link } from 'react-router-dom'
import useToggle from '@/hooks/useToggle'
import S from './StyledHeader';
import DefaultProfile from '../../../../public/assets/default_profile.svg';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [menuOpen, toggleMenu, open, close] = useToggle(false);

  return (
    <React.Fragment>
      <S.HeaderContainer>
        <S.HeaderTitle>
          HLOG
        </S.HeaderTitle>
        <S.HeaderMenus>
          <MenuList />
          <div className="mobile_layout_menus">
            <button onClick={toggleMenu}>🍔</button>
            {menuOpen && <MenuList />}
          </div>
        </S.HeaderMenus>
        <S.HeaderProfile>
          <DefaultProfile />
        </S.HeaderProfile>
      </S.HeaderContainer>
    </React.Fragment>
  )
}

const MenuList: React.FC = () => (
  <ul>
    <li>
      <Link to="">인기 게시글</Link>
    </li>
    <li>
      <Link to="recent">최근 게시글</Link>
    </li>
  </ul>
)

export default Header;
