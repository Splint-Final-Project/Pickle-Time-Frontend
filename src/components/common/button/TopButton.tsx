import styled from '@emotion/styled';
import useScrollToTop from '@/hooks/useScrollToTop';
import ArrowTopIcon from '@/assets/icons/ArrowTopIcon';

export default function TopButton({ ...htmlButtonProps }) {
  const showButton = useScrollToTop();

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {showButton && (
        <Styled.TopButton type="button" onClick={scrollToTop} {...htmlButtonProps}>
          <ArrowTopIcon />
        </Styled.TopButton>
      )}
    </>
  );
}

const Styled = {
  TopButton: styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;

    width: 5rem;
    height: 5rem;
    border: ${({ theme }) => theme.border};
    border-radius: 999rem;
    background-color: ${({ theme }) => theme.color.white};
  `,
};
