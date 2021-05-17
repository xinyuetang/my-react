import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import Page from "src/components/Page";
import BulletinManage from "./BulletinManage";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));
const BulletinManageView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="通知管理">
      <Container maxWidth={false}>
        <BulletinManage></BulletinManage>
      </Container>
    </Page>
  );
};

export default BulletinManageView;
