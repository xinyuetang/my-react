import React, { useState, useEffect, useContext } from "react";
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
  Typography,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import corfirmModal from "src/components/ConfirmModal";
import { RoleName, DELETE_USER_URL } from "src/settings";
import { getAllUser } from "src/service/userService";
import { UserContext } from "src/layouts/Context";
import { deleteFetch } from "src/base";
import UserManageForm from "./UserManageForm";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "16px",
    "& p": {
      lineHeight: 2,
    },
  },
  Pagination: {
    padding: theme.spacing(2),
    '& .MuiPagination-ul': {
      justifyContent: 'center',
    }
  },
}));

const UserManage = (props) => {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { userInfo } = useContext(UserContext);
  const [page, setPage] = useState(1);
  const [pageNo, setPageNo] = useState(0);

  //向后台调取用户列表并更新界面
  // const getAllUser = () => {
  //     return fetch(GET_ALL_USER_URL, {
  //         method: 'GET',
  //         // headers: new Headers({
  //         //     'token': cookie.load("userInfo").token
  //         // })
  //         }).then(res => res.json())
  //         .catch(error => console.error('Error:', error))
  //         // .then(response => {console.log(response);setUsers(response)});
  //   }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRefresh(prev => !prev);
  };

  const handleDeleteUser = (id, name) => {
    const cor = corfirmModal({
      title: `确定要将[${name}]移出该培养计划吗？`,
      handleCorfirm: () => {
        cor.close();
        deleteFetch({
          url: `${DELETE_USER_URL}?id=${id}`,
          values: { id },
          successCallback: () => {
            setRefresh((prev) => !prev);
          },
        });
      },
    });
  };

  // useEffect(getAllUser,[]);
  useEffect(() => {
    getAllUser({ page }).then((res) => {
      setUsers(res.data || []);
      setPageNo(Math.ceil(res?.paging?.total / 10) || 0);
    });
  }, [refresh, page]);
  return (
    <div>
      <Card>
        <Box className={classes.header}>
          <Typography color="textPrimary" size="small">
            用户管理
          </Typography>
          {userInfo.roleId === 10 && (
            <Button
              color="primary"
              size="small"
              variant="outlined"
              onClick={handleOpen}
            >
              添加新用户
            </Button>
          )}
        </Box>
        <Divider />
        {/* <PerfectScrollbar> */}
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>姓名</TableCell>
                <TableCell>学/工号</TableCell>
                <TableCell>角色</TableCell>
                {userInfo.roleId === 10 && (
                  <TableCell align="center">操作</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow hover key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.stuId}</TableCell>
                  <TableCell>{RoleName[user.roleId]}</TableCell>
                  {userInfo.roleId === 10 && (
                    <TableCell align="center">
                      <Button
                        color="primary"
                        size="small"
                        variant="text"
                        href={`/app/updateUserInfo/${user.stuId}`}
                      >
                        编辑
                      </Button>
                      <Button
                        color="primary"
                        size="small"
                        variant="text"
                        onClick={(e) => handleDeleteUser(user.id, user.name)}
                      >
                        删除
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {pageNo > 1 && (
            <Pagination
              className={classes.Pagination}
              count={pageNo}
              color="primary"
              onChange={(e, i) => setPage(i)}
            />
          )}
        </Box>
        {/* </PerfectScrollbar> */}
      </Card>
      <UserManageForm open={open} onClose={handleClose} />
    </div>
  );
};

export default UserManage;
