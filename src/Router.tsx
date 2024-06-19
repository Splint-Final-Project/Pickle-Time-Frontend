import { createBrowserRouter, redirect } from 'react-router-dom';

import Home from '@/pages/home/Home';
import Conversation from '@/pages/chat/Conversation';
import ConversationList from '@/pages/chat/ConversationList';
import MyPage from '@/pages/profile/MyPage';
import EditProfilePage from './pages/profile/EditProfilePage';

import Admin from '@/pages/auth/Admin';
import SignUp from '@/pages/auth/SignUp';
import SignUp2 from './pages/auth/SignUp2';

import Pickle from '@/pages/pickles/Pickle';
import JoinPickle from '@/pages/pickles/JoinPickle';

import MapSearch from './pages/mapsearch/MapSearch';

import OAuthSuccessRedirector from './redirectors/OAuthSuccessRedirector';
import LoginRedirector from './redirectors/LoginRedirector';

import SignIn from '@/pages/auth/SignIn';
import SignIn_Email from '@/pages/auth/SignIn_Email';
import MainLayout from '@/layouts/MainLayout';
import SimpleLayout from '@/layouts/SimpleLayout';
import NotFoundPage from '@/pages/NotFoundPage';

import PopularPickleList from '@/pages/pickles/PopularPickleList';
import HotTimePickleList from '@/pages/pickles/HotTimePickleList';
import PickleJoinRedirector from './redirectors/PickleJoinRedirector';
import PickleCreationRedirector from './redirectors/PickleCreationRedirector';
import OneToOne from '@/pages/chat/OneToOne';

import routes from '@/constants/routes';
import CreatePickle from './pages/pickles/CreatePickle';
import MyPickles from '@/pages/pickles/MyPickles';
import PickleSearchResults from '@/pages/pickles/PickleSearchResults';

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
        path: '/pickle-join',
        element: <JoinPickle />,
      },
      {
        //피클 생성 하다만 기록이 있으면 있으면 그 단계에 맞춰서 리다이렉트됨
        path: '/pickle-create',
        element: <CreatePickle />,
      },
      {
        path: routes.chatList,
        element: <ConversationList />,
      },
      {
        path: routes.map,
        element: <MapSearch />,
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
        path: '',
        element: <LoginRedirector />,
        children: [
          {
            path: routes.myPickles,
            element: <MyPickles />,
          },
          {
            path: routes.mypage,
            element: <MyPage />,
          },
          {
            path: routes.chatList,
            element: <ConversationList />,
          },
        ],
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
        path: `${routes.pickle}/:pickleId`,
        element: <Pickle />,
      },
      {
        path: routes.picklePopularList,
        element: <PopularPickleList />,
      },
      {
        path: routes.pickleHotTimeList,
        element: <HotTimePickleList />,
      },
      {
        path: routes.pickleSearchResults,
        element: <PickleSearchResults />,
      },
      {
        path: '',
        element: <LoginRedirector />,
        children: [
          {
            path: '/pickle-join/:id',
            element: <JoinPickle />,
          },
          {
            path: '/pickle-create',
            element: <CreatePickle />,
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
            path: `${routes.oneToOneChat}/:pickleId/:leaderId`,
            element: <OneToOne />,
          },
          {
            path: `${routes.chat}/:pickleId/:conversationId`,
            element: <Conversation />,
          },
          {
            path: routes.editProfile,
            element: <EditProfilePage />,
          },
          {
            path: routes.signUp2,
            element: <SignUp2 />,
          },
        ],
      },
    ],
  },
]);

export default router;
