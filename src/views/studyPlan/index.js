import React, { useContext } from "react";
import { Container, makeStyles } from "@material-ui/core";
import { UserContext } from "src/layouts/Context";
import Page from "src/components/Page";
import StudyPlanManage from "./StudyPlanManage";

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
  const { userInfo } = useContext(UserContext);
  const hasPermission = userInfo.roleId === 10 || userInfo.roleId === 50;
  console.log(hasPermission, userInfo);

  return (
    <Page className={classes.root} title="培养计划">
      <Container maxWidth={false}>
        {hasPermission ? (
          <StudyPlanManage />
        ) : (
          <div>sadadsdas</div>
        )}
      </Container>
    </Page>
  );
};

export default StudyPlanView;
