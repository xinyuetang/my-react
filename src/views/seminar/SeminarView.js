import React from 'react';
import {
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import SeminarManage from './SeminarManage';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));
const SeminarView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="演讲安排"
    >
      <Container maxWidth={false}>
        <SeminarManage></SeminarManage>
      </Container>
    </Page>
  );
};

export default SeminarView;
