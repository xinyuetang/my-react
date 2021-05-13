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
  makeStyles,
} from "@material-ui/core";
import { UserContext } from "src/layouts/Context";
import {
  GET_ALL_CLASS_URL,
  DELETE_CLASS_URL,
} from "src/settings";
import Pagination from "@material-ui/lab/Pagination";
import Loading from "src/components/Loading";
import NoData from "src/components/NoData";
import { deleteFetch } from "src/base";
import corfirmModal from "src/components/ConfirmModal";
import NewClassForm from "./NewClassForm";
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

const EssayClasses = () => {
  const classes = useStyles();
  const [refresh, setRefresh] = useState(false);
  const [essayClasses, setEssayClasses] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageNo, setPageNo] = useState(0);
  const { userInfo } = useContext(UserContext);
  const getAllEssayClasses = () => {
    fetch(`${GET_ALL_CLASS_URL}?limit=10&offset=${(page - 1) * 10}`, {})
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        setEssayClasses(response?.data || []);
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

  const handleDeleteEssayClasses = (id, name) => {
    const cor = corfirmModal({
      title: `确定要删除[${name}]吗？`,
      handleCorfirm: () => {
        cor.close();
        deleteFetch({
          url: `${DELETE_CLASS_URL}?id=${id}`,
          values: { id },
          successCallback: () => {
            setRefresh((prev) => !prev);
          },
        });
      },
    });
  };
  useEffect(getAllEssayClasses, [refresh, page]);
  const hasPermission = userInfo.roleId === 10 || userInfo.roleId === 40;
  return (
    <div>
      <Card className={classes.root}>
        <Box className={classes.header}>
          <Typography color="textPrimary" size="small">
            论文分类
          </Typography>
          {hasPermission && (
            <Button
              color="primary"
              size="small"
              variant="outlined"
              onClick={handleOpen}
            >
              添加论文分类
            </Button>
          )}
        </Box>
        <Divider />
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>编号</TableCell>
                <TableCell>名称</TableCell>
                {hasPermission && <TableCell align="center">操作</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {essayClasses.map((essayClass) => (
                <TableRow hover key={essayClass.id}>
                  <TableCell>{essayClass.id}</TableCell>
                  <TableCell>{essayClass.name}</TableCell>
                  {hasPermission && (
                    <TableCell align="center">
                      <Button
                        color="primary"
                        size="small"
                        variant="text"
                        onClick={(e) =>
                          handleDeleteEssayClasses(
                            essayClass.id,
                            essayClass.name
                          )
                        }
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
        {!loading && essayClasses?.length === 0 && (
          <NoData msg="暂未添加论文分类" />
        )}
      </Card>
      <NewClassForm open={open} onClose={handleClose} tag={0} />
    </div>
  );
};

export default EssayClasses;
