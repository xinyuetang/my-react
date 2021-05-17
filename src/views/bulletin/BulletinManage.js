import React, { useState, useEffect } from "react";
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
import Pagination from "@material-ui/lab/Pagination";
import Loading from "src/components/Loading";
import NoData from "src/components/NoData";
import {
  MNG_GET_ALL_BULLETIN_URL,
  MNG_DELETE_BULLETIN_URL,
} from "src/settings";
import { deleteFetch } from "src/base";
import corfirmModal from "src/components/ConfirmModal";
import BulletinManageForm from "./BulletinManageForm";
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

const BulletinManage = () => {
  const classes = useStyles();
  const [refresh, setRefresh] = useState(false);
  const [bulletins, setBulletins] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageNo, setPageNo] = useState(0);
  const getAllBulletin = () => {
    fetch(`${MNG_GET_ALL_BULLETIN_URL}?limit=10&offset=${(page - 1) * 10}`, {})
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        setBulletins(response?.data || []);
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

  const handleDeleteBulletin = (id, name) => {
    const cor = corfirmModal({
      title: `确定要删除吗${name}？`,
      handleCorfirm: () => {
        cor.close();
        deleteFetch({
          url: `${MNG_DELETE_BULLETIN_URL}?id=${id}`,
          values: { id },
          successCallback: () => {
            setRefresh((prev) => !prev);
          },
        });
      },
    });
  };
  useEffect(getAllBulletin, [refresh, page]);
  return (
    <div>
      <Card className={classes.root}>
        <Box className={classes.header}>
          <Typography color="textPrimary" size="small" component="h2">
            通知记录
          </Typography>
          <Button
            color="primary"
            size="small"
            variant="outlined"
            onClick={handleOpen}
          >
            添加新通知
          </Button>
        </Box>
        <Divider />
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>发送时间</TableCell>
                <TableCell>标题</TableCell>
                <TableCell>内容</TableCell>
                <TableCell align="center">操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bulletins.map((bulletin) => (
                <TableRow hover key={bulletin.id}>
                  <TableCell>{bulletin.createTime}</TableCell>
                  <TableCell>{bulletin.title}</TableCell>
                  <TableCell>{bulletin.content}</TableCell>
                  <TableCell align="center">
                    <Button
                      color="primary"
                      size="small"
                      variant="text"
                      onClick={(e) =>
                        handleDeleteBulletin(bulletin.id, bulletin.title)
                      }
                    >
                      删除
                    </Button>
                  </TableCell>
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
        {!loading && bulletins?.length === 0 && <NoData msg="暂未添加演讲" />}
      </Card>
      <BulletinManageForm
        open={open}
        onClose={handleClose}
      />
    </div>
  );
};

export default BulletinManage;
