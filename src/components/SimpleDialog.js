import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import JsBarcode from "jsbarcode";
import DialogContent from "@material-ui/core/DialogContent";

export default function SimpleDialog(props) {
  const { open, onClose, barcodeNo } = props;
  const [barCodeUrl, setBarCodeUrl] = useState("");

  const handleClose = () => {
    onClose();
  };

  const canvas = document.createElement("canvas");

  JsBarcode(canvas, barcodeNo, {
    height: "100%",
    displayValue: true,
    format: "CODE128",
  });

  useEffect(() => {
    setBarCodeUrl(canvas.toDataURL("image/png"));
  }, [open]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <img width="100%" src={barCodeUrl} alt="barcode"></img>
        </DialogContent>
      </Dialog>
    </div>
  );
}
