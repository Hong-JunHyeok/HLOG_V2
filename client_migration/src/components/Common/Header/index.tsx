import React from "react";
import { Link } from 'react-router-dom';
import MenuList from "@/components/Common/MenuList";
import useToggle from '@/hooks/useToggle';
import S from './StyledHeader';
import useOutsideRef from '@/hooks/useOutsideRef';
import DefaultProfile from '../../../../public/assets/default_profile.svg';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [userMenuToggleState, toggleUserMenu] = useToggle();
  const headerMenuRef = useOutsideRef(() => {
    userMenuToggleState && toggleUserMenu();
  });

  return (
    <React.Fragment>
      <S.HeaderContainer>
        <S.HeaderTitle> 
          HLOG
        </S.HeaderTitle>
        <S.HeaderMenus>
          <Link className="write" to="/write">글 작성</Link>
        </S.HeaderMenus>
        <S.HeaderProfile ref={headerMenuRef} onClick={toggleUserMenu}>
          <DefaultProfile/>
          <MenuList
            items={[
              {
                title: '내 게시글',
                link: '/my-post'
              },
              {
                title: '새 글 작성',
                link: '/write'
              },
              {
                title: '설정',
                link: '/settings'
              },
              {
                title: '로그아웃',
                link: '/logout'
              }
            ]}
            visible={userMenuToggleState}
          />
        </S.HeaderProfile>
      </S.HeaderContainer>
    </React.Fragment>
  )
}

export default Header;
