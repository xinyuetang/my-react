import React from "react";
import { Formik } from "formik";
import {
  Box,
  Button,
  TextField,
  Dialog,
  makeStyles,
  DialogTitle,
} from "@material-ui/core";
import { MNG_UPDATE_WORK_URL, MNG_ADD_WORK_URL } from "src/settings";
import { postFetch } from "src/base";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3)
  },
}));

export default function EditWork(props) {
  const { onClose, open, workDetail, workType, planStageId } = props;
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog onClose={handleClose} open={open} className={classes.root}>
      <DialogTitle onClose={handleClose}>
        {workDetail?.id ? "编辑任务" : "新增任务"}
      </DialogTitle>
      <Formik
        initialValues={workDetail}
        onSubmit={(values) => {
          postFetch({
            url: workDetail?.id > 0 ? MNG_UPDATE_WORK_URL : MNG_ADD_WORK_URL,
            values: {
              ...values,
              workType,
              planStageId,
            },
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
              label="任务名称"
              fullWidth
              margin="normal"
              name="name"
              value={values.name}
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
