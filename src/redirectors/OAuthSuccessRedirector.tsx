import useAuth from '@/hooks/zustand/useAuth';
import { useCallback, useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

export default function OAuthSuccessRedirector() {
  const { setMe } = useAuth();
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');
  const _id = searchParams.get('_id');
  const nickname = searchParams.get('nickname');
  const profilePic = searchParams.get('profilePic');
  const areaCodes = searchParams.get('areaCodes');
  const oauthType = searchParams.get('oauthType');
  const oauthId = searchParams.get('oauthId');

  const handleSetMe = useCallback(() => {
    setMe({
      _id,
      nickname,
      status,
      profilePic,
      areaCodes,
      oauthType,
      oauthId,
    });
  }, [_id, nickname, status, profilePic, areaCodes, oauthType, oauthId]);

  useEffect(() => {
    handleSetMe();
  }, [handleSetMe]);

  if (status === 'pending') {
    console.log('추가 정보 입력 페이지로 이동합니다.');
    // alert('추가 정보 입력 페이지로 이동합니다.');
    return <Navigate to="/sign-up2" />;
  }

  // alert('로그인 성공.');
  return <Navigate to="/" />;

  // return <div>로딩 중</div>;
}
