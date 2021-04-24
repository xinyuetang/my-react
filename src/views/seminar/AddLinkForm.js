import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import cookie from 'react-cookies'
import {
  Button,
  TextField,
  makeStyles,
} from '@material-ui/core';
import {ADD_SEMINAR_LINK_URL} from 'src/settings'

const useStyles = makeStyles(() => ({
    root:{
      '& input':{
        maxWidth:'8rem'
      },
      '& button':{
      background: "#2f3c88",
      color: "white",
      fontWeight: 500,
      marginLeft: "5px",
      verticalAlign: "bottom"
      }
    }
  }));
function AddLinkForm(props){    
    const { SeminarID,link} = props;
    const classes = useStyles();
    return(
    <Formik
        initialValues={{
          link: link
        }}
        validationSchema={Yup.object().shape({
          link: Yup.string().required()
        })}

        onSubmit={(values) => {
            fetch(ADD_SEMINAR_LINK_URL+'?link='+values.link+'&id='+SeminarID, {
            method: 'GET',
            headers: new Headers({
                'token': cookie.load("userInfo").token,
            }),
          }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => {
            if(response.result==="success"){
            console.log("添加成功");
          }else{
            //失败
            alert("添加失败");
          }});
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
            <form  onSubmit={handleSubmit} className={classes.root}>
            <TextField onChange={handleChange} size="small"name="link" label="请填写资源链接" defaultValue={link} />
            <Button size="small" type="submit">提交</Button>
            </form>
        )}
      </Formik>);
}
export default AddLinkForm