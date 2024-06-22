import { useCallback, useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import useAuth from '@/hooks/zustand/useAuth';

export default function OAuthSuccessRedirector() {
  const { setMe } = useAuth();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const status = searchParams.get('status');
  const _id = searchParams.get('_id');
  const nickname = searchParams.get('nickname');
  const profilePic = searchParams.get('profilePic');
  const areaCodes = searchParams.get('areaCodes');
  const areaCodesArray = areaCodes ? areaCodes.split(',').map(Number) : [];
  const oauthType = searchParams.get('oauthType');
  const oauthId = searchParams.get('oauthId');

  const handleSetMe = useCallback(() => {
    setMe(token, {
      _id,
      nickname,
      status,
      profilePic,
      areaCodes: areaCodesArray,
      oauthType,
      oauthId,
    });
  }, [token, _id, nickname, status, profilePic, areaCodes, oauthType, oauthId]);

  useEffect(() => {
    handleSetMe();
  }, [handleSetMe]);

  if (status === 'pending') {
    console.log('추가 정보 입력 페이지로 이동합니다.');
    return <Navigate to="/sign-up2" />;
  }

  return <Navigate to="/" />;
}
