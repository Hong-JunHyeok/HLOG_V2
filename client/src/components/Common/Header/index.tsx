import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import MenuList from '@/components/Common/MenuList';
import useToggle from '@/hooks/useToggle';
import S from './StyledHeader';
import useOutsideRef from '@/hooks/useOutsideRef';
import DefaultProfile from '@/../public/assets/default_profile.svg';
import useLogout from '@/hooks/mutations/useLogout';
import startWithURL from '@/utils/startWithURL';
import useMyInfo from '@/hooks/queries/useMyInfo';
import useAuth from '@/hooks/useAuth';

const Header: React.FC = () => {
  const { state: { isAuthenticated } } = useAuth();
  const [userMenuToggleState, toggleUserMenu] = useToggle();
  const headerMenuRef = useOutsideRef(() => {
    if (userMenuToggleState) {
      toggleUserMenu();
    }
  });

  const navigate = useNavigate();
  const handlePushHome = () => navigate('/');
  const handlePushLogin = () => navigate('/login');
  const logout = useLogout();
  const { data } = useMyInfo();

  // FIXME: 로그아웃 시 캐싱되는 문제
  const menuList = useMemo(() => {
    if (isAuthenticated) {
      return [
        {
          title: '내 프로필',
          link: `/user/${data?.user.id}`,
        },
        {
          title: '새 글 작성',
          link: '/write',
        },
        {
          title: '설정',
          link: '/setting',
        },
        {
          title: '로그아웃',
          action: logout,
        },
      ];
    }
    return null;
  }, [isAuthenticated, data, logout]);

  return (
    <S.HeaderContainer>
      <S.HeaderTitle onClick={handlePushHome}>
        HLOG
      </S.HeaderTitle>
      {isAuthenticated
        ? (
          <>
            <S.HeaderMenus>
              <Link className="write" to="/write">글 작성</Link>
            </S.HeaderMenus>
            <S.HeaderProfile ref={headerMenuRef} onClick={toggleUserMenu}>
              <S.ProfileContainer>
                {data?.user.profileUrl
                  ? <S.Figure profileUrl={startWithURL(data?.user.profileUrl)} />
                  : <DefaultProfile />}
              </S.ProfileContainer>
              <MenuList
                items={menuList}
                visible={userMenuToggleState}
              />
            </S.HeaderProfile>
          </>
        )
        : <S.LoginButton onClick={handlePushLogin}>로그인</S.LoginButton>}
    </S.HeaderContainer>
  );
};

export default Header;
