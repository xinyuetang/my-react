import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import cookie from "react-cookies";
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  makeStyles,
} from "@material-ui/core";
import { ADD_ARTICLE_URL } from "src/settings";
import { postFetch } from "src/base";

export default function NewArticleForm(props) {
  const { onClose, open, classes } = props;

  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <Formik
        initialValues={{
          title: "",
          classID: null,
          content: "",
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string().max(255).required(),
          classID: Yup.number().required(),
        })}
        onSubmit={(values) => {
          postFetch({
            url: ADD_ARTICLE_URL,
            values,
            successCallback: handleClose,
          });
          // var url = ADD_ARTICLE_URL;
          // fetch(url, {
          //   method: 'POST',
          //   headers: new Headers({
          //       'token': cookie.load("userInfo").token,
          //       'Content-Type': 'application/json;charset=utf-8'
          // }),
          // body: JSON.stringify(values)

          // }).then(res => res.json())
          // .catch(error => console.error('Error:', error))
          // .then(response => console.log(response));
          // handleClose();
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
          <form onSubmit={handleSubmit} className="dialogForm">
            <Box mb={1}>
              <Typography color="textPrimary" variant="h4">
                新建文章
              </Typography>
            </Box>
            <TextField
              error={Boolean(touched.name && errors.name)}
              fullWidth
              label="新建文章名称"
              margin="normal"
              name="title"
              onBlur={handleBlur}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              select
              fullWidth
              label="所属类别"
              name="classID"
              margin="normal"
              onChange={handleChange}
              variant="outlined"
              SelectProps={{
                native: true,
              }}
            >
              <option value={null}> 请选择</option>
              {classes.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </TextField>

            <Box my={2}>
              <Button
                color="primary"
                // disabled={isSubmitting}
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
  );
}
