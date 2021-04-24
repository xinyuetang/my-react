import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import cookie from 'react-cookies'
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
} from '@material-ui/core';
import {ADD_CLASS_URL} from 'src/settings';
  
export default function NewClassForm(props){
    const { onClose, open ,tag} = props;

    const handleClose = () => {
        onClose();
      };
    return (
        <Dialog onClose={handleClose} open={open} >
        <Formik
          initialValues={{
            className: ''
          }}
          validationSchema={Yup.object().shape({
            className: Yup.string().max(255).required(),
          })}
          onSubmit={(values) => {
            var url = ADD_CLASS_URL+'?className='+values.className+'&tag='+tag;
            fetch(url, {
              method: 'GET',
              headers: new Headers({
                  'token': cookie.load("userInfo").token,
              }),
  
            }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log(response));
            handleClose();
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
            <form onSubmit={handleSubmit} className='dialogForm'>
              <Box mb={1}>
                <Typography
                  color="textPrimary"
                  variant="h4"
                >
                  新建类
                </Typography>
              </Box>
              <TextField
                error={Boolean(touched.name && errors.name)}
                fullWidth
                label="新建类名称"
                margin="normal"
                name="className"
                onBlur={handleBlur}
                onChange={handleChange}
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
                  提交
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Dialog>

    )
}


