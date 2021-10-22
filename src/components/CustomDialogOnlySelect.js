import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogContent from "@material-ui/core/DialogContent";
import { IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import Dialog from "@material-ui/core/Dialog";

const useStyles = makeStyles((theme) => ({
  test: {
    border: "1px solid red",
  },

  paper: {
    overflowY: "unset",
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

function CustomDialogOnlySelect(props) {
  const classes = useStyles();
  const { data, open, onClose } = props;

  const handleClose = () => {
    onClose("exit", "exit");
  };

  const handleListItemClick = (codeName, codeCd) => {
    onClose(codeName, codeCd);
  };

  return (
    <>
      <Dialog
        onClose={handleClose}
        open={open}
        classes={{ paper: classes.paper }}
        className={classes.root}
      >
        <IconButton
          className={classes.cancelIcon}
          onClick={() => handleClose()}
        >
          <ClearIcon />
        </IconButton>
        <DialogContent
          style={{ padding: 0, marign: 0, minWidth: "300px", height: "100%" }}
        >
          <div>
            {data.map((listData) => (
              <div key={listData.CODE_CD}>
                <ListItem
                  className={classes.listItem}
                  button
                  onClick={() =>
                    handleListItemClick(listData.CODE_NAME, listData.CODE_CD)
                  }
                >
                  <ListItemText primary={listData.CODE_NAME} />
                </ListItem>
                <Divider />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CustomDialogOnlySelect;
