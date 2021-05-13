import React, { useState, useEffect, useContext } from "react";
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
  makeStyles,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import Loading from "src/components/Loading";
import NoData from "src/components/NoData";
import { UserContext } from "src/layouts/Context";
import { getAllUser } from "src/service/userService";
import { GET_ALL_SEMINAR_URL, DELETE_SEMINAR_URL } from "src/settings";
import { deleteFetch } from "src/base";
import corfirmModal from "src/components/ConfirmModal";
import SeminarManageForm from "./SeminarManageForm";
import AddLinkForm from "./AddLinkForm";
const useStyles = makeStyles((theme) => ({
  root: {},
  actions: {
    justifyContent: "flex-end",
  },
  td: {
    maxWidth: "200px",
  },
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
    "& .MuiPagination-ul": {
      justifyContent: "center",
    },
  },
}));

const SeminarManage = () => {
  const classes = useStyles();
  const [refresh, setRefresh] = useState(false);
  const [seminars, setSeminars] = useState([]);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const { userInfo } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageNo, setPageNo] = useState(0);
  //向后台调取用户列表并更新界面
  useEffect(() => {
    getAllUser({page: 1, limit: 1999}).then((res) => {
      setUsers(res?.data || []);
    });
  }, []);
  const getAllSeminar = () => {
    fetch(`${GET_ALL_SEMINAR_URL}?limit=10&offset=${(page - 1) * 10}`, {})
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        setSeminars(response?.data || []);
        setPageNo(Math.ceil(response?.paging?.total / 10) || 0);
      })
      .finally(() => setLoading(false));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRefresh((prev) => !prev);
  };

  const handleDeleteSeminar = (id) => {
    const cor = corfirmModal({
      title: "确定要删除吗？",
      handleCorfirm: () => {
        cor.close();
        deleteFetch({
          url: `${DELETE_SEMINAR_URL}?id=${id}`,
          values: { id },
          successCallback: () => {
            setRefresh((prev) => !prev);
          },
        });
      },
    });
  };
  const NotAuthor = (props) => {
    const { seminar } = props;
    if (seminar.link) return (
      <Link href={seminar.link} title={seminar.link}>
        去查看
      </Link>
    );
    else return "暂未上传";
  };
  useEffect(getAllSeminar, [refresh, page]);
  const hasPermission = userInfo.roleId === 10 || userInfo.roleId === 20;
  return (
    <div>
      <Card className={classes.root}>
        <Box className={classes.header}>
          <Typography color="textPrimary" size="small" component="h2">
            演讲安排
          </Typography>
          {hasPermission && (
            <Button
              color="primary"
              size="small"
              variant="outlined"
              onClick={handleOpen}
            >
              添加演讲安排
            </Button>
          )}
        </Box>
        <Divider />
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>时间</TableCell>
                <TableCell>主题</TableCell>
                <TableCell>主讲人</TableCell>
                <TableCell>资源链接</TableCell>
                {hasPermission && <TableCell align="center">操作</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {seminars.map((seminar) => (
                <TableRow hover key={seminar.id}>
                  <TableCell>{seminar.date}</TableCell>
                  <TableCell className={classes.td}>{seminar.theme}</TableCell>
                  <TableCell>{seminar.speakerName}</TableCell>
                  <TableCell>
                    {userInfo.userId === seminar.speakerId ? (
                      <AddLinkForm seminar={seminar} />
                    ) : (
                      <NotAuthor seminar={seminar} />
                    )}
                  </TableCell>
                  {hasPermission && (
                    <TableCell align="center">
                      <Button
                        color="primary"
                        size="small"
                        variant="text"
                        onClick={(e) => handleDeleteSeminar(seminar.id)}
                      >
                        删除
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        {pageNo > 1 && (
          <Pagination
            className={classes.Pagination}
            count={pageNo}
            color="primary"
            onChange={(e, i) => setPage(i)}
          />
        )}
        {loading && <Loading />}
        {!loading && seminars?.length === 0 && (
          <NoData msg="暂未添加演讲" />
        )}
      </Card>
      <SeminarManageForm
        open={open}
        onClose={handleClose}
        classes={classes}
        users={users}
      />
    </div>
  );
};

export default SeminarManage;
