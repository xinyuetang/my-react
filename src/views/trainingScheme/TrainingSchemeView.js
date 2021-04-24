import React from 'react';
import {
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import TrainingScheme from './TrainingScheme';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const TrainingSchemeView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="培养方案"
    >
      <Container maxWidth={false}>
        <TrainingScheme></TrainingScheme>
      </Container>
    </Page>
  );
};

export default TrainingSchemeView;
