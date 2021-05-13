import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  AppBar,
  Button,
  Toolbar,
  IconButton,
  Dialog,
  Typography,
  Slide,
  makeStyles,
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { MNG_DEVICE_USAGE_URL, MNG_RETURN_DEVICE_URL } from "src/settings";
import { postFetch } from "src/base";
import alertBox from "src/components/AlertBox";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeviceApplyHistory(props) {
  const { onClose, open, deviceDetail } = props;
  const classes = useStyles();
  const [histories, setHistories] = useState([]);
  const [refresh, setRefresh] = useState(false)
  useEffect(() => {
    if (deviceDetail?.id) {
      fetch(`${MNG_DEVICE_USAGE_URL}?deviceId=${deviceDetail?.id}`, {})
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          setHistories(response?.data || []);
        });
    }
  }, [deviceDetail, refresh]);

  const handleClose = () => {
    onClose();
  };
  const returnDevice = (allocationId) => {
    postFetch({
      url: MNG_RETURN_DEVICE_URL,
      values: {
        allocationId,
      },
      successCallback: () => {
        alertBox({ text: "归还成功", severity: "success" });
        setRefresh(!refresh);
      },
    });
  };
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {`[${deviceDetail.name}] 借用记录`}
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>借用人学号</TableCell>
            <TableCell>借用人姓名</TableCell>
            <TableCell>借出时间</TableCell>
            <TableCell>借用数量</TableCell>
            <TableCell>借用状态</TableCell>
            <TableCell align="center">操作</TableCell>
          </TableRow>
        </TableHead>
        {/* type;设备类型 model;设备型号 name;设备名称 principal;负责人姓名
          inventory;库存 inventoryUnit;库存单位 */}
        <TableBody>
          {histories?.map((history) => (
            <TableRow hover key={history.id}>
              <TableCell>{history.userStuId}</TableCell>
              <TableCell>{history.userName}</TableCell>
              <TableCell>{history.createTime}</TableCell>
              <TableCell>{`${history.inventoryUsage}（${history.inventoryUnit}）`}</TableCell>
              <TableCell color={history.status === 10 ? "error" : "default"}>
                {history.status === 10 ? "未归还" : "已归还"}
              </TableCell>
              <TableCell align="center">
                {history.status === 10 && (
                  <Button
                    color={history.status === 10 ? "primary" : "default"}
                    size="small"
                    variant="text"
                    onClick={() => {
                      if (history.status === 10) returnDevice(history.id);
                    }}
                  >
                    设为已还
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Dialog>
  );
}
