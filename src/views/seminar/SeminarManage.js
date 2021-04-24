import React, { useState, useEffect} from 'react';
import {
  Box,
  Button,
  Card,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Link,
  makeStyles
} from '@material-ui/core';
import {GET_ALL_SEMINAR_URL,GET_ALL_USER_URL,DELETE_SEMINAR_URL} from 'src/settings'
import cookie from 'react-cookies'
import SeminarManageForm from './SeminarManageForm'
import AddLinkForm from './AddLinkForm'
const useStyles = makeStyles((theme) => ({
  root: {},
  actions: {
    justifyContent: 'flex-end' 
  },
  td:{
    maxWidth: "200px"
  },
  header:{
    display: "flex",
    justifyContent: "space-between",
    padding: "16px",
    '& p' :{
      lineHeight:2
    }
  }
}));



const SeminarManage=()=>{
  const classes = useStyles();
  const [seminars,setSeminars] = useState([]);
  const [users,setUsers] = useState([]);
  const [userRoleId,setUserRoleId] = useState();
  const [open, setOpen] = useState(false);
  //向后台调取用户列表并更新界面
  const getAllUser = () => {
      fetch(GET_ALL_USER_URL, {
        method: 'GET', 
        headers: new Headers({
            'token': cookie.load("userInfo").token
        })
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {console.log(response);setUsers(response)});
  }
  const getAllSeminar=()=>{
    fetch(GET_ALL_SEMINAR_URL, {
      method: 'GET', 
      headers: new Headers({
          'token': cookie.load("userInfo").token
      })
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {console.log(response);setSeminars(response)});
  }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        getAllSeminar();
    };
    
    const handleDeleteSeminar = (id) =>{
        fetch(DELETE_SEMINAR_URL+'?id='+id, {
            method: 'GET', 
            headers: new Headers({
                'token': cookie.load("userInfo").token
            })
            }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(() => {getAllSeminar();});
    };
    const NotAuthor = (props)=>{
      const seminar = props.seminar;
      if("link" in seminar) return(<Link href= {seminar.link}>link </Link>);
      else return('暂未上传');
    }
  useEffect(getAllSeminar,[]);
  useEffect(getAllUser,[]);
  useEffect(()=>setUserRoleId(cookie.load("userInfo").roleID),[]);
  return (
    <div>
    <Card className={classes.root} >
      <Box className={classes.header}>
      <Typography
      color="textPrimary"
      size="small"
      >
      演讲安排
      </Typography>
      {(userRoleId===0|| userRoleId===1) &&<Button
      color="primary" 
      size="small"
      variant="outlined"
      onClick={handleOpen}
      >
      添加演讲安排
      </Button>}
      </Box>
      <Divider />
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  时间
                </TableCell>
                <TableCell>
                  主题
                </TableCell>
                <TableCell>
                  主讲人
                </TableCell>
                <TableCell>
                  资源链接
                </TableCell>
                {(userRoleId===0 || userRoleId===1) &&  <TableCell align="center">
                  操作
                </TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {seminars.map((seminar) => (
                <TableRow
                  hover
                  key={seminar.id}
                >
                  <TableCell>
                    {seminar.date}
                  </TableCell>
                  <TableCell className={classes.td}>
                    {seminar.theme}
                  </TableCell>
                  <TableCell>
                    {seminar.speakerName}
                  </TableCell>
                  <TableCell>
                   {cookie.load("userInfo").id===seminar.speakerID?<AddLinkForm SeminarID={seminar.id} link={seminar.link} />:<NotAuthor seminar={seminar}/> }
                  </TableCell>
                  {(userRoleId===0 || userRoleId===1) && 
                  <TableCell align="center">
                  <Button
                    color="primary"
                    size="small"
                    variant="text"
                    onClick={(e)=>handleDeleteSeminar(seminar.id)}
                    >
                        删除
                    </Button>
                  </TableCell>}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
    </Card>
    <SeminarManageForm open={open} onClose={handleClose} classes={classes} users={users}/>
    
   </div>
  );
};



export default SeminarManage;
