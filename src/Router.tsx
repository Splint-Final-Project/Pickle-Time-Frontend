import { createBrowserRouter } from 'react-router-dom';

import SignIn from '@/pages/auth/SignIn.page';
import SignInEmailPage from '@/pages/auth/SignInEmail.page';
import SignUp from '@/pages/auth/SignUp.page';
import SignUp2 from './pages/auth/SignUp2.page';

import Home from '@/pages/home/Home.page';
import PopularPickleList from '@/pages/pickles/PopularPickleList.page';
import HotTimePickleList from '@/pages/pickles/HotTimePickleList.page';
import PickleSearchResults from '@/pages/pickles/PickleSearchResults.page';

import MapSearch from './pages/mapsearch/MapSearch.page';

import CreatePickle from './pages/pickles/CreatePickle.page';
import PickleEdit from './pages/pickles/PickleEdit.page';
import PickleDetailPage from '@/pages/pickles/PickleDetail.page';
import JoinPickle from '@/pages/pickles/JoinPickle.page';

import MyPickles from '@/pages/pickles/MyPickle.page';

import OneToOne from '@/pages/chat/OneToOne.page';
import Conversation from '@/pages/chat/Conversation.page';
import ConversationList from '@/pages/chat/ConversationList.page';

import MyPage from '@/pages/profile/MyPage';
import EditProfilePage from './pages/profile/EditProfile.page';

import NotFoundPage from '@/pages/NotFound.page';

import MainLayout from '@/layouts/MainLayout';
import SimpleLayout from '@/layouts/SimpleLayout';
import LoginRedirector from './redirectors/LoginRedirector';
import OAuthSuccessRedirector from './redirectors/OAuthSuccessRedirector';
import PickleJoinRedirector from './redirectors/PickleJoinRedirector';
import PickleCreationRedirector from './redirectors/PickleCreationRedirector';

import routes from '@/constants/routes';

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
        element: <SignInEmailPage />,
      },
      {
        path: `${routes.pickle}/:pickleId`,
        element: <PickleDetailPage />,
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
            path: '/pickle-edit/:id',
            element: <PickleEdit />,
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
