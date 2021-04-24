import React from 'react';
import {
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import RecorderManage from './RecorderManage';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const RecorderView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="辅读安排"
    >
      <Container maxWidth={false}>
        <RecorderManage></RecorderManage>
      </Container>
    </Page>
  );
};

export default RecorderView;
