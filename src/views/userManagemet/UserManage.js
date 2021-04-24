import React, { useState,useEffect } from 'react';
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

import cookie from 'react-cookies';
import {RoleName,GET_ALL_USER_URL,DELETE_USER_URL} from 'src/settings'
import UserManageForm from './UserManageForm';

const useStyles = makeStyles((theme)=> ({
  header:{
    display: "flex",
    justifyContent: "space-between",
    padding: "16px",
    '& p' :{
      lineHeight:2
    }
  }
}));

function UserManage(){
    const [users, setUsers] = useState([]);
    const [userRoleId,setUserRoleId] = useState();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    //向后台调取用户列表并更新界面
    const getAllUser = () => {
        return fetch(GET_ALL_USER_URL, {
            method: 'GET', 
            headers: new Headers({
                'token': cookie.load("userInfo").token
            })
            }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {console.log(response);setUsers(response)});
      }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () =>{
        setOpen(false);
        getAllUser();
    };

    const handleDeleteUser = (id) =>{
        fetch(DELETE_USER_URL+'?id='+id, {
            method: 'GET', 
            headers: new Headers({
                'token': cookie.load("userInfo").token
            })
            }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {console.log(response);getAllUser();});
    };
    
    
    useEffect(getAllUser,[]);
    useEffect(()=>setUserRoleId(cookie.load("userInfo").roleID),[]);
    return (
    <div>
    <Card>
    <Box className={classes.header}>
      <Typography
      color="textPrimary"
      size="small"
      >
      用户管理
      </Typography>
      {userRoleId===0 &&<Button
      color="primary" 
      size="small"
      variant="outlined"
      onClick={handleOpen}
      >
          添加新用户
      </Button>}
      </Box>
      <Divider />
      {/* <PerfectScrollbar> */}
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  姓名
                </TableCell>
                <TableCell>
                  学/工号
                </TableCell>
                <TableCell>
                  角色
                </TableCell>
                {userRoleId===0 &&<TableCell align="center">
                  操作
                </TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  hover
                  key={user.id}
                >
                  <TableCell>
                    {user.name}
                  </TableCell>
                  <TableCell>
                    {user.studentID}
                  </TableCell>
                  <TableCell>
                    {RoleName[user.roleID]}
                  </TableCell>
                  {userRoleId===0 && <TableCell align="center">
                    <Button
                    color="primary"
                    size="small"
                    variant="text"
                    onClick={(e) => handleDeleteUser(user.id,e)}
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
   <UserManageForm open={open} onClose={handleClose} />
   </div>
  );
}

export default UserManage;
