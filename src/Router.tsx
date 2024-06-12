import { createBrowserRouter } from 'react-router-dom';

import Home from '@/pages/home/Home';
import Admin from '@/pages/auth/Admin';
import SignUp from '@/pages/auth/SignUp';
import Pickle from '@/pages/pickles/Pickle';
import Conversation from '@/pages/chat/Conversation';
import ConversationList from '@/pages/chat/ConversationList';
import MyPage from '@/pages/profile/MyPage';
import routes from '@/constants/routes';
import PickleJoinRedirector from './redirectors/PickleJoinRedirector';
import SignUp2 from './pages/auth/SignUp2';
import OAuthSuccessRedirector from './redirectors/OAuthSuccessRedirector';
import LoginRedirector from './redirectors/LoginRedirector';
import SignIn from './pages/auth/SignIn';
import SignIn_Email from './pages/auth/SignIn_Email';
import MainLayout from '@/layouts/MainLayout';
import SimpleLayout from '@/layouts/SimpleLayout';
import NotFoundPage from '@/pages/NotFoundPage';
import CreatePicklePayment from './pages/pickles/CreatePicklePayment';
import CreatePickle from './pages/pickles/CreatePickleForm';
import JoinPicklePayment from './pages/pickles/JoinPicklePayment';
import PickleCreationRedirector from './redirectors/PickleCreationRedirector';

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
    errorElement: <NotFoundPage />,
    children: [
      {
        path: routes.home,
        element: <Home />,
      },
      {
        path: `${routes.pickle}/:pickleId`,
        element: <Pickle />,
      },
      {
        path: routes.pickleCreate,
        element: <CreatePickle />,
      },
      {
        path: routes.pickleCreatePayment,
        element: <CreatePicklePayment />,
      },
      {
        path: routes.chatList,
        element: <ConversationList />,
      },
      {
        path: '/oauth/*',
        children: [
          {
            path: 'success',
            element: <OAuthSuccessRedirector />,
          },
        ],
      },
      {
        path: routes.pickleJoinRedirect,
        element: <PickleJoinRedirector />,
      },
      {
        path: routes.pickleCreateRedirect,
        element: <PickleCreationRedirector />,
      },
      {
        path: '',
        // 로그인 안 되어있을 시 리다이렉트
        element: <LoginRedirector />,
        children: [...privateChildren],
      },
    ],
  },
  {
    path: '',
    element: <SimpleLayout />,
    children: [
      {
        path: routes.signIn,
        element: <SignIn />,
      },
      {
        path: routes.signUp,
        element: <SignUp />,
      },
      {
        path: routes.signInEmail,
        element: <SignIn_Email />,
      },
      {
        path: routes.signUp2,
        element: <SignUp2 />,
      },
      {
        path: routes.chat,
        element: <Conversation />,
      },
      {
        path: routes.mypage,
        element: <MyPage />,
      },
      {
        path: routes.pickleJoin,
        element: <JoinPicklePayment />,
      },
    ],
  },
]);

export default router;
