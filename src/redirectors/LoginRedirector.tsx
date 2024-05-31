import { useEffect } from 'react';
import client from '@/apis/axios';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/zustand/useAuth';

export default function LoginRedirector() {
  const navigate = useNavigate();
  const { getUser } = useAuth();

  useEffect(() => {
    const responseInterceptor = client.interceptors.response.use(
      function (response: any) {
        return response;
      },

      function (error: any) {
        const status = error.response?.status;
        if (status === 401) {
          // contextLogout();
          console.log('server responded with 401 status. redirecting to login page.');
          navigate('/sign-in');
        }
        return Promise.reject(error);
      },
    );

    return () => {
      client.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  console.log('asdfasfd');

  if (!getUser()) {
    return <Navigate to="/sign-in" />;
  }
  
  return <Outlet />;
}
