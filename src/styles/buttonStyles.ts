import theme from '@/styles/theme';

export const buttonStyleByType = {
  PRIMARY: `
    background-color: #a0d911;
    color: ${theme.color.white};
    &:hover {
      background-color: #99cc18;
    }
  `,

  SECONDARY: `
    border: 1px solid #a0d911;
    background-color: ${theme.color.white};
    &:hover {
      background-color: #f1f5e5;
    }
  `,
};
