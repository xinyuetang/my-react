import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField, Typography, Dialog } from "@material-ui/core";
import { postFetch } from "src/base";
import { ADD_RECORDER_URL } from "src/settings";

export default function RecorderManageForm(props) {
  const { onClose, open, users } = props;

  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <Formik
        initialValues={{
          date: null,
          recorder1ID: null,
          recorder2ID: null,
          summaryerID: null,
        }}
        validationSchema={Yup.object().shape({
          date: Yup.string().required(),
          summaryerID: Yup.number().required(),
        })}
        onSubmit={(values) => {
          postFetch({
            url: ADD_RECORDER_URL,
            values,
            successCallback: () => {
              console.log("添加成功");
              handleClose();
            },
            errorCallback: () => {
              alert("添加失败");
              window.location.reload();
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
            <Box mb={1}>
              <Typography color="textPrimary" variant="h6">
                添加辅读安排
              </Typography>
            </Box>
            <TextField
              label="时间"
              type="date"
              margin="normal"
              fullWidth
              name="date"
              defaultValue="2021-01-24"
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              select
              fullWidth
              label="辅读人1"
              name="recorder1ID"
              margin="normal"
              onChange={handleChange}
              variant="outlined"
              SelectProps={{
                native: true,
              }}
            >
              <option value={null}> 请选择</option>
              {users.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </TextField>
            <TextField
              select
              fullWidth
              label="辅读人2"
              name="recorder2ID"
              margin="normal"
              onChange={handleChange}
              variant="outlined"
              SelectProps={{
                native: true,
              }}
            >
              <option value={null}> 请选择</option>
              {users.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </TextField>
            <TextField
              select
              fullWidth
              label="记录员"
              name="summaryerID"
              margin="normal"
              onChange={handleChange}
              variant="outlined"
              SelectProps={{
                native: true,
              }}
            >
              <option value={null}> 请选择</option>
              {users.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </TextField>
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
