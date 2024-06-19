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

  DISABLE: `
  background-color: ${theme.color.category};
  border-radius: 0.4rem
  color:  ${theme.color.sub};
  ${theme.typography.body1}
  
  `,
};

export const roundButtonStyle = {
  GRAY: `
    background-color: ${theme.color.background};
    color: ${theme.color.sub};
  `,

  BLACK: `
    background-color: ${theme.color.basic};
    color: ${theme.color.white};
  `,
};
