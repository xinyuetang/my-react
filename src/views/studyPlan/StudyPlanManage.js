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
  MNG_GET_ALL_PLAN_URL,
  MNG_DELETE_PLAN_URL,
  U_GET_ALL_PLAN_URL,
} from "src/settings";
import { deleteFetch } from "src/base";
import corfirmModal from "src/components/ConfirmModal";
import EditStudyPlan from "./components/EditStudyPlan";
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

const StudyPlanManage = () => {
  const classes = useStyles();
  const [refresh, setRefresh] = useState(false);
  const [plans, setPlans] = useState([]);
  const [planDetail, setPlanDetail] = useState({});
  const [open, setOpen] = useState(false);
  const { userInfo } = useContext(UserContext);
  const hasPermission = userInfo.roleId === 10 || userInfo.roleId === 50;
  const getPlans = () => {
    fetch(hasPermission ? MNG_GET_ALL_PLAN_URL : U_GET_ALL_PLAN_URL, {})
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
    setPlanDetail({});
    setRefresh((prev) => !prev);
  };

  const handlePlan = (id, name) => {
    const cor = corfirmModal({
      title: `确定要删除[${name}]吗？`,
      handleCorfirm: () => {
        cor.close();
        deleteFetch({
          url: `${MNG_DELETE_PLAN_URL}?id=${id}`,
          values: { id },
          successCallback: () => {
            setRefresh((prev) => !prev);
          },
        });
      },
    });
  };
  useEffect(getPlans, [refresh]);
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
                <TableCell>入学年份</TableCell>
                <TableCell align="center">操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {plans.map((plan) => (
                <TableRow hover key={plan.id}>
                  <TableCell>{hasPermission ? plan.id : plan.planId}</TableCell>
                  <TableCell>{plan.name}</TableCell>
                  <TableCell>{plan.enrollYear}</TableCell>
                  <TableCell align="center">
                    <Button
                      color="primary"
                      size="small"
                      variant="text"
                      href={`/app/studyPlan/detail/${
                        hasPermission ? plan.id : plan.planId
                      }`}
                    >
                      查看详情
                    </Button>
                    {hasPermission && (
                      <>
                        <Button
                          color="primary"
                          size="small"
                          variant="text"
                          onClick={(e) => {
                            setPlanDetail(plan);
                            handleOpen();
                          }}
                        >
                          编辑
                        </Button>
                        <Button
                          color="primary"
                          size="small"
                          variant="text"
                          href={`/app/studyPlan/planAllocation/${plan.id}`}
                        >
                          任务分配
                        </Button>
                        <Button
                          color="primary"
                          size="small"
                          variant="text"
                          onClick={(e) => handlePlan(plan.id, plan.name)}
                        >
                          删除
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Card>
      <EditStudyPlan
        open={open}
        onClose={handleClose}
        planDetail={planDetail}
      />
    </div>
  );
};

export default StudyPlanManage;
