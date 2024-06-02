import { ReactNode, useEffect } from 'react';
import client from '@/apis/axios';
import { Navigate, useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/zustand/useAuth';

export default function LoginRedirector({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  useEffect(() => {
    const responseInterceptor = client.interceptors.response.use(
      function (response: any) {
        return response;
      },
      function (error: any) {
        const status = error.response?.status;
        if (status === 401) {
          signOut();
          console.log('server responded with 401 status. redirecting to login page.');
          navigate('/sign-in');
        } else if (status === 403) {
          console.log('server responded with 403 status. redirecting to signup2 page.');
          navigate('/sign-up2');
        }
        return Promise.reject(error);
      },
    );
    return () => {
      client.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  return children;
}
