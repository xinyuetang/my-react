import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Dialog,
  Typography,
  Slide,
  makeStyles,
  TextField,
  ListItem,
  List,
  Container,
  Button,
} from "@material-ui/core";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    "& .MuiButton-root": {
      color: "#fff",
    },
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  box: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
  },
  textField: {
    margin: theme.spacing(1),
    width: "150px",
  },
  contaner: {
    width: "800px",
    margin: "0 auto",
    "& .MuiBox-root": {
      display: "flex",
      alignItems: "center",
      paddingLeft: "16px",
      cursor: "pointer",
    },
  },
  list: {
    display: "flex",
    flexWrap: "wrap",
    "& .MuiListItem-root": {
      width: "150px",
      cursor: "pointer",
    },
  },
}));
const types = [
  {
    value: 10,
    label: "学术型",
  },
  {
    value: 20,
    label: "结合型",
  },
  {
    value: 30,
    label: "技术型",
  },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeviceApplyHistory(props) {
  const { onClose, open, users, assignStudy } = props;
  const classes = useStyles();
  const [name, setName] = useState('')
  const [keshuo, setKeshuo] = useState(2)
  const [studyType, setStudyType] = useState(0)
  const [userList, setUsersList] = useState(users)
  const [userIds, setUserIds] = useState([]);

  const handleClose = () => {
    onClose();
    setUserIds([]);
  };
  
  useEffect(() => {
    let list = [...users];
    if (name !== '') {
      list = list.filter((user) => user?.name?.includes(name));
    }
    if (parseInt(studyType) !== 0) {
      list = list.filter((user) => user?.studyType === parseInt(studyType));
    }
    if (parseInt(keshuo) !== 2) {
      list = list.filter((user) => user?.keshuo === parseInt(keshuo));
    }
    setUsersList(list)
  }, [name, keshuo, studyType])
  const handleCheckAll = () => {
    if (userIds.length === 0 || userIds.length !== userList.length) {
      setUserIds(userList.map((user) => user.id));
    } else {
      setUserIds([]);
    }
  }
  const handleCheck = (id) => {
    if (userIds.includes(id)) {
      setUserIds((prev) => prev.filter((userId) => userId != id));
    } else {
      setUserIds(prev => [...prev, id])
    }
  }
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
            任务分配
          </Typography>
          <Button size="small" onClick={handleClose}>
            取消
          </Button>
          <Button size="small" onClick={() => assignStudy(userIds)}>
            确认分配
          </Button>
          {/* <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton> */}
        </Toolbar>
      </AppBar>
      <Box className={classes.box}>
        <TextField
          label="用户姓名"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          className={classes.textField}
        />
        <TextField
          select
          label="就读类型"
          className={classes.textField}
          onChange={(e) => setStudyType(e.target.value)}
          variant="outlined"
          value={studyType}
          SelectProps={{
            native: true,
          }}
        >
          <option value={0}>全部</option>
          {types.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField
          select
          label="是否科硕"
          className={classes.textField}
          onChange={(e) => setKeshuo(e.target.value)}
          variant="outlined"
          value={keshuo}
          SelectProps={{
            native: true,
          }}
        >
          <option value={2}>全部</option>
          <option value={0}>否</option>
          <option value={1}>是</option>
        </TextField>
      </Box>
      <Container className={classes.contaner}>
        {userList.length > 0 && (
          <Box onClick={handleCheckAll}>
            {userIds.length === userList.length ? (
              <CheckBoxIcon color="primary" />
            ) : (
              <CheckBoxOutlineBlankIcon />
            )}
            全选
          </Box>
        )}
        <List className={classes.list}>
          {userList?.map((user) => (
            <ListItem key={user.id} onClick={() => handleCheck(user.id)}>
              {userIds.includes(user.id) ? (
                <CheckBoxIcon color="primary" />
              ) : (
                <CheckBoxOutlineBlankIcon />
              )}
              {user.name}
            </ListItem>
          ))}
        </List>
      </Container>
    </Dialog>
  );
}
