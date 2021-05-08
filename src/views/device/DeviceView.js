import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core";
import Page from "src/components/Page";
import { UserContext } from "src/layouts/Context";
import { U_GET_ALL_DEVICE_URL, MNG_GET_ALL_DEVICE_URL } from "src/settings";
import DeviceManagement from "./DeviceManagement";
import DeviceNormal from "./DeviceNormal";
const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    padding: theme.spacing(3)
  },
}));

const DeviceView = () => {
  const classes = useStyles();
  const { userInfo } = useContext(UserContext);
  const [devices, setDevices] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const getAllDevice = () => {
    fetch(
      `${
        userInfo.roleId === 10 ? MNG_GET_ALL_DEVICE_URL : U_GET_ALL_DEVICE_URL
      }?limit=1999`,
      {}
    )
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        setDevices(response?.data || []);
      });
  };
  useEffect(getAllDevice, [refresh]);
  const refreshDevice = () => setRefresh((prev) => !prev);

  return (
    <Page className={classes.root} title="设备管理">
      {userInfo.roleId === 10 ? (
        <DeviceManagement devices={devices} refresh={refreshDevice} />
      ) : (
        <DeviceNormal devices={devices} refresh={refreshDevice} />
      )}
    </Page>
  );
};

export default DeviceView;
