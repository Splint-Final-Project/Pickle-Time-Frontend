import TodayPickle from '@/components/my-page/TodayPickle';

export default function MyPage() {
  return (
    <div>
      <div className="상단섹션">
        <h1>마이 페이지</h1>
        <div className="프로필">
          <div>
            <div>사용자 이미지</div>
            <span>닉네임</span>
          </div>
          <div>환경설정 아이콘</div>
        </div>
        <TodayPickle />
        <div>탭 버튼 컴포넌트</div>
      </div>
      <div className="다이나믹렌더섹션">다이나믹렌더 컴포넌트</div>
    </div>
  );
}
