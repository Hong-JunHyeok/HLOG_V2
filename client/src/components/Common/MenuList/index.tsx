import React from 'react';
import { Link } from 'react-router-dom';
import S from './StyledMenuList';

type MenuItemType = {
  title: string;
  link?: string;
  action?: () => void;
}

type MenuList = {
  items: MenuItemType[];
  visible: boolean;
}

const MenuList: React.FunctionComponent<MenuList> = ({
  items,
  visible
}) => {
  const itemsRender = items.map((item, idx) => (
    <S.MenuItem
      key={idx}
      onClick={item.action}
    >
      {item.link ? 
        (
          <Link to={item.link} className='list-item'>
            {item.title}
          </Link>
        )
        :
        <div className="list-item">{item.title}</div>
      }
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
