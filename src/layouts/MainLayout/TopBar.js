import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles
} from '@material-ui/core';


const useStyles = makeStyles(({
  root: {},
  toolbar: {
    height: 64,
  }
}));

const TopBar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar className={classes.toolbar}>
      <RouterLink to="/">
        <Typography color="secondary"
         variant="h4">
            复旦大学系统软件与安全实验室
    
          </Typography>
      </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string
};

export default TopBar;
