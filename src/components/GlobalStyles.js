import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => createStyles({
  '@global': {
    '*': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
    },
    html: {
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      height: '100%',
      width: '100%'
    },
    body: {
      backgroundColor: '#f4f6f8',
      height: '100%',
      width: '100%'
    },
    a: {
      textDecoration: 'none'
    },
    '#root': {
      height: '100%',
      width: '100%'
    },
    '.dialogForm': {
      width: 400,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    }
  }
}));

const GlobalStyles = () => {
  useStyles();

  return null;
};

export default GlobalStyles;
