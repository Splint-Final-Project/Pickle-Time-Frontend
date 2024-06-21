import { useState } from 'react';
import styled from '@emotion/styled';

/**
 * 마이페이지 메뉴리스트 탭
 * - 포인트 / 리뷰 관리 / 찜한 목록
 */

type MenuItem = {
  label: string;
  icon: string;
  selectedIcon: string;
  func: () => void;
};
interface MenuProps {
  menuList: MenuItem[];
}

export default function MenuList({ menuList }: MenuProps) {
  const [selectedMenu, setSelectedMenu] = useState(0);

  return (
    <S.MenuContainer>
      {menuList.map((menu, index) => (
        <S.Item
          key={index}
          value={index}
          className={`${selectedMenu === index ? 'selected' : ''} ${index === 1 ? 'middle' : ''}`}
          onClick={() => {
            if (selectedMenu === index) return;
            setSelectedMenu(index);
            menu.func();
          }}
        >
          <img src={selectedMenu === index ? menu.selectedIcon : menu.icon} alt={menu.label} />
          <span>{menu.label}</span>
        </S.Item>
      ))}
    </S.MenuContainer>
  );
}

const S = {
  MenuContainer: styled.ul`
    display: flex;
    width: 100%;

    & .middle {
      border-left: 1px solid #bababa;
      border-right: 1px solid #bababa;
    }
  `,

  Item: styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    gap: 1rem;
    cursor: pointer;
    transition: color 0.3s ease;

    color: ${({ theme }) => theme.color.sub};
    ${({ theme }) => theme.typography.body1}

    &.selected {
      color: ${({ theme }) => theme.color.basic};
    }
  `,
};
