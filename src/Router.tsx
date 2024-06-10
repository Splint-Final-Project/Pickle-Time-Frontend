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
import SignUp2 from './pages/auth/SingUp2';
import OAuthSuccessRedirector from './redirectors/OAuthSuccessRedirector';
import LoginRedirector from './redirectors/LoginRedirector';
import SignIn from './pages/auth/SignIn';
import SignIn_Email from './pages/auth/SignIn_Email';
import MainLayout from '@/layouts/MainLayout';
import SimpleLayout from '@/layouts/SimpleLayout';
import NotFoundPage from '@/pages/NotFoundPage';
import CreatePickle4 from './pages/pickles/CreatePickle4';
import CreatePickle1 from './pages/pickles/CreatePickle1';
import JoinPickle from './pages/pickles/JoinPickle';
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
        path: `pickle/:id`,
        element: <Pickle />,
      },
      {
        path: '/pickle-create',
        element: <CreatePickle1 />,
      },
      {
        path: '/pickle-join',
        element: <JoinPickle />,
      },
      {
        path: '/pickle-create-payment',
        element: <CreatePickle4 />,
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
        path: '/join-redirect',
        element: <PickleJoinRedirector />,
      },
      {
        path: '/create-redirect',
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
        path: '/sign-in-email',
        element: <SignIn_Email />,
      },
      {
        path: routes.signUp2,
        element: <SignUp2 />,
      },
    ],
  },
]);

export default router;
