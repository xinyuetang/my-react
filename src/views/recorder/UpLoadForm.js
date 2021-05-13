import React,{useState} from 'react';
import cookie from 'react-cookies'
import {
  Button,
  makeStyles,
  Input,
  Typography,
} from '@material-ui/core';
import { formDataFetch } from "src/base";
import alertBox from "src/components/AlertBox";
import { UPLOAD_RECORDER_URL } from "src/settings";

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
    const { RecorderId, DocType, Date, refresh } = props;
    const [file,setFile] = useState([]);
    const [uploading, setUploading] = useState(false)
    const classes = useStyles();
    
    const handleFiles=(e)=>{
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
    }
    const DocTypes=["一号辅读", "二号辅读", "会议总结"]
    const FileKeys = [
      "recorder1Content",
      "recorder2Content",
      "summarizerContent",
    ];

    const handleSubmit = () => {
      if (file == undefined || uploading) return;
      setUploading(true);
      formDataFetch({
        url: UPLOAD_RECORDER_URL,
        values: {
          id: RecorderId,
          [FileKeys[DocType]]: file,
        },
        successCallback: () => {
          alertBox({ text: "上传成功", severity: "success" });
          setUploading(false);
          refresh();
        },
        errorCallback: () => setUploading(false),
      });
      // var formData = new FormData();
      // formData.append("id", RecorderId);
      // formData.append(FileKeys[DocType], file);
      // fetch(UPLOAD_RECORDER_URL, {
      //   method: "POST",
      //   body: formData,
      // });
      // fetch(UPLOAD_RECORDER_URL, {
      //   method: "POST",
      //   body: formData,
      // })
      // .then((res) => res.json())
      // .catch((error) => console.error("Error:", error))
      // .then((response) => {
      //   console.log(response);
      // });
    }
   
    return (
      <div>
        <form className={classes.root}>
          <Typography className={classes.label}>
            请提交 {Date} 日的{DocTypes[DocType]}文件
          </Typography>
          <Input
            id="file"
            type="file"
            accept=".doc,.docx,.pdf,.xml"
            required
            onChange={(e) => handleFiles(e)}
          ></Input>
          <Button variant="outlined" size="small" onClick={handleSubmit}>
            {" "}
            {uploading ? "上传中···" : "上传文件"}
          </Button>
        </form>
      </div>
    );
}
