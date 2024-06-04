import useAuth from '@/hooks/zustand/useAuth';
import { Navigate, useSearchParams } from 'react-router-dom';

export default function OAuthSuccessRedirector() {
  const { setMe } = useAuth();
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');
  console.log(status);
  if (status === 'Pending') {
    console.log('추가 정보 입력 페이지로 이동합니다.');
    // alert('추가 정보 입력 페이지로 이동합니다.');
    return <Navigate to="/sign-up2" />;
  }
  const _id = searchParams.get('_id');
  const nickname = searchParams.get('nickname');
  const profilePic = searchParams.get('profilePic');
  const occupation = searchParams.get('occupation');
  const oauthType = searchParams.get('oauthType');
  const oauthId = searchParams.get('oauthId');
  setMe({
    _id,
    nickname,
    status,
    profilePic,
    occupation,
    oauthType,
    oauthId,
  });

  // alert('로그인 성공.');
  return <Navigate to="/" />;

  // return <div>로딩 중</div>;
}
