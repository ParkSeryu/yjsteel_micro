import React, { useState, useRef } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import InputAdornment from "@material-ui/core/InputAdornment";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import { IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CheckBox from "@mui/material/Checkbox";
import ListItemIcon from "@mui/material/ListItemIcon";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "green",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red",
      },
      "&.Mui-focused fieldset": {
        borderColor: "rgba(0, 176, 246, 1)",
      },
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  test: {
    border: "1px solid red",
  },

  actions: {
    backgroundColor: "#2f313e",
  },

  paper: {
    overflowY: "unset",
  },

  button: {
    color: "rgba(29, 99, 249, 1)",
    fontSize: "11pt",
  },

  codeNm: {
    fontSize: "15px",
    textAlign: "left",
    fontStyle: "bold",
  },

  cancelIcon: {
    position: "absolute",
    right: "-10px",
    top: "-15px",
    width: "30px",
    height: "30px",
    backgroundColor: "red",
    color: "white",
    fontSize: "12px",
  },
}));

function CustomDialogMultiSelect(props) {
  const classes = useStyles();
  const { codeListData, open, onClose } = props;
  const [keyWord, setKeyWord] = useState("");
  const [checked, setChecked] = React.useState([]);

  const handleClose = () => {
    onClose([]);
    setChecked([]);
  };

  const handleOkButton = () => {
    onClose(checked);
    setChecked([]);
  };

  const handleListItemClick = (selectItem) => {
    const newChecked = [...checked];
    if (!newChecked.includes(selectItem)) {
      newChecked.push(selectItem);
    } else {
      newChecked.splice(newChecked.indexOf(selectItem), 1);
    }
    setChecked(newChecked);
  };

  const handleChange = (e) => {
    setKeyWord(e.target.value.toUpperCase());
  };

  const filteredList = codeListData.filter(
    (data) => data.CODE_NM.indexOf(keyWord.toUpperCase()) !== -1
  );

  const inputRef = useRef();

  const RefhandleClear = () => {
    setKeyWord("");
    inputRef.current.focus();
  };

  return (
    <>
      <Dialog
        onClose={handleClose}
        open={open}
        fullWidth
        classes={{ paper: classes.paper }}
      >
        <IconButton
          className={classes.cancelIcon}
          onClick={() => handleClose()}
        >
          <ClearIcon />
        </IconButton>
        <DialogTitle>
          <CssTextField
            variant="outlined"
            size="small"
            fullWidth
            ref={inputRef}
            onChange={handleChange}
            value={keyWord}
            placeholder="검색"
            InputProps={{
              endAdornment: keyWord.length > 0 && (
                <InputAdornment onClick={() => RefhandleClear()} position="end">
                  <IconButton edge="end">
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogTitle>
        <DialogContent dividers style={{ height: "60vh" }}>
          <div>
            {filteredList.length > 0 &&
              filteredList.map((listData) => (
                <div key={listData.CODE_CD}>
                  <ListItem
                    className={classes.listItem}
                    button
                    onClick={() =>
                      handleListItemClick(
                        listData.CODE_CD + "/" + listData.CODE_NM
                      )
                    }
                    dense
                  >
                    <ListItemIcon>
                      <CheckBox
                        edge="start"
                        checked={checked.includes(
                          listData.CODE_CD + "/" + listData.CODE_NM
                        )}
                      />
                    </ListItemIcon>
                    <ListItemText>{listData.CODE_CD}</ListItemText>
                    <span className={classes.codeNm}>{listData.CODE_NM}</span>
                  </ListItem>
                  {listData.CODE_CD !== "MG" && <Divider />}
                </div>
              ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>취소</Button>
          <Button
            onClick={() => handleOkButton()}
            className={classes.insertButton}
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default React.memo(CustomDialogMultiSelect);
