import React,{useState} from 'react';
import cookie from 'react-cookies'
import {
  Button,
  makeStyles,
  Input,
  Typography,
} from '@material-ui/core';
import {UPLOAD_RECORDER1_URL,UPLOAD_RECORDER2_URL,UPLOAD_SUMMARY_URL} from 'src/settings'

const useStyles = makeStyles(() => ({
    root:{
      display:"inline-flex",
      margin:"5px",
      '& button':{
      background: "#2f3c88",
      color: "white",
      fontWeight: 500,
      marginLeft: "5px",
      verticalAlign: "bottom"
      }
    },
    label:{
      lineHeight: "2rem",
      marginRight: "1rem"
    }
  }));
  export default function UploadForm(props){    
    const { RecorderID,DocType,Date}= props;
    const [file,setFile] = useState([]);
    const classes = useStyles();
    
    const handleFiles=(e)=>{
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
    }
    const URLS=[UPLOAD_RECORDER1_URL,UPLOAD_RECORDER2_URL,UPLOAD_SUMMARY_URL]
    const DocTypes=["一号辅读", "二号辅读", "会议总结"]

    const handleSubmit = () => {
        if (file == undefined) return;
        console.log(file);
        var URL = URLS[DocType];
        var formData = new FormData()
        formData.append('id', RecorderID);
        formData.append('file', file);
        fetch(URL, {
          method: 'PUT',
          headers: new Headers({
            'token': cookie.load("userInfo").token, 
          }),
          body: formData
        }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => { console.log(response); });
      }
   
    return(
        <div>
        <form className={classes.root}>
        <Typography className={classes.label}>请提交 {Date} 日的{DocTypes[DocType]}文件</Typography>
        <Input id="file" type="file" accept=".doc,.docx,.pdf,.xml" required onChange={e=>handleFiles(e)}></Input>
        <Button  variant="outlined" size="small" onClick={handleSubmit} > 上传文件</Button>
         </form>
      </div>
    )
}
