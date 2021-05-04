import React, { useEffect, useState } from "react";
import {
  Box,
  makeStyles,
  Tabs,
  Tab,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import PropTypes from "prop-types";
import Page from "src/components/Page";
import { Formik } from "formik";
import * as Yup from "yup";
import { ADD_DEVICE_URL, GET_ALL_DEVICE_URL } from "src/settings";
import { postFetch } from "src/base";
import cookie from "react-cookies";
import DeviceTable from "src/views/deviceManagement/DeviceTable";
const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const DeviceManagementView = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const [type0, setType0] = useState([]);
  const [type1, setType1] = useState([]);
  const [type2, setType2] = useState([]);
  const [type3, setType3] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getAllDevice = () => {
    fetch(GET_ALL_DEVICE_URL, {})
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        setType0(response?.data?.type0 || []);
        setType1(response?.data?.type0 || []);
        setType2(response?.data?.type0 || []);
        setType3(response?.data?.type0 || []);
      });
  };
  useEffect(getAllDevice, [refresh]);
  const refreshDevice = () => setRefresh((prev) => !prev)

  return (
    <Page className={classes.root} title="notification">
      <div>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} variant="fullWidth">
            <Tab label="台式设备" {...a11yProps(0)} />
            <Tab label="移动设备" {...a11yProps(1)} />
            <Tab label="服务器" {...a11yProps(2)} />
            <Tab label="其他设备" {...a11yProps(3)} />
            <Tab label="登记设备" {...a11yProps(4)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <DeviceTable devices={type0} type={0} refresh={refreshDevice} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <DeviceTable devices={type1} type={1} refresh={refreshDevice} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <DeviceTable devices={type2} type={2} refresh={refreshDevice} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <DeviceTable devices={type3} type={3} refresh={refreshDevice} />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Formik
            initialValues={{
              type: 0, // 设备类型，0：台式设备，1：移动设备， 2：服务器，3：其他
              deviceVersion: "", // 设备型号  仅适用于0，1
              personInCharge: "", // 负责人姓名  仅适用于 2
              serverName: "", // 服务器名字    仅适用于2
              memory: 0, //使用内存, 以G为单位，仅适用于2
              deviceType: "", // 设备类型， 仅适用于 3
              deviceModel: "", // 设备型号， 仅适用于 3
            }}
            validationSchema={Yup.object().shape({
              type: Yup.number().required("设备类型必填"),
            })}
            onSubmit={(values) => {
              postFetch({
                url: ADD_DEVICE_URL,
                values,
                successCallback: () => {
                  refreshDevice()
                },
                errorCallback: () => {
                  window.location.reload();
                },
              });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  select
                  label="设备类型"
                  name="type"
                  margin="normal"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  variant="outlined"
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value={0}> 台式设备</option>
                  <option value={1}> 移动设备</option>
                  <option value={2}> 服务器</option>
                  <option value={3}> 其他</option>
                </TextField>
                {(values.type == 0 || values.type == 1) && (
                  <TextField
                    label="设备型号"
                    margin="normal"
                    name="deviceVersion"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                )}
                {values.type == 2 && (
                  <TextField
                    label="负责人姓名"
                    margin="normal"
                    name="personInCharge"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                )}
                {values.type == 2 && (
                  <TextField
                    label="服务器名字"
                    margin="normal"
                    name="serverName"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                )}
                {values.type == 2 && (
                  <TextField
                    label="使用内存"
                    margin="normal"
                    name="memory"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                )}
                {values.type == 3 && (
                  <TextField
                    label="设备类型"
                    margin="normal"
                    name="deviceType"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                )}
                {values.type == 3 && (
                  <TextField
                    label="设备型号"
                    margin="normal"
                    name="deviceModel"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                )}

                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    提交
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </TabPanel>
      </div>
    </Page>
  );
};

export default DeviceManagementView;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
