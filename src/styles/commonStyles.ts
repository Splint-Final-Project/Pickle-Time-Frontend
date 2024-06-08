import styled from '@emotion/styled';

export const GridTemplate = styled.div`
  display: grid;
  justify-content: center;
  align-items: flex-start;

  margin-top: 2rem;

  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  grid-gap: 2rem;
`;
