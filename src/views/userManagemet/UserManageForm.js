import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { postFetch } from "src/base";
import { Box, Button, TextField, Typography, Dialog } from "@material-ui/core";
import { ADD_USER_URL } from "src/settings";
const userRoles = [
  {
    value: 10,
    label: "系统管理员",
  },
  {
    value: 20,
    label: "讨论班管理员",
  },
  {
    value: 30,
    label: "Lab管理员",
  },
  {
    value: 40,
    label: "推荐论文管理员",
  },
  {
    value: 50,
    label: "培养方案管理员",
  },
  {
    value: 60,
    label: "通知管理员",
  },
  {
    value: 0,
    label: "普通用户",
  },
];
function UserManageForm(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Formik
        initialValues={{
          name: "",
          studentID: "",
          roleID: 0,
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required(),
          studentID: Yup.string().max(255).required(),
          roleID: Yup.number().required(),
        })}
        onSubmit={(values) => {
          postFetch({
            url: ADD_USER_URL,
            values,
            successCallback: () => {
              console.log("添加用户成功");
              handleClose();
            },
            errorCallback: () => {
              alert("添加用户失败");
              window.location.reload();
            }
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
              <Typography color="textPrimary" variant="h4">
                添加新用户
              </Typography>
            </Box>
            <TextField
              error={Boolean(touched.name && errors.name)}
              fullWidth
              label="用户姓名"
              margin="normal"
              name="name"
              onBlur={handleBlur}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              error={Boolean(touched.studentID && errors.studentID)}
              fullWidth
              label="学/工号"
              margin="normal"
              name="studentID"
              onBlur={handleBlur}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              select
              fullWidth
              label="权限"
              name="roleID"
              margin="normal"
              onChange={handleChange}
              variant="outlined"
              SelectProps={{
                native: true,
              }}
            >
              {userRoles.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
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
export default UserManageForm;
