import React from 'react';
import { Link as RouterLink,Redirect ,useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import cookie from 'react-cookies'
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';

import Page from 'src/components/Page';
import {LOGIN_URL} from 'src/settings';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));


function LoginView  (){
  const classes = useStyles();
  let history = useHistory();
  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              studentID: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              studentID: Yup.string().max(255).required('ID is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={(values) => {
          
              var url = LOGIN_URL+'?studentID='+values.studentID+'&password='+values.password;
              fetch(url, {
                method: 'GET', 
              }).then(res => res.json())
              .catch(error => console.error('Error:', error))
              .then(response => {
                if(response.result==="success"){
                cookie.save('userInfo',response,{path:"/"});
                //navigate('', { replace: true });
                console.log("logged in");
                history.replace('/app/seminar');
              }else{
                //登录失败
                alert("用户名不存在或密码错误");
                window.location.reload();
              }});

            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    登录
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.studentID && errors.studentID)}
                  fullWidth
                  helperText={touched.studentID && errors.studentID}
                  label="学/工号"
                  margin="normal"
                  name="studentID"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="密码"
                  margin="normal"
                  name="password"
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
                    登录
                  </Button>
                </Box>
                {/* <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Don&apos;t have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6"
                  >
                    Sign up
                  </Link>
                </Typography> */}
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
