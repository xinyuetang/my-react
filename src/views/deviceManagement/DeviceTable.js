import React from 'react';
import {
  Button,
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableHead
} from '@material-ui/core';
import cookie from 'react-cookies';
import {DELETE_DEVICE_URL} from 'src/settings';
export default function DeviceTable(props){
    const devices = props.devices;
    const type = props.type;
    const refresh = props.refresh;
    const deleteDevice=(id)=>{
      fetch(DELETE_DEVICE_URL+'?id='+id, {
        method: 'GET', 
        headers: new Headers({
          'token': cookie.load("userInfo").token,
          'Content-Type': 'application/json;charset=utf-8'
      })
      }).then(res => res.json()) 
      .catch(error => console.error('Error:', error))
      .then(response => { console.log(response); refresh()}); 
    }
    return(
        <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  编号
                </TableCell>
                {(type===0||type===1)&&<TableCell>
                  设备型号
                </TableCell>}
                {(type===2)&&<TableCell>
                  服务器名字
                </TableCell>}
                {(type===2)&&<TableCell>
                  负责人
                </TableCell>}
                {(type===3)&&<TableCell>
                  设备类型
                </TableCell>}
                {(type===3)&&<TableCell>
                  设备型号
                </TableCell>}
                <TableCell>
                  使用者学号
                </TableCell>
                <TableCell>
                  使用者姓名
                </TableCell>
                {(type===2)&&<TableCell>
                  使用内存
                </TableCell>}
                <TableCell>
                  提交时间
                </TableCell>
                <TableCell align="center">
                  操作
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {devices.map((device) => (
                <TableRow
                  hover
                  key={device.id}
                >
                  <TableCell>
                    {device.id}
                  </TableCell>
                  {(type===0||type===1)&&<TableCell>
                    {device.deviceVersion}
                  </TableCell>}
                  {(type===2)&&<TableCell>
                  {device.serverName}
                </TableCell>}
      
                {(type===2)&&<TableCell>
                  {device.personInCharge}
                </TableCell>}
                {(type===3)&&<TableCell>
                  {device.deviceType}
                </TableCell>}
                {(type===3)&&<TableCell>
                  {device.deviceModel}
                </TableCell>}
                  <TableCell>
                    {device.studentId}
                  </TableCell>
                  <TableCell>
                    {device.name}
                  </TableCell>
                {(type===2)&&<TableCell>
                  {device.memory+' G'}
                </TableCell>}
                  <TableCell>
                    {device.date}
                  </TableCell>
  
                  <TableCell align="center">
                  {cookie.load("userInfo").id===device.userId && <Button
                    color="primary"
                    size="small"
                    variant="text"
                    onClick={()=>deleteDevice(device.id)}
                    >
                        删除
                    </Button>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
    );


    

}