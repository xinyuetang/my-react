import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import cookie from 'react-cookies'
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog
} from '@material-ui/core';
import {ADD_USER_URL} from 'src/settings'
const userRoles = [
    {
      value: 0,
      label: '系统管理员',
    },
    {
      value: 1,
      label: '讨论班管理员',
    },
    {
        value:2, 
        label: "Lab管理员"
    },
    {
        value:3,
        label: "推荐论文管理员"
    },
    {
        value:4,
        label: "培养方案管理员"
    },
    {
        value:5,
        label: "通知管理员"
    },
    {
      value:6,
      label: "普通用户"
  }
]
function UserManageForm(props){
    const { onClose, open} = props;
  
    const handleClose = () => {
        onClose();
      };
    
    return(

    <Dialog onClose={handleClose} open={open} >
      <Formik
        initialValues={{
          name: '',
          studentID: '',
          roleID:0,
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required(),
          studentID: Yup.string().max(255).required(),
          roleID:  Yup.number().required()
        })}
        onSubmit={(values) => {
          var url = ADD_USER_URL;
          fetch(url, {
            method: 'POST',
            headers: new Headers({
                'token': cookie.load("userInfo").token,
                'Content-Type': 'application/json;charset=utf-8'
            }),
            body: JSON.stringify(values)

          }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => {
            
            if(response.result==="success"){
            console.log("添加用户成功");
          }else{
            //失败
            alert("添加用户失败");
          }});
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
          values
        }) => (
          <form onSubmit={handleSubmit} className='dialogForm'>
            <Box mb={1}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
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
            name = "roleID"
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
export default UserManageForm