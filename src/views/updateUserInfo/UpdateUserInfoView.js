import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Typography,
  Divider,
  makeStyles,
} from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import { GET_USER_DETAIL } from "src/settings";
import UpdateUserInfoForm from "./UpdateUserInfoForm";
const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "16px",
    "& p": {
      lineHeight: 2,
    },
  },
  box: {
    padding: '16px'
  }
}));
export default function UpdateUserInfoView(props) {
  let { id } = useParams();
  const history = useHistory();
  let [userDetail, setUserDetail] = useState({});
  const classes = useStyles();
  const getUserInfo = () => {
    fetch(`${GET_USER_DETAIL}?stuId=${id}`, {})
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        console.log(response);
        setUserDetail(response?.data || {});
      });
  };
  useEffect(getUserInfo, []);
  return (
    <div>
      <Card>
        <Box className={classes.header}>
          <Typography color="textPrimary" size="small">
            用户编辑
          </Typography>
          <Button
            color="primary"
            size="small"
            variant="outlined"
            onClick={history.goBack}
          >
            返回
          </Button>
        </Box>
        <Divider />
        {/* <PerfectScrollbar> */}
        <Box minWidth={800} className={classes.box}>
          {userDetail?.id > 0 && <UpdateUserInfoForm userDetail={userDetail} />}
        </Box>
        {/* </PerfectScrollbar> */}
      </Card>
    </div>
  );
}
