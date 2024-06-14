import { createBrowserRouter, redirect } from 'react-router-dom';

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
import SignIn from '@/pages/auth/SignIn';
import SignIn_Email from '@/pages/auth/SignIn_Email';
import MainLayout from '@/layouts/MainLayout';
import SimpleLayout from '@/layouts/SimpleLayout';
import NotFoundPage from '@/pages/NotFoundPage';

import CreatePickle4 from './pages/pickles/CreatePickle4';
import CreatePickle1 from './pages/pickles/CreatePickle1';
import JoinPickle from './pages/pickles/JoinPickle';
import PickleCreationRedirector from './redirectors/PickleCreationRedirector';
import CreatePickle2 from './pages/pickles/CreatePickle2';
import CreatePickle3 from './pages/pickles/CreatePickle3';
import PopularPickleList from '@/pages/pickles/PopularPickleList';
import HotTimePickleList from '@/pages/pickles/HotTimePickleList';

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
        path: '/pickle-join',
        element: <JoinPickle />,
      },
      {
        path: '/pickle-create',
        //TODO: 피클 생성 하다만 기록이 있으면 있으면 그 단계에 맞춰서 리다이렉트
        loader: async () => redirect('/pickle-create-1'),
      },
      {
        path: '/pickle-create-1',
        element: <CreatePickle1 />,
      },
      {
        path: '/pickle-create-2',
        element: <CreatePickle2 />,
      },
      {
        path: '/pickle-create-3',
        element: <CreatePickle3 />,
      },
      {
        path: '/pickle-create-4',
        element: <CreatePickle4 />,
        // path: routes.pickleCreate,
        // element: <CreatePickle />,
      },
      // {
      //   path: routes.pickleCreatePayment,
      //   element: <CreatePicklePayment />,
      // },
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
      // {
      //   path: routes.pickleJoin,
      //   element: <JoinPicklePayment />,
      // },
      {
        path: routes.picklePopularList,
        element: <PopularPickleList />,
      },
      {
        path: routes.pickleHotTimeList,
        element: <HotTimePickleList />,
      },
    ],
  },
]);

export default router;
