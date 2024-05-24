import { createBrowserRouter } from 'react-router-dom';

import Home from '@/pages/Home';
import PickleList from './pages/PickleList';
import Admin from '@/pages/Admin';
import SingIn from '@/pages/SingIn';
import SignUp from '@/pages/SignUp';
import ChatList from "./pages/ConversationList";
import routes from '@/constants/routes';

const router = createBrowserRouter([
  {
    path: '',
    // element: <Layout />, // 로그인 안 되어있을 시 리다이렉트
    // errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: routes.chatList,
        element: <ChatList />,
      },
      {
        path: routes.admin,
        element: <Admin />,
      },
      {
        path: routes.pickleList,
        element: <PickleList />,
      }
    ],
  },
  {
    path: routes.signIn,
    element: <SingIn />,
  },
  {
    path: routes.signUp,
    element: <SignUp />,
  },
]);

export default router;