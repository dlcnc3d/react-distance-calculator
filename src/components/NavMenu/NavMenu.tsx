import { useTheme } from "@material-ui/core/styles";

import React from "react";
import clsx from "clsx";

import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SettingsIcon from "@material-ui/icons/Settings";

import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import useStyles from "./NavMenu.styles";
import { Dialog, Tooltip } from "@material-ui/core";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import { LoginForm } from "../LoginForm/LoginForm";
import { useAuthData } from "../../context/auth.context";
import { useMapData } from "../../context/map.context";
import { AuthReset } from "../AuthForgot/AuthReset";
import { UpdateUserData } from "../UpdateUserData/UpdateUserData";
import { useEffect } from "react";

export default function NavMenu() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { currentUser, logOut } = useAuthData();
  const { setRoutes } = useMapData();
  const { authReset, setAuthReset } = useMapData();

  const { setRoutesEnabled } = useMapData();
  const { setPoints } = useMapData();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [openSignUp, setOpenSignUp] = React.useState(false);
  const [openLogIn, setOpenLogIn] = React.useState(false);
  const [updateUserData, setUpdateUserData] = React.useState(false);

  const handleClickOpenSignUp = () => {
    if (openLogIn) {
      setOpenLogIn(false);
    }
    setOpenSignUp(true);
  };

  const handleClickOpenLogIn = () => {
    if (openSignUp) {
      setOpenSignUp(false);
    }
    setOpenLogIn(true);
  };

  const handleClickUpdateUserData = () => {
    setUpdateUserData(true);
  };

  const handleClickLogOut = () => {
    setPoints([]);
    setRoutesEnabled(false);
    setRoutes(null);
    logOut();
  };

  useEffect(() => {
    if (authReset === true) {
      setOpenLogIn(false);
    }
  }, [authReset]);

  const handleClose = () => {
    setOpenSignUp(false);
    setOpenLogIn(false);
    setAuthReset(false);
    setUpdateUserData(false);
  };

  return (
    <div className={classes.root}>
      <AppBar
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap className={classes.title}>
            Menu
          </Typography>

          <Box mr={5} />

          {currentUser && (
            <Typography className={classes.userSign}> user name </Typography>
          )}

          <Typography
            className={
              currentUser === null ? classes.userUnSign : classes.userSign
            }
            variant={currentUser === null ? "h5" : "h6"}
          >
            {currentUser === null ? "unregistered user" : currentUser.email}
          </Typography>

          <Box mr={2}>
            {currentUser && (
              <Tooltip title="Account setting">
                <SettingsIcon
                  className={classes.buttonIcon}
                  onClick={handleClickUpdateUserData}
                />
              </Tooltip>
            )}

            <Dialog
              open={updateUserData}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <UpdateUserData onClose={handleClose} />
            </Dialog>
          </Box>

          <Box mr={2}>
            <Dialog
              open={authReset}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <AuthReset onClose={handleClose} />
            </Dialog>
          </Box>

          <Box mr={2}>
            <Button
              className={classes.menubutton}
              color="inherit"
              variant="outlined"
              onClick={
                currentUser === null ? handleClickOpenLogIn : handleClickLogOut
              }
            >
              {currentUser === null ? "Log in" : "Log Out"}
            </Button>

            <Dialog
              open={openLogIn}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <LoginForm onClose={handleClose} />
            </Dialog>
          </Box>
          {!currentUser && (
            <Box mr={0}>
              <Button variant="contained" onClick={handleClickOpenSignUp}>
                Sign Up
              </Button>

              <Dialog
                open={openSignUp}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
              >
                <RegisterForm onClose={handleClose} />
              </Dialog>
              <Dialog
                open={openSignUp}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
              >
                <RegisterForm onClose={handleClose} />
              </Dialog>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            button
            key={"Log in"}
            onClick={
              currentUser === null ? handleClickOpenLogIn : handleClickLogOut
            }
          >
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText
              primary={currentUser === null ? "Log in" : "Log Out"}
            />
          </ListItem>

          {currentUser && (
            <ListItem
              button
              key={"Account"}
              onClick={handleClickUpdateUserData}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>

              <ListItemText primary={"Account"} />
            </ListItem>
          )}

          {!currentUser && (
            <ListItem button key={"Sign Up"} onClick={handleClickOpenSignUp}>
              <ListItemIcon>
                <SupervisorAccountIcon />
              </ListItemIcon>

              <ListItemText primary={"Sign Up"} />
            </ListItem>
          )}
        </List>

        <Divider />
      </Drawer>
    </div>
  );
}
