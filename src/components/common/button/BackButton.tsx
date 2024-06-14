import { useNavigate } from 'react-router-dom';

export default function BackButton({ ...htmlButtonProps }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        navigate(-1);
      }}
      {...htmlButtonProps}
    >
      <img src="/icons/back.svg" alt="뒤로가기" />
    </button>
  );
}
