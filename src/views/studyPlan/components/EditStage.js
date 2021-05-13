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
import { MNG_UPDATE_STAGE_URL, MNG_ADD_STAGE_URL } from "src/settings";
import { postFetch } from "src/base";
import alertBox from "src/components/AlertBox";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3)
  },
}));

export default function EditStage(props) {
  const { onClose, open, stageDetail, planId } = props;
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog onClose={handleClose} open={open} className={classes.root}>
      <DialogTitle onClose={handleClose}>
        {stageDetail?.id ? "编辑培养阶段" : "新增培养阶段"}
      </DialogTitle>
      <Formik
        initialValues={stageDetail}
        onSubmit={(values) => {
          postFetch({
            url: stageDetail?.id > 0 ? MNG_UPDATE_STAGE_URL : MNG_ADD_STAGE_URL,
            values: {
              ...values,
              planId,
            },
            successCallback: () => {
              alertBox({ text: "操作成功", severity: "success" });
              handleClose();
            },
          });
        }}
      >
        {({ handleBlur, handleChange, handleSubmit, isSubmitting, values }) => (
          <form onSubmit={handleSubmit} className="dialogForm">
            <TextField
              label="学期"
              fullWidth
              margin="normal"
              name="term"
              value={values.term}
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <TextField
              label="结束时间"
              type="date"
              margin="normal"
              fullWidth
              name="endDate"
              value={values.endDate}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
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
