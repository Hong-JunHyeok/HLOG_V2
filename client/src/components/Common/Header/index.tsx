import React, { useMemo } from "react";
import { Link } from 'react-router-dom';

import MenuList from "@/components/Common/MenuList";
import useToggle from '@/hooks/useToggle';
import S from './StyledHeader';
import useOutsideRef from '@/hooks/useOutsideRef';
import DefaultProfile from '@/../public/assets/default_profile.svg';
import useUser from "@/hooks/useUser";
import useLocationPush from "@/hooks/useLocationPush";
import useLogout from "@/hooks/useLogout";

const Header: React.FC = () => {
  const { user } = useUser();

  const [userMenuToggleState, toggleUserMenu] = useToggle();
  const headerMenuRef = useOutsideRef(() => {
    userMenuToggleState && toggleUserMenu();
  });
  const logout = useLogout();

  const handlePushHome = useLocationPush('/');
  const handlePushLogin = useLocationPush('/login');

  const menuList = useMemo(() => (
    [
      {
        title: '내 프로필',
        link: `/user/${user?.id}`
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
        action: logout
      }
    ]
  ), [user]);

  return (
    <React.Fragment>
      <S.HeaderContainer>
        <S.HeaderTitle onClick={handlePushHome}> 
          HLOG
        </S.HeaderTitle>
        {user ? 
        <>
          <S.HeaderMenus>
            <Link className="write" to="/write">글 작성</Link>
          </S.HeaderMenus>
          <S.HeaderProfile ref={headerMenuRef} onClick={toggleUserMenu}>
            <DefaultProfile/>
            <MenuList
              items={menuList}
              visible={userMenuToggleState}
            />
          </S.HeaderProfile> 
        </>
        :
        <>
          <S.LoginButton onClick={handlePushLogin}>로그인</S.LoginButton>
        </>
        }
      </S.HeaderContainer>
    </React.Fragment>
  )
}

export default Header;
