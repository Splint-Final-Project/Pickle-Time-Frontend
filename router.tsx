import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./src/constants/routes";
import Home from "./src/pages/Home"; // Import the 'Home' component

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
        path: routes.admin,
        element: <Admin />,
      },
    ],
  },
  {
    path: routes.signIn,
    element: <SignIn />,
  },
  {
    path: routes.signUp,
    element: <Signup />,
  },
]);

const Router = () => (
  <>
    <RouterProvider router={router} />
  </>
);

export default Router;
