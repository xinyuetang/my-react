import React from "react";
import clsx from "clsx";
import { useFormik } from "formik";
import { postFetch } from "src/base";
import {
  Box,
  Button,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { UPDATE_USER_URL } from "src/settings";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1.5),
  },
  textField: {
    width: "47.9%",
  },
}));
const types = [
  {
    value: 10,
    label: "学术型",
  },
  {
    value: 20,
    label: "结合型",
  },
  {
    value: 30,
    label: "技术型",
  },
];
export default function UpdateUserInfoForm({ userDetail }) {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: userDetail,
    onSubmit: (values) => {
      postFetch({
        url: UPDATE_USER_URL,
        values,
        successCallback: () => {
          console.log("修改用户信息成功");
        },
      });
    },
  });
  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    touched,
    values,
  } = formik;
  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <TextField
        label="用户姓名"
        fullWidth
        name="name"
        value={values.name}
        variant="outlined"
        InputProps={{
          readOnly: true,
        }}
        className={classes.margin}
      />
      <TextField
        label="学/工号"
        fullWidth
        name="stuId"
        value={values.stuId}
        variant="outlined"
        InputProps={{
          readOnly: true,
        }}
        className={classes.margin}
      />
      <TextField
        error={Boolean(touched.name && errors.name)}
        label="手机"
        name="telephone"
        className={clsx(classes.margin, classes.textField)}
        onBlur={handleBlur}
        onChange={handleChange}
        variant="outlined"
        value={values.telephone}
        max={11}
        type="tel"
      />
      <TextField
        error={Boolean(touched.name && errors.name)}
        label="邮箱"
        name="email"
        className={clsx(classes.margin, classes.textField)}
        onBlur={handleBlur}
        onChange={handleChange}
        variant="outlined"
        value={values.email}
        type="email"
      />
      <TextField
        error={Boolean(touched.name && errors.name)}
        label="导师"
        name="mentor"
        className={clsx(classes.margin, classes.textField)}
        onBlur={handleBlur}
        onChange={handleChange}
        variant="outlined"
        value={values.mentor}
      />
      <TextField
        error={Boolean(touched.name && errors.name)}
        label="汇报人"
        name="leader"
        className={clsx(classes.margin, classes.textField)}
        onBlur={handleBlur}
        onChange={handleChange}
        variant="outlined"
        value={values.leader}
      />
      <TextField
        error={Boolean(touched.name && errors.name)}
        select
        label="就读类型"
        name="studyType"
        className={clsx(classes.margin, classes.textField)}
        onBlur={handleBlur}
        onChange={handleChange}
        variant="outlined"
        value={values.studyType}
        SelectProps={{
          native: true,
        }}
      >
        {types.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>
      <TextField
        error={Boolean(touched.name && errors.name)}
        select
        label="是否科硕"
        name="keshuo"
        className={clsx(classes.margin, classes.textField)}
        onBlur={handleBlur}
        onChange={handleChange}
        variant="outlined"
        value={values.keshuo}
        SelectProps={{
          native: true,
        }}
      >
        <option value={0}>否</option>
        <option value={1}>是</option>
      </TextField>
      <TextField
        error={Boolean(touched.name && errors.name)}
        multiline
        fullWidth
        rows={4}
        label="论文"
        name="papers"
        className={classes.margin}
        onBlur={handleBlur}
        onChange={handleChange}
        variant="outlined"
        value={values.papers}
      />
      <TextField
        error={Boolean(touched.name && errors.name)}
        multiline
        fullWidth
        rows={4}
        label="专利"
        name="patents"
        className={classes.margin}
        onBlur={handleBlur}
        onChange={handleChange}
        variant="outlined"
        value={values.patents}
      />
      <TextField
        error={Boolean(touched.name && errors.name)}
        multiline
        fullWidth
        rows={4}
        label="服务"
        name="services"
        className={classes.margin}
        onBlur={handleBlur}
        onChange={handleChange}
        variant="outlined"
        value={values.services}
      />
      <TextField
        error={Boolean(touched.name && errors.name)}
        multiline
        fullWidth
        rows={4}
        label="项目"
        name="projects"
        className={classes.margin}
        onBlur={handleBlur}
        onChange={handleChange}
        variant="outlined"
        value={values.projects}
      />
      <Box my={2} className={classes.margin}>
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
  );
}
