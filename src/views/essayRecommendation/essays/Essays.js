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
import { GET_ALL_ARTICLE_URL, DELETE_CLASS_URL } from "src/settings";
import { deleteFetch } from "src/base";
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
}));

const Essays = () => {
  const classes = useStyles();
  const [refresh, setRefresh] = useState(false);
  const [essays, setEssays] = useState([]);
  const { userInfo } = useContext(UserContext);

  const getAllEssays = () => {
    fetch(GET_ALL_ARTICLE_URL, {})
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        setEssays(response?.data || []);
      });
  };

  const handleDeleteEssays = (id) => {
    deleteFetch({
      url: `${DELETE_CLASS_URL}?id=${id}`,
      values: { id },
      successCallback: () => {
        setRefresh((prev) => !prev);
      },
    });
  };
  useEffect(getAllEssays, [refresh]);
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
                        onClick={(e) => handleDeleteEssays(essayClass.id)}
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
      </Card>
    </div>
  );
};

export default Essays;
