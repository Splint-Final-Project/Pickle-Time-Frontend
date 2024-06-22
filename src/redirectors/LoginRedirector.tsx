import { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import client from '@/apis/axios';
import useAuth from '@/hooks/zustand/useAuth';

export default function LoginRedirector() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const responseInterceptor = client.interceptors.response.use(
      function (response: any) {
        return response;
      },
      function (error: any) {
        const status = error.response?.status;
        if (status === 401) {
          console.log('server responded with 401 status. redirecting to login page.');
          signOut();
          navigate('/sign-in', { replace: true });
        } else if (status === 403) {
          console.log('server responded with 403 status. redirecting to signup2 page.');
          navigate('/sign-up2', { replace: true });
        }
        return Promise.reject(error);
      },
    );
    return () => {
      client.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  if (!user) {
    return <Navigate to="/sign-in" replace={true} />;
  }

  return <Outlet />;
}
