import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField, Typography, Dialog } from "@material-ui/core";
import { ADD_CLASS_URL } from "src/settings";
import { postFetch } from 'src/base'

export default function NewClassForm(props) {
  const { onClose, open, tag } = props;

  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <Formik
        initialValues={{
          name: "",
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required(),
        })}
        onSubmit={(values) => {
          postFetch({
            url: ADD_CLASS_URL,
            values: {
              ...values,
              tag
            },
          });
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
          values,
        }) => (
          <form onSubmit={handleSubmit} className="dialogForm">
            <Box mb={1}>
              <Typography color="textPrimary" variant="h4">
                新建论文分类
              </Typography>
            </Box>
            <TextField
              error={Boolean(touched.name && errors.name)}
              fullWidth
              label="新建类名称"
              margin="normal"
              name="name"
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
  );
}
