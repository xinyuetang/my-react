import React from 'react';
import {
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import UserManage from './UserManage.js';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const UserManagementView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="用户管理"
    >
      <Container maxWidth={false}>
        <UserManage></UserManage>
      </Container>
    </Page>
  );
};

export default UserManagementView;
 