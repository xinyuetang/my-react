import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import cookie from 'react-cookies'
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  makeStyles
} from '@material-ui/core';
import {ADD_SEMINAR_URL} from 'src/settings'

const useStyles = makeStyles((theme) => ({
 
}));
    

const SeminarManageForm=(props)=>{    
    const { onClose, open , users} = props;
    
    const classes = useStyles();
    const handleClose = () => {
        onClose();
      };
    return(
    <Dialog onClose={handleClose} open={open} >
    <Formik
        initialValues={{
          theme: '',
          date: null,
          speakerID:null,
        }}
        validationSchema={Yup.object().shape({
          theme: Yup.string().required(),
          date: Yup.string().required(),
          speakerID:  Yup.number().required()
        })}

        onSubmit={(values) => {
            console.log(values);
            var url = ADD_SEMINAR_URL;
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
            console.log("添加成功");
          }else{
            //失败
            alert("添加失败");
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
                variant="h6"
              >
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
            name = "speakerID"
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
      </Dialog> );
}
export default SeminarManageForm