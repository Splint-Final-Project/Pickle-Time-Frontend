import theme from '@/styles/theme';

export const buttonStyleByType = {
  PRIMARY: `
    background-color: ${theme.color.primary};
    color: ${theme.color.white};
    &:hover {
      background-color: #47c15b
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
