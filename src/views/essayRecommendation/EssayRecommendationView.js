import React from 'react';
import {
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import EssayRecommendation from './EssayRecommendation';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const EssayRecommendationView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="推荐论文"
    >
      <Container maxWidth={false}>
        <EssayRecommendation></EssayRecommendation>
      </Container>
    </Page>
  );
};

export default EssayRecommendationView;
