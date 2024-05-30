import useAuth from '@/hooks/zustand/useAuth';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function OAuthSuccessRedirector() {
  const { oAuthSetToken } = useAuth();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  if (!token) {
    alert('토큰이 없습니다.');
    navigate('/sign-in');
  } else {
    oAuthSetToken(token);
    alert('로그인 성공.');
    navigate('/');
  }
  return <div>로딩 중</div>;
}
