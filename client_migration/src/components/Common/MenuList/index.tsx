import React from 'react';
import { Link } from 'react-router-dom';
import S from './StyledMenuList';

type MenuItemType = {
  title: string;
  link: string;
}

type MenuList = {
  items: MenuItemType[];
  visible: boolean;
}

const MenuList: React.FunctionComponent<MenuList> = ({
  items,
  visible
}) => {
  const handleMenuClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  }

  const itemsRender = items.map((item, idx) => (
    <S.MenuItem
      key={idx}
      onClick={handleMenuClick}
    >
      <Link to={item.link} className='list-item'>
        {item.title}
      </Link>
    </S.MenuItem>
  ));

  if(!visible) return null;
  return (
      <S.MenuContainer>
        {itemsRender}
      </S.MenuContainer>
  );
}

export default MenuList;
