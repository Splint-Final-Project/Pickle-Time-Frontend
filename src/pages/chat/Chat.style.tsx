import styled from '@emotion/styled';

export const S = {
  Container: styled.div`
    height: 100%;
    position: relative;
    overflow: auto; 
  `,

  Header: styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 8rem;
    padding: 4rem 2rem 2rem;
  `,

  HeaderTitle: styled.span`
    color: #181f29;
    font-family: Pretendard;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `,

  ArrowIcon: styled.img`
    width: 0.7rem;
    height: 1.3rem;
    flex-shrink: 0;
    /* stroke-width: 1.5rem; */
    /* stroke: #181F29; */
  `,

  Gongji: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0rem 2rem 2rem;
    width: 100%;
    height: 6.4rem;
    flex-shrink: 0;
    border-radius: 0px 0px 2.0rem 2.0rem;
    background: #E9F4F2;
  `,

  GongjiWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  GongjiText: styled.span`
    color: #181F29;
    font-family: Pretendard;
    font-size: 1.4rem;
    font-weight: 500;
    font-style: normal;
    line-height: normal;
  `,

  MessageContainer: styled.div`
    height: 78.1vh;
    overflow-y: auto;
    flex-grow: 1;
  `,

  ForRefInMessageContainer: styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
  `,

  MessageLayout: styled.form`
    width: 100%;
    max-width: 767px;
    display: flex;
    position: fixed;
    align-items: center;
    bottom: 0rem;
    margin: 2rem 1rem;
    gap: 1rem;
  `,

  InputWrapper: styled.div`
    display: flex;
    align-items: center;
    width: 90%;
    height: 4.1rem;
    flex-shrink: 0;
    border-radius: 2.0rem;
    background: #F3F4F6;
    padding: 2rem;
    gap: 1rem;
  `,

  InputMessage: styled.input`
    width: 100%;
    border: none;
    background: #F3F4F6;
  `,

  MessageImg: styled.img`
    cursor: pointer;
  `,

  BaseImg: styled.img`
    cursor: pointer;
  `

};