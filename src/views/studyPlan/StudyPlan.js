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
import { GET_ALL_PLAN_URL, DELETE_PLAN_URL } from "src/settings";
import { deleteFetch } from "src/base";
// import NewClassForm from "./NewClassForm";
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

const StudyPlan = () => {
  const classes = useStyles();
  const [refresh, setRefresh] = useState(false);
  const [plans, setPlans] = useState([]);
  const [open, setOpen] = useState(false);
  const { userInfo } = useContext(UserContext);
  const getPlans = () => {
    fetch(GET_ALL_PLAN_URL, {})
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        setPlans(response?.data || []);
      });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRefresh((prev) => !prev);
  };

  const handlePlan = (id) => {
    deleteFetch({
      url: `${DELETE_PLAN_URL}?id=${id}`,
      values: { id },
      successCallback: () => {
        setRefresh((prev) => !prev);
      },
    });
  };
  useEffect(getPlans, [refresh]);
  const hasPermission = userInfo.roleId === 10 || userInfo.roleId === 50;
  return (
    <div>
      <Card className={classes.root}>
        <Box className={classes.header}>
          <Typography color="textPrimary" size="small">
            培养计划
          </Typography>
          {hasPermission && (
            <Button
              color="primary"
              size="small"
              variant="outlined"
              onClick={handleOpen}
            >
              添加培养计划
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
              {plans.map((plan) => (
                <TableRow hover key={plan.id}>
                  <TableCell>{plan.id}</TableCell>
                  <TableCell>{plan.name}</TableCell>
                  {hasPermission && (
                    <TableCell align="center">
                      <Button
                        color="primary"
                        size="small"
                        variant="text"
                        onClick={(e) => handlePlan(plan.id)}
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
      </Card>
      {/* <NewClassForm open={open} onClose={handleClose} tag={0} /> */}
    </div>
  );
};

export default StudyPlan;
