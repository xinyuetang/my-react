import React, { useContext } from 'react';
import {
  Button,
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableHead
} from '@material-ui/core';
import { UserContext } from "src/layouts/Context";
import {DELETE_DEVICE_URL} from 'src/settings';
import { deleteFetch } from "src/base";
export default function DeviceTable(props){
    const { devices } = props;
    const { userInfo } = useContext(UserContext);
    const type = props.type;
    const { refresh } = props;
    const deleteDevice=(id)=>{
      deleteFetch({
        url: `${DELETE_DEVICE_URL}?id=${id}`,
        successCallback: refresh,
      });
    }
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>编号</TableCell>
            <TableCell>设备型号</TableCell>
            <TableCell>设备名称</TableCell>
            <TableCell>负责人</TableCell>
            <TableCell>库存</TableCell>
            <TableCell>使用者学号</TableCell>
            <TableCell>使用者姓名</TableCell>
            <TableCell>使用数量</TableCell>
            <TableCell>提交时间</TableCell>
            <TableCell align="center">操作</TableCell>
          </TableRow>
        </TableHead>
        {/* type;设备类型 model;设备型号 name;设备名称 principal;负责人姓名
          inventory;库存 inventoryUnit;库存单位 */}
        <TableBody>
          {devices.map((device) => (
            <TableRow hover key={device.id}>
              <TableCell>{device.id}</TableCell>
              <TableCell>{device.model}</TableCell>
              <TableCell>{device.name}</TableCell>
              <TableCell>{device.principal}</TableCell>
              <TableCell>{`${device.inventory}(${device.inventoryUnit})`}</TableCell>
              <TableCell>{device.stuId}</TableCell>
              <TableCell>{device.name}</TableCell>
              <TableCell>{`${device.inventory}(${device.inventoryUnit})`}</TableCell>
              <TableCell>{device.date}</TableCell>
              <TableCell align="center">
                {userInfo.userId === device.userId && (
                  <Button
                    color="primary"
                    size="small"
                    variant="text"
                    onClick={() => deleteDevice(device.id)}
                  >
                    删除
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );


    

}