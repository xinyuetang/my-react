import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import Page from "src/components/Page";
import StudyPlan from "./StudyPlan";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));
const StudyPlanView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="培养计划">
      <Container maxWidth={false}>
        <StudyPlan />
      </Container>
    </Page>
  );
};

export default StudyPlanView;
