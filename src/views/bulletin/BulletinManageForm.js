import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  TextField,
  Dialog,
} from "@material-ui/core";
import { postFetch } from "src/base";
import { MNG_ADD_BULLETIN_URL } from "src/settings";
import alertBox from "src/components/AlertBox";

const BulletinManageForm = (props) => {
  const { onClose, open } = props;
  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog onClose={handleClose} open={open}>
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
            url: MNG_ADD_BULLETIN_URL,
            values,
            successCallback: () => {
              // sendMessage("xxx");
              handleClose();
              alertBox({ text: "通知发送成功", severity: "success" });
            },
          });
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
          <form onSubmit={handleSubmit} className="dialogForm">
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
    </Dialog>
  );
};
export default BulletinManageForm;
