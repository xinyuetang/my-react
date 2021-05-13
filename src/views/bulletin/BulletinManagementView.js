import React, { useRef, useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
// import cookie from "react-cookies";
// import { BASE_URL } from "src/settings";
// import SockJsClient from "react-stomp";
import {
  Box,
  Button,
  Container,
  TextField,
  makeStyles,
} from "@material-ui/core";
import alertBox from "src/components/AlertBox";
import Page from "src/components/Page";
import { ADD_BULLETIN_URL } from "src/settings";
import { Redirect } from "react-router-dom";
import { UserContext } from "src/layouts/Context";
import { postFetch } from "src/base";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  image: {
    marginTop: 50,
    display: "inline-block",
    maxWidth: "100%",
    width: 560,
  },
}));

const BulletinManagementView = () => {
  const classes = useStyles();
  // const ref = useRef();
  const { userInfo } = useContext(UserContext);
  // const sendMessage = (msg) => {
  //   //发送消息
  //   ref.current.sendMessage("/app/server", msg);
  // };

  return userInfo.roleId !== 10 && userInfo.roleId !== 60 ? (
    <Redirect to="/404" />
  ) : (
    <div>
      {/* <SockJsClient
        url={BASE_URL + "/ws"}
        topics={["/topic/bulletin"]}
        onMessage={() => {}}
        ref={ref}
      /> */}
      <Page className={classes.root} title="通告管理">
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          justifyContent="center"
        >
          <Container maxWidth="md">
            <Formik
              initialValues={{
                title: "",
                content: "",
              }}
              validationSchema={Yup.object().shape({
                title: Yup.string().max(255).required("通知标题不能为空"),
                content: Yup.string().required("通知内容不能为空"),
              })}
              onSubmit={(values) => {
                postFetch({
                  url: ADD_BULLETIN_URL,
                  values,
                  successCallback: () => {
                    // sendMessage("xxx");
                    alertBox({ text: "通知发送成功", severity: "success" });
                    window.location.reload()
                  },
                });
                // var url = ADD_BULLETIN_URL;
                // fetch(url, {
                //   method: "POST",
                //   headers: new Headers({
                //     token: cookie.load("userInfo").token,
                //     "Content-Type": "application/json;charset=utf-8",
                //   }),
                //   body: JSON.stringify(values),
                // });
                // sendMessage("xxx");
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                //isSubmitting,
                touched,
                values,
              }) => (
                <form onSubmit={handleSubmit}>
                  <TextField
                    error={Boolean(errors.title)}
                    fullWidth
                    helperText={errors.title}
                    label="编辑通知标题"
                    margin="normal"
                    name="title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant="outlined"
                  />

                  <TextField
                    error={Boolean(errors.content)}
                    fullWidth
                    helperText={errors.content}
                    label="编辑通知内容"
                    margin="normal"
                    name="content"
                    multiline
                    rows={10}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant="outlined"
                  />

                  <Box my={2}>
                    <Button
                      color="primary"
                      //disabled={isSubmitting}
                      fullWidth
                      // size="large"
                      type="submit"
                      variant="contained"
                    >
                      发布新通知
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Container>
        </Box>
      </Page>
    </div>
  );
};

export default BulletinManagementView;
