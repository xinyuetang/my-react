import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
  Typography
} from '@material-ui/core';
import ReactDOM from 'react-dom';
import RecorderManageForm from './RecorderManageForm';
import { GET_ALL_RECORDER_URL, GET_ALL_USER_URL, DELETE_RECORDER_URL, DOWNLOAD_RECORDER1_URL,DOWNLOAD_RECORDER2_URL,DOWNLOAD_SUMMARY_URL } from 'src/settings';
import cookie from 'react-cookies';
import UploadForm from './UpLoadForm';

const useStyles = makeStyles((theme) => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  },
  td: {
    maxWidth: "100px"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "16px",
    '& p': {
      lineHeight: 2
    }
  },
  todos: {
    background: "#3f51b554",
    padding: "1rem",
    marginBottom:"5px"
  }
}));

const RecorderManage = () => {
  const classes = useStyles();
  const [recorders, setRecorders] = useState([]);
  const [users, setUsers] = useState([]);
  const [userRoleId,setUserRoleId] = useState();
  const [open, setOpen] = useState(false);
  //向后台调取用户列表并更新界面
  const getAllUser = () => {
    fetch(GET_ALL_USER_URL, {
      method: 'GET',
      // headers: new Headers({
      //   'token': cookie.load("userInfo").token
      // })
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => { console.log(response); setUsers(response) });
  }

  const getAllRecorder = () => {
    fetch(GET_ALL_RECORDER_URL, {
      method: 'GET',
      headers: new Headers({
        'token': cookie.load("userInfo").token
      })
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        console.log(response);
        setRecorders(response);
        response.map((recorder) => {
          if (!recorder.recorder1 && cookie.load("userInfo").id === recorder.recorder1ID) {
            const element = document.createElement('div');
            element.id="id1_"+recorder.id
            document.getElementById("todos").appendChild(element);
            ReactDOM.render(<UploadForm DocType={0} Date={recorder.date} RecorderID={recorder.id}></UploadForm>, document.getElementById("id1_"+recorder.id))
           
          }
          if (!recorder.recorder2 && cookie.load("userInfo").id === recorder.recorder2ID) {
            const element = document.createElement('div');
            element.id="id2_"+recorder.id
            document.getElementById("todos").appendChild(element);
            ReactDOM.render(<UploadForm DocType={1} Date={recorder.date} RecorderID={recorder.id}></UploadForm>, document.getElementById("id2_"+recorder.id))
           
          }
          if (!recorder.summary && cookie.load("userInfo").id === recorder.summaryerID) {
            const element = document.createElement('div');
            element.id="id3_"+recorder.id
            document.getElementById("todos").appendChild(element);
            ReactDOM.render(<UploadForm DocType={2} Date={recorder.date} RecorderID={recorder.id}></UploadForm>, document.getElementById("id3_"+recorder.id))
           
          }      
          return null;
        });

      })
  }
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    getAllRecorder();
  };
  const handleDeleteRecorder = (id) => {
    fetch(DELETE_RECORDER_URL + '?id=' + id, {
      method: 'GET',
      headers: new Headers({
        'token': cookie.load("userInfo").token
      }),
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => { console.log(response); getAllRecorder(); });
  }
  /* 下载文件的公共方法，参数就传blob文件流*/
  const handleExport = (data, fileName) => {
    // 动态创建iframe下载文件
    if (!data) {
      return;
    }

    let blob = new Blob([data], { type: "application/octet-stream" });
    if ("download" in document.createElement("a")) {
      // 不是IE浏览器
      let url = window.URL.createObjectURL(blob);
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // 下载完成移除元素
      window.URL.revokeObjectURL(url); // 释放掉blob对象
    } else {
      // IE 10+
      window.navigator.msSaveBlob(blob, fileName);
    }
  }


  const handleDownload = (URL, id, fileName) => {
    fetch(URL + '?id=' + id, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then((response) => {
      response.blob().then(blob => {
        handleExport(blob, fileName);
      });
    }
    )
  }
  useEffect(getAllRecorder, []);
  useEffect(getAllUser, []);
  useEffect(()=>setUserRoleId(cookie.load("userInfo").roleID),[]);
  return (
    <div>

      <div id="todos" className={classes.todos}></div>
      
      <Card className={classes.root}>

        <Box className={classes.header}>
          <Typography
            color="textPrimary"
            size="small"
          >
            辅读安排
      </Typography>
      {(userRoleId===0|| userRoleId===1) &&<Button
            color="primary"
            size="small"
            variant="outlined"
            onClick={handleOpen}
          >
            添加辅读安排
      </Button>}
        </Box>
        <Divider />
        {/* <PerfectScrollbar> */}
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  时间
                </TableCell>
                <TableCell align="center">
                  辅读人1
                </TableCell>
                <TableCell align="center">
                  辅读人2
                </TableCell>
                <TableCell align="center">
                  记录员
                </TableCell>
                {(userRoleId===0|| userRoleId===1) &&<TableCell align="center">
                  操作
                </TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {recorders.map((recorder) => (
                <TableRow
                  hover
                  key={recorder.id}
                >
                  <TableCell align="center">
                    {recorder.date}
                  </TableCell>
                  <TableCell align="center">
                    {recorder.recorder1Name}
                    <Box>
                      {recorder.recorder1?<Button color="primary" size="small" onClick={e=>handleDownload(DOWNLOAD_RECORDER1_URL,recorder.id, recorder.recorder1,e)}> 下载</Button>:"暂未上传"}
                  </Box>

                  </TableCell >
                  <TableCell align="center">
                    {recorder.recorder2Name}
                    <Box>{recorder.recorder2?<Button color="primary" size="small" onClick={e=>handleDownload(DOWNLOAD_RECORDER2_URL,recorder.id, recorder.recorder2,e)}> 下载</Button>:"暂未上传"}</Box>
                  </TableCell>
                  <TableCell align="center">
                    {recorder.summaryerName}
                    <Box>{recorder.summary?<Button color="primary" size="small" onClick={e=>handleDownload(DOWNLOAD_SUMMARY_URL,recorder.id, recorder.summary,e)}> 下载</Button>:"暂未上传"}</Box>
                  </TableCell>
                  {(userRoleId===0|| userRoleId===1) &&<TableCell align="center">
                    <Button
                      color="primary"
                      size="small"
                      variant="text"
                      onClick={e => handleDeleteRecorder(recorder.id, e)}
                    >
                      删除
                    </Button>
                  </TableCell>}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        {/* </PerfectScrollbar> */}
      </Card>
      <RecorderManageForm users={users} open={open} onClose={handleClose}></RecorderManageForm>
    </div>
  );
};



export default RecorderManage;
