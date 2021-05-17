import React, { useEffect, useState } from "react";
import {
  Box,
  makeStyles,
  Tabs,
  Tab,
  Paper,
  AppBar,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { U_DEVICE_ALLOCATION_URL } from "src/settings";
import DeviceTable from "./components/DeviceTable";
import HistoryTable from './components/HistoryTable'
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

const DeviceNormal = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const [histories, setHistories] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getHistory = () => {
    fetch(`${U_DEVICE_ALLOCATION_URL}?limit=1999`, {})
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => setHistories(response?.data || []));
  };
  useEffect(getHistory, [refresh]);
  const refreshHistory = () => setRefresh((prev) => !prev)

  return (
    <Paper className={classes.root}>
      <AppBar position="static" color="secondary">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="所有设备" {...a11yProps(0)} />
          <Tab label="我的借用记录" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <DeviceTable {...props} refreshHistory={refreshHistory} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <HistoryTable
          {...props}
          refreshHistory={refreshHistory}
          histories={histories}
        />
      </TabPanel>
    </Paper>
  );
};

export default DeviceNormal;

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
