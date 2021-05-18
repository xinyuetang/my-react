import React, { useState, useEffect } from "react";
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
import {
  MNG_ADD_PLAN_URL,
  MNG_UPDATE_PLAN_URL,
  MNG_GET_ALL_PLAN_URL,
} from "src/settings";
import { postFetch } from "src/base";
import alertBox from "src/components/AlertBox";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3)
  },
}));

export default function EditStudyPlan(props) {
  const { onClose, open, planDetail } = props;
  const [plans, setPlans] = useState([]);
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };
  useEffect(() => {
    fetch(`${MNG_GET_ALL_PLAN_URL}?limit=100`, {})
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        setPlans(response?.data || []);
      })
  }, [])
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
              alertBox({ text: "操作成功", severity: "success" });
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
              disabled={planDetail?.id > 0}
            />
            {!planDetail?.id && (
              <TextField
                select
                fullWidth
                label="是否选择模板创建"
                name="templateId"
                margin="normal"
                onChange={handleChange}
                variant="outlined"
                SelectProps={{
                  native: true,
                }}
              >
                <option value={0}>否</option>
                {plans?.map((plan) => (
                  <option key={plan.id} value={plan.id}>{plan?.name}</option>
                ))}
              </TextField>
            )}

            <Box my={2}>
              <Button
                color="primary"
                // disabled={isSubmitting}
                size="large"
                type="submit"
                variant="contained"
                fullWidth
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
