import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  TextField,
  Dialog,
  makeStyles,
  DialogTitle,
} from "@material-ui/core";
import { MNG_ADD_PLAN_URL, MNG_UPDATE_PLAN_URL } from "src/settings";
import { postFetch } from "src/base";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3)
  },
}));

export default function EditStudyPlan(props) {
  const { onClose, open, planDetail } = props;
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle onClose={handleClose}>
        {planDetail?.id ? "编辑培养计划" : "新增培养计划"}
      </DialogTitle>
      <Formik
        initialValues={planDetail}
        onSubmit={(values) => {
          postFetch({
            url: planDetail?.id > 0 ? MNG_UPDATE_PLAN_URL : MNG_ADD_PLAN_URL,
            values,
            successCallback: () => {
              alert("操作成功");
              handleClose();
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
          <form onSubmit={handleSubmit} className="dialogForm">
            <TextField
              label="名称"
              fullWidth
              margin="normal"
              name="name"
              value={values.name}
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <TextField
              label="入学年份"
              margin="normal"
              fullWidth
              name="enrollYear"
              value={values.enrollYear}
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
            />

            <Box my={2}>
              <Button
                color="primary"
                // disabled={isSubmitting}
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
