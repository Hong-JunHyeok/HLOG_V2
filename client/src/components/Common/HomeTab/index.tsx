import React from 'react';
import { Link } from "react-router-dom";
import StyledHomeTab from './StyledHomeTab';

const MenuList: React.FC = () => (
  <StyledHomeTab.PostMenu>
    <li>
      <Link to="/">인기 게시글</Link>
    </li>
    <li>
      <Link to="/recent">최근 게시글</Link>
    </li>
  </StyledHomeTab.PostMenu>
)

export default MenuList;
