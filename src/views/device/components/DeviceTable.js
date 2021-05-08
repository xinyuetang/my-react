import React, { useState, useContext } from "react";
import {
  Button,
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  Divider,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { UserContext } from "src/layouts/Context";
import {
  DELETE_DEVICE_URL,
} from "src/settings";
import { deleteFetch } from "src/base";
import ApplyDeviceForm from "./ApplyDeviceForm";
import EditDevice from './EditDevice'
import DeviceApplyHistory from "./DeviceApplyHistory";
const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: theme.spacing(2),
    "& .MuiTextField-root": {
      width: "150px",
    },
    "& .MuiButton-root": {
      width: "150px",
      height: "40px",
    },
  },
}));
const TYPES = [
  {
    id: 100,
    name: "所有设备",
  },
  {
    id: 0,
    name: "台式设备",
  },
  {
    id: 1,
    name: "移动设备",
  },
  {
    id: 2,
    name: "服务器",
  },
  {
    id: 3,
    name: "其它设备",
  },
];
export default function DeviceTable(props) {
  const { devices, refresh } = props;
  const classes = useStyles();
  const { userInfo } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [openEditDevice, setOpenEditDevice] = useState(false);
  const [openHitory, setOpenHitory] = useState(false);
  const [deviceId, setDeviceId] = useState(0)
  const [type, setType] = useState(100)
  const [deviceDetail, setDeviceDetail] = useState({});
  const deleteDevice = (id) => {
    deleteFetch({
      url: `${DELETE_DEVICE_URL}?id=${id}`,
      successCallback: refresh,
    });
  };
  const filterDevices =
    parseInt(type) === 100
      ? devices
      : devices?.filter((device) => device?.type === parseInt(type)) || [];
  const hasPermission = userInfo.roleId === 10
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <TextField
          select
          label="设备类型"
          size="small"
          value={type}
          onChange={(event) => setType(event.target.value)}
          SelectProps={{
            native: true,
          }}
          variant="outlined"
        >
          {TYPES.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </TextField>
        {hasPermission && (
          <Button variant="outlined" onClick={() => setOpenEditDevice(true)}>
            添加设备
          </Button>
        )}
      </div>
      <Divider />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>设备类型</TableCell>
            <TableCell>设备型号</TableCell>
            <TableCell>设备名称</TableCell>
            <TableCell>负责人</TableCell>
            <TableCell>库存</TableCell>
            <TableCell align="center">操作</TableCell>
          </TableRow>
        </TableHead>
        {/* type;设备类型 model;设备型号 name;设备名称 principal;负责人姓名
          inventory;库存 inventoryUnit;库存单位 */}
        <TableBody>
          {filterDevices?.map((device) => (
            <TableRow hover key={device.id}>
              <TableCell>
                {TYPES.find((type) => type.id === device.type).name}
              </TableCell>
              <TableCell>{device.model}</TableCell>
              <TableCell>{device.name}</TableCell>
              <TableCell>{device.principal}</TableCell>
              <TableCell>{`${device.inventory}(${device.inventoryUnit})`}</TableCell>
              <TableCell align="center">
                {userInfo.roleId === 10 ? (
                  <>
                    <Button
                      color="primary"
                      size="small"
                      variant="text"
                      onClick={() => {
                        setDeviceDetail(device);
                        setOpenHitory(true);
                      }}
                    >
                      借用记录
                    </Button>
                    <Button
                      color="primary"
                      size="small"
                      variant="text"
                      onClick={() => {
                        setOpenEditDevice(true);
                        setDeviceDetail(device);
                      }}
                    >
                      编辑
                    </Button>
                    <Button
                      color="primary"
                      size="small"
                      variant="text"
                      onClick={() => deleteDevice(device.id)}
                    >
                      删除
                    </Button>
                  </>
                ) : (
                  <Button
                    color="primary"
                    size="small"
                    variant="text"
                    onClick={() => {
                      setOpen(true);
                      setDeviceId(device.id);
                    }}
                  >
                    申请设备
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ApplyDeviceForm
        open={open}
        deviceId={deviceId}
        onClose={() => {
          setOpen(false);
          setDeviceId(0);
          refresh();
        }}
        tag={0}
      />
      <EditDevice
        open={openEditDevice}
        onClose={() => {
          setOpenEditDevice(false);
          setDeviceDetail({});
          refresh();
        }}
        deviceDetail={deviceDetail}
      />
      <DeviceApplyHistory
        open={openHitory}
        onClose={() => {
          setOpenHitory(false);
          setDeviceDetail({});
        }}
        deviceDetail={deviceDetail}
      />
    </div>
  );
}
