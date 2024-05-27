import { createBrowserRouter } from 'react-router-dom';

import Home from '@/pages/home/Home';
import Admin from '@/pages/auth/Admin';
import SingIn from '@/pages/auth/SingIn';
import SignUp from '@/pages/auth/SignUp';
import Pickle from '@/pages/pickles/Pickle';
import PickleList from '@/pages/pickles/PickleList';
import Conversation from '@/pages/chat/Conversation';
import ConversationList from '@/pages/chat/ConversationList';
import MyPage from '@/pages/profile/MyPage';
import routes from '@/constants/routes';
import MobilePaymentRedirect from './pages/pickles/MobilePaymentRedirect';

const privateChildren = [
  {
    path: routes.admin,
    element: <Admin />,
  },
  {
    path: routes.chat,
    element: <Conversation />,
  },
  {
    path: routes.chatList,
    element: <ConversationList />,
  },
  {
    path: routes.mypage,
    element: <MyPage />,
  },
  {
    path: routes.mobilePaymentRedirect,
    element: <MobilePaymentRedirect />,
  },
];

const router = createBrowserRouter([
  {
    path: '',
    // element: <Layout />, // 로그인 안 되어있을 시 리다이렉트
    // errorElement: <NotFound />,
    children: [
      {
        path: routes.home,
        element: <Home />,
      },
      {
        path: routes.pickle,
        element: <Pickle />,
      },
      {
        path: routes.pickleList,
        element: <PickleList />,
      },
      {
        path: routes.signIn,
        element: <SingIn />,
      },
      {
        path: routes.signUp,
        element: <SignUp />,
      },
      {
        // 로그인시에만 접속 가능
        path: '',
        // element: <PrivateRedirector />,
        children: [...privateChildren],
      },
    ],
  },
]);

export default router;
