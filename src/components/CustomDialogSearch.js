import React, { useState, useRef, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import { IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import InfiniteScroll from "react-infinite-scroll-component";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";

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
  text: {
    fontSize: "0.85rem",
  },

  paper: {
    overflowY: "unset",
  },

  box: {
    padding: "30vh 0",
  },

  button: {
    color: "rgba(29, 99, 249, 1)",
    fontSize: "11pt",
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

let index = 40;

function CustomDialogSearch(props) {
  const classes = useStyles();
  const { codeListData, open, onClose } = props;
  const [keyWord, setKeyWord] = useState("");
  const [items, setItem] = useState([]);

  const filteredList = codeListData.filter(
    (data) => data.CODE_NM.indexOf(keyWord.toUpperCase()) !== -1
  );

  useEffect(() => {
    setKeyWord("");
    setItem(filteredList.slice(0, 40));
  }, [open]);

  useEffect(() => {
    setItem(filteredList.slice(0, 40));
    index = 40;
  }, [keyWord]);

  const handleClose = () => {
    onClose("exit", "exit");
  };

  const handleChange = (e) => {
    setKeyWord(e.target.value.toUpperCase());
  };

  const handleListItemClick = (codeName, codeCd) => {
    onClose(codeName, codeCd);
  };

  const inputRef = useRef();

  const RefhandleClear = () => {
    setKeyWord("");
    inputRef.current.focus();
  };

  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      setItem(items.concat(filteredList.slice(index, index + 40)));
      index = index + 40;
    }, 500);
  };

  return (
    <>
      <Dialog
        onClose={handleClose}
        open={open}
        fullWidth
        height={"100px"}
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
            ref={inputRef}
            onChange={handleChange}
            value={keyWord}
            fullWidth
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
        <DialogContent
          dividers
          style={{ padding: 0, margin: 0, height: "60vh" }}
        >
          <InfiniteScroll
            dataLength={items.length}
            next={fetchMoreData}
            hasMore={true}
            height={"60vh"}
          >
            {items.map((listData, index) => (
              <>
                <div
                  key={index}
                  style={{
                    fontSize: "13px",
                    padding: "15px 0px",
                    paddingLeft: "10px",
                  }}
                  onClick={() =>
                    handleListItemClick(listData.CODE_NM, listData.CODE_CD)
                  }
                >
                  <b>{listData.CODE_CD + "　" + listData.CODE_NM}</b>
                </div>
                <Divider />
              </>
            ))}
          </InfiniteScroll>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default React.memo(CustomDialogSearch);
