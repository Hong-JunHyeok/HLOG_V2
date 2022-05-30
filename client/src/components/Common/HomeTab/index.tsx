import React from 'react';
import { NavLink } from 'react-router-dom';
import StyledHomeTab from './StyledHomeTab';

const MenuList: React.FC = () => {
  const activeStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? '#3182f6' : '#4e5968',
  });

  return (
    <StyledHomeTab.PostMenu>
      <li>
        <NavLink
          to="/"
          style={activeStyle}
        >
          인기 게시글

        </NavLink>
      </li>
      <li>
        <NavLink
          to="/recent"
          style={activeStyle}
        >
          최근 게시글

        </NavLink>
      </li>
    </StyledHomeTab.PostMenu>
  );
};

export default MenuList;
