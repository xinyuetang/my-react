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
} from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { MNG_DELETE_WORK_URL } from "src/settings";
import { deleteFetch } from "src/base";
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
  const { works, refresh, workType, planStageId } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [workDetail, setWorkDetail] = useState({});
  const deleteWork = (id) => {
    deleteFetch({
      url: `${MNG_DELETE_WORK_URL}?id=${id}`,
      successCallback: refresh,
    });
  };
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography color="textPrimary" size="small" component="h2">
          {`${WORK_TYPE[workType]}：`}
        </Typography>
        <IconButton color="inherit" onClick={() => setOpen(true)}>
          <AddBoxIcon />
        </IconButton>
      </div>
      <Divider />
      {works?.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>任务编号</TableCell>
              <TableCell>任务名称</TableCell>
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
                <TableCell align="center">
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
                    onClick={() => deleteWork(work.id)}
                  >
                    删除
                  </Button>
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
    </div>
  );
}
