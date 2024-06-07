import { createBrowserRouter } from 'react-router-dom';

import Home from '@/pages/home/Home';
import Admin from '@/pages/auth/Admin';
import SignUp from '@/pages/auth/SignUp';
import Pickle from '@/pages/pickles/Pickle';
import PickleList from '@/pages/pickles/PickleList';
import Conversation from '@/pages/chat/Conversation';
import ConversationList from '@/pages/chat/ConversationList';
import MyPage from '@/pages/profile/MyPage';
import routes from '@/constants/routes';
import MobilePaymentRedirect from './redirectors/MobilePaymentRedirect';
import SignUp2 from './pages/auth/SingUp2';
import OAuthSuccessRedirector from './redirectors/OAuthSuccessRedirector';
import LoginRedirector from './redirectors/LoginRedirector';
import SignIn from './pages/auth/SignIn';
import SignIn_Email from './pages/auth/SignIn_Email';
import MainLayout from '@/layouts/MainLayout';

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
];

const router = createBrowserRouter([
  {
    path: '',
    element: <MainLayout />,
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
        element: <SignIn />,
      },
      {
        path: '/sign-in-email',
        element: <SignIn_Email />,
      },
      {
        path: routes.signUp,
        element: <SignUp />,
      },
      {
        path: routes.signUp2,
        element: <SignUp2 />,
      },
      {
        path: '/oauth/*',
        children: [
          {
            path: 'success',
            element: <OAuthSuccessRedirector />,
          },
          // {
          //   path: 'pending',
          //   element: <OAuthPendingRedirector />,
          // },
        ],
      },
      {
        path: routes.mobilePaymentRedirect,
        element: <MobilePaymentRedirect />,
      },
      {
        path: '',
        // 로그인 안 되어있을 시 리다이렉트
        element: <LoginRedirector />,
        children: [...privateChildren],
      },
    ],
  },
]);

export default router;
