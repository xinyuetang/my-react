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
import DeviceTable from "src/views/deviceManagement/DeviceTable";
const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  formRoot: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1.5),
      width: "25ch",
    },
  },
  margin: {
    margin: theme.spacing(1.5),
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
    fetch(`${GET_ALL_DEVICE_URL}?limit=1999`, {})
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        if (response?.data?.length > 0) {
          setType0(response?.data?.filter((device) => device?.type === 0));
          setType1(response?.data?.filter((device) => device?.type === 1));
          setType2(response?.data?.filter((device) => device?.type === 2));
          setType3(response?.data?.filter((device) => device?.type === 3));
        }
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
          {/* type;设备类型 model;设备型号 name;设备名称 principal;负责人姓名
          inventory;库存 inventoryUnit;库存单位 */}
          <Formik
            initialValues={{
              type: 0,
              model: "",
              principal: "",
              name: "",
              inventory: 0,
              inventoryUnit: "",
            }}
            validationSchema={Yup.object().shape({
              type: Yup.number().required("设备类型必填"),
            })}
            onSubmit={(values) => {
              postFetch({
                url: ADD_DEVICE_URL,
                values,
                successCallback: () => {
                  refreshDevice();
                  setValue(0);
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
              <form onSubmit={handleSubmit} className={classes.formRoot}>
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
                <TextField
                  label="设备型号"
                  margin="normal"
                  name="model"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <TextField
                  label="设备名称"
                  margin="normal"
                  name="name"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <TextField
                  label="负责人姓名"
                  margin="normal"
                  name="principal"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <TextField
                  label="库存"
                  margin="normal"
                  name="inventory"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <TextField
                  label="库存单位"
                  margin="normal"
                  name="inventoryUnit"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />

                <Box my={2} className={classes.margin}>
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
