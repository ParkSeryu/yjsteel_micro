import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

export default function PictureDetail(props) {
  const { open, onClose, imgSrc } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth={"xl"}
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
          <img
            style={{ maxWidth: "100%", height: "auto" }}
            src={"data:image/png;base64," + imgSrc}
            alt={"사진"}
          ></img>
        </DialogContent>
      </Dialog>
    </div>
  );
}
