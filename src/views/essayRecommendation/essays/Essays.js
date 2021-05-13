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
import Pagination from "@material-ui/lab/Pagination";
import Loading from "src/components/Loading";
import NoData from "src/components/NoData";
import { GET_ALL_ARTICLE_URL, DELETE_ARTICLE_URL } from "src/settings";
import { deleteFetch } from "src/base";
import corfirmModal from "src/components/ConfirmModal";
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

const Essays = () => {
  const classes = useStyles();
  const [refresh, setRefresh] = useState(false);
  const [essays, setEssays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageNo, setPageNo] = useState(0);
  const { userInfo } = useContext(UserContext);

  const getAllEssays = () => {
    fetch(`${GET_ALL_ARTICLE_URL}?limit=10&offset=${(page - 1) * 10}`, {})
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        setEssays(response?.data || []);
        setPageNo(Math.ceil(response?.paging?.total / 10) || 0);
      })
      .finally(() => setLoading(false));
  };

  const handleDeleteEssays = (id, name) => {
    const cor = corfirmModal({
      title: `确定要删除[${name}]吗？`,
      handleCorfirm: () => {
        cor.close();
        deleteFetch({
          url: `${DELETE_ARTICLE_URL}?id=${id}`,
          values: { id },
          successCallback: () => {
            setRefresh((prev) => !prev);
          },
        });
      },
    });
  };
  useEffect(getAllEssays, [refresh, page]);
  const hasPermission = userInfo.roleId === 10 || userInfo.roleId === 40;
  return (
    <div>
      <Card className={classes.root}>
        <Box className={classes.header}>
          <Typography color="textPrimary" size="small">
            论文列表
          </Typography>
          {hasPermission && (
            <Button
              color="primary"
              size="small"
              variant="outlined"
              href="/app/articleEdit/0"
            >
              添加论文
            </Button>
          )}
        </Box>
        <Divider />
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>分类</TableCell>
                <TableCell>论文名称</TableCell>
                <TableCell align="center">操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {essays.map((essayClass) => (
                <TableRow hover key={essayClass.id}>
                  <TableCell>{essayClass.categoryName}</TableCell>
                  <TableCell>{essayClass.title}</TableCell>
                  <TableCell align="center">
                    <Button
                      color="primary"
                      size="small"
                      variant="text"
                      href={`/app/articleEdit/${essayClass.id}`}
                    >
                      {hasPermission ? "编辑" : "查看"}
                    </Button>
                    {hasPermission && (
                      <Button
                        color="primary"
                        size="small"
                        variant="text"
                        onClick={(e) =>
                          handleDeleteEssays(essayClass.id, essayClass.title)
                        }
                      >
                        删除
                      </Button>
                    )}
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
        {!loading && essays?.length === 0 && <NoData msg="暂未添加论文" />}
      </Card>
    </div>
  );
};

export default Essays;
