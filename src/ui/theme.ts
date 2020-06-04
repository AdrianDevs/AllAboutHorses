import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  spacing: (factor) => `${0.5 * factor}rem`, // (Bootstrap strategy) | = 0.5 * 2rem = 1rem = 16px
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;
