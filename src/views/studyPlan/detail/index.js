import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import Page from "src/components/Page";
// import EssayClasses from "./EssayClasses";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));
const StudyPlanDetailView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="论文分类">
      <Container maxWidth={false}>
        {/* <EssayClasses /> */}StudyPlanDetailView
      </Container>
    </Page>
  );
};

export default StudyPlanDetailView;
