import React, { Suspense, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import MenuList from '@/components/Common/MenuList';
import useToggle from '@/hooks/useToggle';
import useOutsideRef from '@/hooks/useOutsideRef';
import DefaultProfile from '@/../public/assets/default_profile.svg';
import useLogout from '@/hooks/mutations/useLogout';
import startWithURL from '@/utils/startWithURL';
import useMyInfo from '@/hooks/queries/useMyInfo';
import useAuth from '@/hooks/useAuth';
import S from './StyledHeader';

const UserContainer = () => {
  const { state: { isAuthenticated } } = useAuth();
  const { data } = useMyInfo();

  const {
    state: userMenuToggleState,
    toggleState: toggleUserMenu,
  } = useToggle();
  const headerMenuRef = useOutsideRef(() => {
    if (userMenuToggleState) {
      toggleUserMenu();
    }
  });

  const logout = useLogout();
  const navigate = useNavigate();
  const handlePushLogin = () => navigate('/login');

  const menuList = useMemo(() => {
    if (isAuthenticated) {
      return [
        {
          title: '내 프로필',
          link: `/user/${data.user.id}`,
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
    <>
      {isAuthenticated
        ? (
          <>
            <Link className="write" to="/write">글 작성</Link>
            <S.HeaderProfile ref={headerMenuRef} onClick={toggleUserMenu}>
              <S.ProfileContainer>
                {
                data.user.profileUrl
                  ? <S.Figure profileUrl={startWithURL(data.user.profileUrl)} />
                  : <DefaultProfile />
                }
              </S.ProfileContainer>
              <MenuList
                items={menuList}
                visible={userMenuToggleState}
              />
            </S.HeaderProfile>
          </>
        )
        : (
          <S.LoginButton onClick={handlePushLogin}>로그인</S.LoginButton>
        )}
    </>
  );
};

const Header: React.FC = () => {
  const navigate = useNavigate();
  const handlePushHome = () => navigate('/');
  const handlePushSearch = () => navigate('/search');

  return (
    <S.HeaderContainer>
      <S.HeaderTitle onClick={handlePushHome}>
        HLOG
      </S.HeaderTitle>
      <S.HeaderMenus>
        <S.SearchButton type="button" onClick={handlePushSearch}>
          <FontAwesomeIcon icon={solid('magnifying-glass')} />
        </S.SearchButton>
        <Suspense>
          <UserContainer />
        </Suspense>
      </S.HeaderMenus>
    </S.HeaderContainer>
  );
};

export default Header;
