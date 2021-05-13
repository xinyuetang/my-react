import React from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import { postFetch } from "src/base";
import * as Yup from 'yup';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import Page from 'src/components/Page';
import { RESET_PASSWORD_URL } from "src/settings";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  return: {
    float: 'right'
  }
}));


const ResetPasswordView = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Page className={classes.root} title="修改密码">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              oldPassword: "",
              newPassword: "",
            }}
            validationSchema={Yup.object().shape({
              newPassword: Yup.string()
                .max(255)
                .required("Password is required"),
              oldPassword: Yup.string()
                .max(255)
                .required("Password is required"),
            })}
            onSubmit={(values) => {
              postFetch({
                url: RESET_PASSWORD_URL,
                values,
                successCallback: () => {
                  history.goBack();
                },
              });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    align="justify"
                    gutterBottom
                    color="textPrimary"
                    variant="h2"
                  >
                    修改密码
                    <Button
                      className={classes.return}
                      endIcon={<KeyboardReturnIcon />}
                      onClick={history.goBack}
                    >
                      返回
                    </Button>
                  </Typography>
                </Box>
                {/* <TextField
                  error={Boolean(touched.stuId && errors.stuId)}
                  fullWidth
                  helperText={touched.stuId && errors.stuId}
                  label="学/工号"
                  margin="normal"
                  name="stuId"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  variant="outlined"
                /> */}
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="原密码"
                  margin="normal"
                  name="oldPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="新密码"
                  margin="normal"
                  name="newPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    确认修改
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default ResetPasswordView;
