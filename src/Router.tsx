import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./constants/routes";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import SignUp from "./pages/SignUp";
import SingIn from "./pages/SingIn";
import ChatList from "./pages/ChatList";
import PickleList from "./pages/PickleList";
const router = createBrowserRouter([
  {
    path: "",
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

const Router = () => (
  <>
    <RouterProvider router={router} />
  </>
);

export default Router;
