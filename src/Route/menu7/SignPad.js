import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import SignaturePad from "signature_pad";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import axios from "axios";

const useStyles = makeStyles(() => ({
  paper: {
    overflowY: "unset",
    margin: 0,
    padding: 0,
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

let sigPad = null;

export default function SimpleDialog(props) {
  const classes = useStyles();
  const { open, onClose, shipNo } = props;
  const [signaturePadData, setSignaturePadData] = useState("");

  const handleClose = () => {
    onClose();
  };

  const handleClearPad = () => {
    sigPad.clear();
    setSignaturePadData("");
  };

  const handleOK = () => {
    if (window.confirm("서명을 완료하고 저장 하시겠습니까?")) {
      let form = new FormData();
      form.append("ship_no", shipNo.replace("-", ""));
      form.append("sign_pad_image", signaturePadData);
      console.log(signaturePadData);
      axios
        .post(
          "http://121.165.242.72:5050/yjsteel/Developer/index.php/Menu7/signImageReg",
          form
        )
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            alert("서명 이미지가 등록되었습니다.");
            onClose("success");
          } else {
            alert("에러", () => onClose(""));
          }
        })
        .catch((e) => {
          console.error(e); // 에러표시
        });
    } else {
    }
  };

  useEffect(() => {
    setTimeout(() => {
      sigPad = new SignaturePad(document.getElementById("signature-pad"), {
        onEnd: () => {
          setSignaturePadData(sigPad.toDataURL()); // data:image/png;base64,iVBORw0K...
          /**
           * signaturePad.toDataURL(); // save image as PNG
           * signaturePad.toDataURL("image/jpeg"); // save image as JPEG
           * signaturePad.toDataURL("image/svg+xml"); // save image as SVG
           * */
        },
      });
    }, 500);
  }, []);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes.paper }}
      >
        <IconButton
          className={classes.cancelIcon}
          onClick={() => handleClose()}
        >
          <ClearIcon />
        </IconButton>

        <div style={{ width: "100%", height: "250px" }}>
          <canvas
            width={window.innerWidth * 0.8}
            id="signature-pad"
            height={250}
            style={{
              border: "1px solid #cdcdcd",
            }}
          />
        </div>
        <table style={{ width: "100%" }}>
          <tbody>
            <tr>
              <td style={{ width: "40%" }}>
                <Button
                  fullWidth
                  style={{
                    backgroundColor: "#74777E",
                    color: "#FFF",
                  }}
                  variant="contained"
                  onClick={() => handleClearPad()}
                >
                  초기화
                </Button>
              </td>
              <td style={{ width: "60%" }}>
                <Button
                  fullWidth
                  style={{
                    backgroundColor: "#68A7DC",
                    color: "#FFF",
                  }}
                  variant="contained"
                  onClick={() => handleOK()}
                >
                  확인
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </Dialog>
    </div>
  );
}
