import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";
import { Typography } from "@material-ui/core";

export default function CustomAlertDialog(props) {
  const { open, handleClickAgree, handleClickDisagree, content } = props;

  const handleClickOpen = () => {
    handleClickAgree();
  };

  const handleClose = () => {
    handleClickDisagree();
  };

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">{""}</DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography gutterBottom color="textPrimary" variant="body1">
              {content}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => {
              handleClose();
            }}
          >
            취소
          </Button>
          <Button
            color="primary"
            onClick={() => {
              handleClickOpen();
            }}
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
