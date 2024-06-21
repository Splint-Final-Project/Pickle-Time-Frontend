import { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import PointList from '@/components/my-page/point/PointList';
import ReviewList from '@/components/my-page/review/ReviewList';
import WishList from '@/components/my-page/wishlist/WishList';
import { MY_MENU } from '@/constants/BUTTON';
import { MyMenu } from '@/pages/profile/MyPage';

export default function DynamicRender({ menu }: { menu: MyMenu }) {
  const [currentMenu, setCurrentMenu] = useState<MyMenu>(menu);
  const [animation, setAnimation] = useState<'fadeIn' | 'fadeOut'>('fadeIn');
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setAnimation('fadeOut');
    const timer = setTimeout(() => {
      setCurrentMenu(menu);
      setAnimation('fadeIn');
    }, 270);

    return () => clearTimeout(timer);
  }, [menu]);

  const renderComponent = (menu: MyMenu) => {
    switch (menu) {
      case MY_MENU.POINT:
        return <PointList />;
      case MY_MENU.REVIEW:
        return <ReviewList />;
      case MY_MENU.WISHLIST:
        return <WishList />;
    }
  };
  return <S.AnimatedWrapper className={animation}>{renderComponent(currentMenu)}</S.AnimatedWrapper>;
}

const S = {
  AnimatedWrapper: styled.div`
    &.fadeIn {
      animation: fadeIn 0.3s forwards;
    }
    &.fadeOut {
      animation: fadeOut 0.3s forwards;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes fadeOut {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
  `,
};
