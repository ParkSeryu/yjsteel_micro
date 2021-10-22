import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { withRouter } from "react-router-dom";
import { Typography } from "@material-ui/core";
import axios from "axios";
import CloseIcon from "@material-ui/icons/Close";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles((theme) => ({
  AppBar: {
    // drawer Zindex : 1250
    zIndex: 1251,
    backgroundColor: "#DADCE0",
    color: "#000000",
    height: "55px",
    position: "fixed",
  },

  menuButton: {
    color: "#000000",
    marginTop: "5px",
  },

  title: {
    fontFamily: "NanumGothic",
    marginTop: "5px",
    color: "#000000",
  },

  menuInform: {
    position: "fixed",
    backgroundColor: "#538CBD",
    width: "65vw",
    height: "125px",
  },

  line: {
    marginBottom: "125px",
  },

  primaryText: {
    color: "#FFFFFF",
    marginTop: "15px",
  },

  secondaryText: {
    color: "#FFFFFF",
  },

  closeIcon: {
    position: "absolute",
    right: "5px",
    top: "5px",
    color: "#FFFFFF",
  },

  exit: {
    paddingTop: "7px",
    marginRight: "5px",
  },

  logOutIcon: { float: "right", color: "#FFFFFF", marginRight: "1px" },

  logOut: {
    float: "right",
    color: "#FFFFFF",
  },

  text: {
    paddingTop: "15px",
    marginLeft: "20px",
  },

  menuItem: {
    zIndex: 1,
    fontFamily: "NanumGothic",
    width: "65vw",
    padding: "15px 0px",
  },

  button: {
    textAlign: "center",
    marginTop: theme.spacing(1),
    marginLeft: "2vw",
  },
}));

function AppBars({ history, programName, programChange }) {
  const classes = useStyles();
  const [toggle, setToggle] = useState(false);
  const list = JSON.parse(window.sessionStorage.getItem("program_list"));
  const logOut = () => {
    if (window.sessionStorage.getItem("userAgent") === "android") {
      let token = window.BRIDGE.connectAndroid();
      let form = new FormData();
      form.append("login_id", window.sessionStorage.getItem("user_id"));
      form.append("token", token);
      axios
        .post(
          "http://121.165.242.72:5050/yjsteel/Developer/index.php/Login/logout",
          form
        )
        .then(() => {
          history.replace({
            pathname: "/",
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  window.addEventListener("checkBackFlag", funCheckFlag);
  function funCheckFlag() {
    let count = 0;

    if (count === 0) {
      if (toggle) {
        setToggle(false);
        console.log("Appbar : toggle");
        count = count + 1;
      }
    }

    window.sessionStorage.setItem("closeFlag", count);
  }

  return (
    <div>
      {console.log("AppBarRender")}
      <AppBar className={classes.AppBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            onClick={() => setToggle(!toggle)}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            id="programNameText"
            className={classes.title}
          >
            {programName}
          </Typography>
        </Toolbar>
      </AppBar>

      <SwipeableDrawer
        open={toggle}
        onClose={() => setToggle(!toggle)}
        onOpen={() => setToggle(!toggle)}
      >
        <div className={classes.menuInform}>
          <div className={classes.text}>
            <Typography type="body2" className={classes.primaryText}>
              영진철강(주)
            </Typography>
            <Typography
              type="body2"
              gutterBottom
              className={classes.secondaryText}
            >
              {window.sessionStorage.getItem("user_name")}
            </Typography>
          </div>
          <span
            onClick={() => {
              setToggle(!toggle);
              logOut();
            }}
          >
            <div className={classes.exit}>
              <Typography type="body2" className={classes.logOut}>
                로그아웃
              </Typography>
              <ExitToAppIcon className={classes.logOutIcon} />
            </div>
          </span>
          <CloseIcon
            onClick={() => setToggle(!toggle)}
            className={classes.closeIcon}
          />
        </div>
        <Divider className={classes.line} />
        {list.map((listData) => {
          return (
            <div key={listData.PROGRAM_ID}>
              <div
                className={classes.menuItem}
                onClick={() => (
                  setToggle(false),
                  programChange(listData.PROGRAM_ID, listData.PROGRAM_NM)
                )}
              >
                <span style={{ paddingLeft: "15px" }}>
                  {listData.PROGRAM_NM}
                </span>
              </div>
              <Divider />
            </div>
          );
        })}
      </SwipeableDrawer>
    </div>
  );
}

export default React.memo(withRouter(AppBars));
