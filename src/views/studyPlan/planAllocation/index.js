import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
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
  makeStyles,
} from "@material-ui/core";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import { UserContext } from "src/layouts/Context";
import {
  MNG_GET_ALLOCATION_URL,
  MNG_DELETE_ALLOCATION,
  MNG_EDIT_ALLOCATION,
} from "src/settings";
import { getAllUser } from "src/service/userService";
import { deleteFetch } from "src/base";
import AssignUser from "../components/AssignUser";
import Process from "../components/Process";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  actions: {
    justifyContent: "flex-end",
  },
  td: {
    maxWidth: "200px",
  },
  header: {
    display: "flex",
    padding: "16px",
    "& p": {
      lineHeight: 2,
    },
    "& .MuiTypography-root": {
      flex: 1
    }
  },
  empty: {
    padding: theme.spacing(6),
    textAlign: "center",
  },
}));

const PlanAllocationView = () => {
  const classes = useStyles();
  const { planId } = useParams();
  const history = useHistory();
  const [refresh, setRefresh] = useState(false);
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState();
  const [open, setOpen] = useState(false);
  const [openProcess, setOpenProcess] = useState(false);
  const { userInfo } = useContext(UserContext);
  useEffect(() => {
    getAllUser().then((res) => {
      setUsers(res.data || []);
    });
  }, []);
  const getList = () => {
    fetch(`${MNG_GET_ALLOCATION_URL}?id=${planId}`, {})
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        setList(response?.data || []);
      });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRefresh((prev) => !prev);
  };

  const handleDelete = (id) => {
    deleteFetch({
      url: `${MNG_DELETE_ALLOCATION}?id=${id}&planId=${planId}`,
      values: { id },
      successCallback: () => {
        setRefresh((prev) => !prev);
      },
    });
  };
  useEffect(getList, [refresh]);
  const hasPermission = userInfo.roleId === 10 || userInfo.roleId === 50;
  return (
    <div className={classes.root}>
      <Card>
        <Box className={classes.header}>
          <Typography color="textPrimary" size="small">
            培养计划分配
          </Typography>
          <Button
            color="primary"
            size="small"
            variant="outlined"
            onClick={handleOpen}
          >
            分配学员
          </Button>
          <Button
            className={classes.return}
            size="small"
            variant="outlined"
            endIcon={<KeyboardReturnIcon />}
            onClick={history.goBack}
          >
            返回
          </Button>
        </Box>
        <Divider />
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>编号</TableCell>
                <TableCell>姓名</TableCell>
                <TableCell>学号</TableCell>
                {hasPermission && <TableCell align="center">操作</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((plan) => (
                <TableRow hover key={plan.id}>
                  <TableCell>{plan.id}</TableCell>
                  <TableCell>{plan.userName}</TableCell>
                  <TableCell>{plan.userStuId}</TableCell>
                  <TableCell align="center">
                    <Button
                      color="primary"
                      size="small"
                      variant="text"
                      onClick={() => {
                        setUserId(plan.userId);
                        setOpenProcess(true);
                      }}
                    >
                      完成进度
                    </Button>
                    <Button
                      color="primary"
                      size="small"
                      variant="text"
                      onClick={(e) => handleDelete(plan.id)}
                    >
                      删除
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {list?.length === 0 && (
            <Card className={classes.empty}>暂未分配学员</Card>
          )}
        </Box>
      </Card>
      {users?.length > 0 && (
        <AssignUser
          open={open}
          onClose={handleClose}
          users={users}
          planId={planId}
        />
      )}
      {userId > 0 && (
        <Process
          open={openProcess}
          onClose={() => setOpenProcess(false)}
          planId={planId}
          userId={userId}
        />
      )}
    </div>
  );
};

export default PlanAllocationView;
