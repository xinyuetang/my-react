import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  makeStyles,
} from "@material-ui/core";
import { postFetch } from "src/base";
import { ADD_SEMINAR_URL } from "src/settings";

const useStyles = makeStyles((theme) => ({}));

const SeminarManageForm = (props) => {
  const { onClose, open, users } = props;

  const classes = useStyles();
  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <Formik
        initialValues={{
          theme: "",
          date: null,
          stuId: null,
        }}
        validationSchema={Yup.object().shape({
          theme: Yup.string().required(),
          date: Yup.string().required(),
          stuId: Yup.number().required(),
        })}
        onSubmit={(values) => {
          postFetch({
            url: ADD_SEMINAR_URL,
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
                添加演讲安排
              </Typography>
            </Box>
            <TextField
              fullWidth
              label="演讲主题"
              margin="normal"
              name="theme"
              onBlur={handleBlur}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              select
              fullWidth
              label="主讲人"
              name="stuId"
              margin="normal"
              onChange={handleChange}
              variant="outlined"
              SelectProps={{
                native: true,
              }}
            >
              <option value={null}> 请选择</option>
              {users.map((option) => (
                <option key={option.stuId} value={option.stuId}>
                  {option.name}
                </option>
              ))}
            </TextField>
            <TextField
              label="时间"
              type="datetime"
              margin="normal"
              fullWidth
              name="date"
              defaultValue="2021-01-24"
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
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
};
export default SeminarManageForm;
