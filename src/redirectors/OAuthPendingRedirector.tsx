import useAuth from '@/hooks/zustand/useAuth';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function OAuthPendingRedirector() {
  const { oAuthSetToken } = useAuth();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  if (!token) {
    alert('토큰이 없습니다.');
    navigate('/sign-in');
  } else {
    oAuthSetToken(token);
    alert('회원가입을 마무리해주세요.');
    navigate('/sign-up2');
  }
  return <div>로딩 중</div>;
}
