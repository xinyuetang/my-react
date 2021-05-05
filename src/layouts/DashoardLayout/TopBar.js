import React, { useEffect, useState, useContext, useRef } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  makeStyles,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Button,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from "@material-ui/icons/Input";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import cookie from "react-cookies";
import { GET_ALL_BULLETIN_URL } from "src/settings";
import { UserContext } from "src/layouts/Context";

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60,
  },
  logo: {
    color: "white",
    fontSize: "larger",
  },
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();
  const history = useHistory();
  const { userInfo } = useContext(UserContext);
  const [newBulletinNumber, setNewBulletinBumber] = useState(0); //未读通知数量
  const logOut = () => {
    cookie.remove("loggedIn", { path: "/" });
    history.push("/login");
  };

  //向后台调取所有未读通知数
  const getAllBulletin = () => {
    return fetch(`${GET_ALL_BULLETIN_URL}?limit=9999`, {})
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => setNewBulletinBumber(response?.data?.length || 0));
  };

  useEffect(getAllBulletin, []);
  const anchorRef = React.useRef(null);
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar>
        <RouterLink to="/">
          <Typography className={classes.logo}>
            复旦大学系统软件与安全实验室
          </Typography>
        </RouterLink>
        <Box flexGrow={1} />
        <Hidden mdDown>
          <IconButton
            color="inherit"
            component={RouterLink}
            to={"/app/bulletinList/"}
          >
            <Badge badgeContent={newBulletinNumber} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Button
            color="inherit"
            startIcon={<AccountCircleIcon />}
            endIcon={<ExpandMoreIcon />}
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            {userInfo.name}
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="menu-list-grow"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem
                        component={RouterLink}
                        to={`/app/updateUserInfo/${userInfo.stuId}`}
                      >
                        编辑资料
                      </MenuItem>
                      <MenuItem component={RouterLink} to={"/reset"}>
                        修改密码
                      </MenuItem>
                      <MenuItem onClick={logOut}>退出登录</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
          {/* <IconButton onClick={logOut} color="inherit">
            <InputIcon />
          </IconButton> */}
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
};

export default TopBar;
