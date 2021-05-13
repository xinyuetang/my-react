import React, { useState } from "react";
import {
  Button,
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  Divider,
  makeStyles,
  IconButton,
  Typography,
  Card,
} from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { MNG_DELETE_WORK_URL, U_EDIT_ALLOCATION } from "src/settings";
import { deleteFetch, postFetch } from "src/base";
import corfirmModal from "src/components/ConfirmModal";
import alertBox from "src/components/AlertBox";
import EditWork from "./EditWork";
const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
  },
  header: {
    display: "flex",
    alignItems: "center",
    paddingBottom: theme.spacing(2),
    "& .MuiTextField-root": {
      width: "150px",
    },
    "& .MuiButton-root": {
      width: "150px",
      height: "40px",
    },
  },
  empty: {
    paddingTop: theme.spacing(1),
    textAlign: 'center'
  },
}));
const WORK_TYPE = {
  100: "公共任务",
  200: "科硕任务",
  310: "学术型任务",
  320: "结合型任务",
  330: "技术型任务",
};
export default function WorkTable(props) {
  const { works, refresh, workType, planStageId, hasPermission } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [workDetail, setWorkDetail] = useState({});
  const deleteWork = (id, name) => {
    const cor = corfirmModal({
      title: `确定要删除[${name}]吗？`,
      handleCorfirm: () => {
        cor.close();
        deleteFetch({
          url: `${MNG_DELETE_WORK_URL}?id=${id}`,
          successCallback: refresh,
        });
      },
    });
  };
  const handleUpdate = (id, finished) => {
    postFetch({
      url: U_EDIT_ALLOCATION,
      values: {
        id,
        finished
      },
      successCallback: () => {
        alertBox({ text: "变更成功", severity: "success" });
        refresh();
      }
    });
  }
  return (
    <Card className={classes.root}>
      <div className={classes.header}>
        <Typography color="textPrimary" size="small" component="h2">
          {`${WORK_TYPE[workType]}：`}
        </Typography>
        {hasPermission && (
          <IconButton color="inherit" onClick={() => setOpen(true)}>
            <AddBoxIcon />
          </IconButton>
        )}
      </div>
      <Divider />
      {works?.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>任务编号</TableCell>
              <TableCell>任务名称</TableCell>
              {!hasPermission && (
                <>
                  <TableCell>任务周期</TableCell>
                  <TableCell>任务状态</TableCell>
                </>
              )}
              <TableCell align="center">操作</TableCell>
            </TableRow>
          </TableHead>
          {/* type;设备类型 model;设备型号 name;设备名称 principal;负责人姓名
          inventory;库存 inventoryUnit;库存单位 */}
          <TableBody>
            {works?.map((work) => (
              <TableRow hover key={work.id}>
                <TableCell>{work.id}</TableCell>
                <TableCell>{work.name}</TableCell>
                {!hasPermission && (
                  <>
                    <TableCell>
                      {`${work?.allocation?.planWorkStartDate || "--"} ~ ${
                        work?.allocation?.planWorkEndDate || "--"
                      }`}
                    </TableCell>
                    <TableCell>
                      {work?.allocation?.finished === 0 ? "未完成" : "已完成"}
                    </TableCell>
                  </>
                )}
                <TableCell align="center">
                  {hasPermission ? (
                    <>
                      <Button
                        color="primary"
                        size="small"
                        variant="text"
                        onClick={() => {
                          setOpen(true);
                          setWorkDetail(work);
                        }}
                      >
                        编辑
                      </Button>
                      <Button
                        color="primary"
                        size="small"
                        variant="text"
                        onClick={() => deleteWork(work.id, work.name)}
                      >
                        删除
                      </Button>
                    </>
                  ) : (
                    <Button
                      color="primary"
                      size="small"
                      variant="text"
                      onClick={() =>
                        handleUpdate(
                          work?.allocation?.id,
                          work?.allocation?.finished === 0 ? 1 : 0
                        )
                      }
                      hasPermission={hasPermission}
                    >
                      {work?.allocation?.finished === 0
                        ? "设为已完成"
                        : "设为未完成"}
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className={classes.empty}>暂未添加任务</p>
      )}
      <EditWork
        open={open}
        onClose={() => {
          setOpen(false);
          setWorkDetail({});
          refresh();
        }}
        workDetail={workDetail}
        planStageId={planStageId}
        workType={workType}
      />
    </Card>
  );
}
