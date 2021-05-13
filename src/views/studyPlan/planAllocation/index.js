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
import { postFetch } from "src/base";
import corfirmModal from "src/components/ConfirmModal";
import {
  MNG_GET_ALLOCATION_URL,
  MNG_DELETE_ALLOCATION,
  MNG_GET_USER_LIST,
  MNG_ASSGIN_STUDY,
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
      flex: 1,
    },
  },
  empty: {
    padding: theme.spacing(6),
    textAlign: "center",
  },
  return: {
    marginLeft: theme.spacing(1),
  },
}));
const STATUS_TYPE = {
  0: {
    text: "未分配",
    color: "#ff9d00",
  },
  10: {
    text: "已分配",
    color: "#263238",
  },
  20: {
    text: "已过期",
    color: "#ff0000",
  },
};

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
    fetch(`${MNG_GET_USER_LIST}?planId=${planId}`, {})
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        setUsers(response?.data || []);
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

  const handleDelete = (id, name) => {
    const cor = corfirmModal({
      title: `确定要将[${name}]移出该培养计划吗？`,
      handleCorfirm: () => {
        alert("删除成功");
        cor.close()
        // deleteFetch({
        //   url: `${MNG_DELETE_ALLOCATION}?id=${id}&planId=${planId}`,
        //   values: { id },
        //   successCallback: () => {
        //     setRefresh((prev) => !prev);
        //   },
        // });
      },
    });
  };
  const assignStudy = (userIds) => {
    postFetch({
      url: MNG_ASSGIN_STUDY,
      values: {
        planId,
        userIds,
      },
      successCallback: () => {
        alert("设置成功");
        handleClose();
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
                <TableCell>姓名</TableCell>
                <TableCell>学号</TableCell>
                <TableCell>状态</TableCell>
                <TableCell align="center">任务总数/已完成</TableCell>
                <TableCell align="center">延期未完成/已完成</TableCell>
                <TableCell align="center">超期未完成/已完成</TableCell>
                {hasPermission && <TableCell align="center">操作</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((plan) => (
                <TableRow hover key={plan.id}>
                  <TableCell>{plan.userName}</TableCell>
                  <TableCell>{plan.userStuId}</TableCell>
                  <TableCell>
                    <span
                      style={{ color: STATUS_TYPE[plan?.status || 0]?.color }}
                    >
                      {STATUS_TYPE[plan?.status || 0]?.text}
                    </span>
                  </TableCell>
                  <TableCell align="center">
                    {`${plan?.info.total || 0} / ${plan?.info.finished || 0}`}
                  </TableCell>
                  <TableCell align="center">
                    {`${plan?.info.delayUnfinished || 0} / ${
                      plan?.info.delayFinished || 0
                    }`}
                  </TableCell>
                  <TableCell align="center">
                    <span
                      style={{
                        color:
                          plan?.info.overtimeUnfinished === 1
                            ? "#ff9d00"
                            : plan?.info.overtimeUnfinished > 1
                            ? "#ff0000"
                            : "",
                      }}
                    >
                      {plan?.info.overtimeUnfinished || 0}
                    </span>
                    {` / ${plan?.info.overtimeFinished || 0}`}
                  </TableCell>
                  <TableCell align="center">
                    {plan?.status !== 10 && (
                      <Button
                        color="primary"
                        size="small"
                        variant="text"
                        onClick={() => assignStudy([plan.userId])}
                      >
                        {plan?.status === 20 ? "重新分配" : "分配任务"}
                      </Button>
                    )}
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
                      onClick={(e) => handleDelete(plan.id, plan.userName)}
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
          assignStudy={assignStudy}
        />
      )}
      {userId > 0 && (
        <Process
          open={openProcess}
          onClose={() => setOpenProcess(false)}
          planId={planId}
          userId={userId}
          refresh={() => setRefresh((prev) => !prev)}
        />
      )}
    </div>
  );
};

export default PlanAllocationView;
