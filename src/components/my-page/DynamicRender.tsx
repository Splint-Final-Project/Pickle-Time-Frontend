import PointList from '@/components/my-page/point/PointList';
import ReviewList from '@/components/my-page/review/ReviewList';
import WishList from '@/components/my-page/wishlist/WishList';
import { MY_MENU } from '@/constants/BUTTON';
import { MyMenu } from '@/pages/profile/MyPage';

export default function DynamicRender({ menu }: { menu: MyMenu }) {
  switch (menu) {
    case MY_MENU.POINT:
      return <PointList />;
    case MY_MENU.REVIEW:
      return <ReviewList />;
    case MY_MENU.WISHLIST:
      return <WishList />;
  }
}
