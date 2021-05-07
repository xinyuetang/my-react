import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import Page from "src/components/Page";
import Essays from "./Essays";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));
const EssaysView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="论文列表">
      <Container maxWidth={false}>
        <Essays />
      </Container>
    </Page>
  );
};

export default EssaysView;
