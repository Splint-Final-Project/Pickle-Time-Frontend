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
    border: 1px solid ${theme.color.primary};
    background-color: ${theme.color.white};
    color: ${theme.color.primary};
  `,
};
