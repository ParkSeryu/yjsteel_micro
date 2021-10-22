import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@mui/material/Button";
import SignPad from "./SignPad";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import SimpleDialog from "../../components/SimpleDialog";
import moment from "moment";
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import "moment/locale/ko";

const useStyles = makeStyles((theme) => ({
  AppBar: {
    // drawer Zindex : 1250
    zIndex: 1251,
    backgroundColor: "#DADCE0",
    color: "#000000",
    height: "55px",
  },
  tr: {},

  td: {
    color: "#858585",
    textAlign: "left",
    padding: "5px 0px",
    paddingLeft: "1vw",
  },

  tdBody: {
    fontStyle: "bold",
    paddingLeft: "1px",
  },

  container: {
    marginTop: "5px",
    marginBottom: "5px",
  },

  header: {
    position: "fixed",
    width: "100%",
    height: "40px",
    backgroundColor: "rgba(099, 100, 102, 1)",
    fontFamily: "NanumGothic",
    color: "white",
    zIndex: 5,
    top: 55,
  },

  typo_header: {
    padding: "5px 0",
    margin: 0,
    color: "#FFFFFF",
    textAlign: "left",
    backgroundColor: "transparent",
  },

  typoLeft_header: {
    color: "#FFFFFF",
    padding: "5px 15px",
    margin: 0,
    paddingLeft: "20px",
    textAlign: "left",
    backgroundColor: "transparent",
  },

  typoRight_header: {
    color: "#FFFFFF",
    padding: "5px 0",
    margin: 0,
    textAlign: "center",
    backgroundColor: "transparent",
  },

  circular_progress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: 2000,
    transform: "translate(-50%, -50%)",
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
}));

const nullCheck = (text) => {
  if (text === null) return "-";
  else return text;
};

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function Menu7_Detail({ open, onClose, detailItem }) {
  const classes = useStyles();
  const [itemList, setItemList] = useState([]);
  const [openBarCode, setOpenBarCode] = useState(false);
  const [openSigPad, setOpenSigPad] = useState(false);
  const [signaturePadData, setSignaturePadData] = useState("");
  const [nowTime, setNowTime] = useState(null);

  const handleButtonBarcodeClick = () => {
    setOpenBarCode(true);
  };

  const handleBarcodeClose = () => {
    setOpenBarCode(false);
  };

  const handleSigPadOpen = () => {
    setOpenSigPad(true);
  };

  const handleSigPadClose = (save_flag) => {
    if (save_flag === "success") {
      setOpenSigPad(false);
      onClose("success");
    } else {
      setOpenSigPad(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handlePushCommon = () => {
    console.log(detailItem);
    document.getElementById("detail_loading_circle").style.display = "block";
    if (window.sessionStorage.getItem("player_id") === "Car") {
      axios
        .get(
          "http://121.165.242.72:5050/yjsteel/Developer/index.php/Menu7/pushSendData",
          {
            params: {
              ship_no: detailItem.SHIP_NO.replace("-", ""),
              user_id: window.sessionStorage.getItem("user_id"),
            },
          }
        )
        .then((response) => {
          //console.log("response data receiving");
          console.log(response);
          if (response.data.RESULT_CODE === "200") {
            // data라는 이름으로 json 파일에 있는 값에 state값을 바꿔준다.
            let reportType = "1";
            let push_title = "[" + response.data.DATA.SELL_CUST_NM + "]";
            let push_content =
              numberWithCommas(response.data.DATA.TOT_WEIGHT) +
              "kg" +
              "\n" +
              response.data.DATA.TRANS_CAR_NO +
              "\n" +
              response.data.DATA.TRANS_MAN +
              "\n" +
              response.data.DATA.TRANS_MAN_PHONE +
              "\n" +
              moment().format("YYYY/MM/DD HH:mm분 ") +
              "출발하였습니다.";

            let form = new FormData();
            form.append("ship_no", detailItem.SHIP_NO.replace("-", ""));
            form.append("user_id", window.sessionStorage.getItem("user_id"));
            form.append("push_title", push_title);
            form.append("push_content", push_content);

            axios
              .post(
                "http://121.165.242.72:5050/yjsteel/Developer/index.php/Menu7/pushReg",
                form
              )
              .then((response) => {
                console.log(response);
                if (response.status === 200) {
                  axios
                    .get(
                      "http://121.165.242.72:5050/yjsteel/Developer/index.php/Menu7/getUserId",
                      {
                        params: {
                          cust_cd: detailItem.SELL_CUST_CD,
                        },
                      }
                    )
                    .then((response) => {
                      console.log(response);
                      if (response.data.RESULT_CODE === "200") {
                      }
                    });
                } else {
                  alert(
                    "처리중 오류가 발생했습니다. 해당 문제가 지속될 경우 관리자에게 문의해주세요."
                  );
                  document.getElementById(
                    "detail_loading_circle"
                  ).style.display = "none";
                }
              });
          } else if (response.data.RESULT_CODE === "205") {
            alert(
              "처리중 오류가 발생했습니다. 해당 문제가 지속될 경우 관리자에게 문의해주세요. (error code : 205)"
            );
            document.getElementById("detail_loading_circle").style.display =
              "none";
          } else if (response.data.RESULT_CODE === "203") {
            alert("등록된 푸시 대상이 없습니다.");
          }
        })
        .catch((e) => {
          console.error(e); // 에러표시
          document.getElementById("detail_loading_circle").style.display =
            "none";
        });
    } else {
      alert("운전기사만 출발알림 전송 가능합니다.");
    }
  };

  window.addEventListener("checkBackFlag", funCheckDialogFlag, {
    once: true,
  });

  function funCheckDialogFlag() {
    let count = 0;
    if (count === 0) {
      if (openBarCode) {
        count = 1;
        setOpenBarCode(false);
      }
      if (openSigPad) {
        count = 1;
        setOpenSigPad(false);
      }
      window.sessionStorage.setItem("closeFlag", count);
    }
  }

  window.addEventListener("closeOpenSearch", funCheckSearchFlag, {
    once: true,
  });

  function funCheckSearchFlag() {
    let count = 0;

    if (open) {
      handleClose();
      count = 2;
    }
    window.sessionStorage.setItem("closeFlag", count);
  }

  useEffect(() => {
    document.getElementById("detail_loading_circle").style.display = "block";
    axios
      .get(
        "http://121.165.242.72:5050/yjsteel/Developer/index.php/Menu7/detail",
        {
          params: {
            ship_no: detailItem.SHIP_NO.replace("-", ""),
          },
        }
      )
      .then((response) => {
        //console.log("response data receiving");
        console.log(response);
        if (response.data.RESULT_CODE === "200") {
          // data라는 이름으로 json 파일에 있는 값에 state값을 바꿔준다.
          setItemList(response.data);
          setSignaturePadData(response.data.SIGN_IMAGE);
          setNowTime(response.data.SIGN_DATA);
          document.getElementById("detail_loading_circle").style.display =
            "none";
        } else {
          alert("에러", () => handleClose());
          document.getElementById("detail_loading_circle").style.display =
            "none";
        }
      })
      .catch((e) => {
        console.error(e); // 에러표시
      });
  }, []);

  return (
    <>
      <Drawer open={open} onClose={handleClose} anchor={"right"}>
        <AppBar className={classes.AppBar}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              onClick={() => {
                handleClose();
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" id="detailTitle" className={classes.title}>
              출고 및 인수 확인
            </Typography>
          </Toolbar>
        </AppBar>
        <div>
          <div className={classes.header}>
            <Grid className={classes.container} container>
              <Grid item xs={9} sm={9}>
                <Paper elevation={0} className={classes.typo_header}>
                  <span style={{ paddingLeft: "15px" }}>
                    {"수요가 : " + nullCheck(detailItem.SELL_CUST_NM)}
                  </span>
                </Paper>
              </Grid>
              <Grid item xs={3} sm={3}>
                <Paper elevation={0} className={classes.typoRight_header}>
                  {detailItem.APPEND_CLS}
                </Paper>
              </Grid>
            </Grid>
          </div>
        </div>
        <div>
          <table
            style={{
              tableLayout: "fixed",
              width: "100%",
              fontSize: "15px",
              marginTop: "100px",
              backgroundColor: "white",
            }}
          >
            <colgroup>
              <col width="20%" />
              <col width="10%" />
              <col />
            </colgroup>
            <tbody>
              <tr className={classes.tr}>
                <td className={classes.td}>출 고 일 :</td>
                <td className={classes.tdBody} colSpan="2">
                  <b>{detailItem.OUT_DATE}</b>
                </td>
                <td align="left" rowsPan="2">
                  <Button
                    variant="contained"
                    style={{
                      color: "#FFF",
                      backgroundColor: "#74777E",
                      width: "25vw",
                      height: "100%",
                    }}
                    className={classes.button}
                    onClick={() => handlePushCommon()}
                  >
                    출발알림
                  </Button>
                </td>
              </tr>
              <tr className={classes.tr}>
                <td className={classes.td}>출고번호 :</td>
                <td className={classes.tdBody} colSpan="2">
                  <b>{detailItem.SHIP_NO}</b>
                </td>
              </tr>
              <tr className={classes.tr}>
                <td className={classes.td}>스캔시간 :</td>
                <td
                  className={classes.tdBody}
                  style={{ color: "blue" }}
                  colSpan="2"
                >
                  <b>{detailItem.SCAN_TIME}</b>
                </td>
                <td align="left" rowsPan="4">
                  <Button
                    variant="contained"
                    style={{
                      color: "#FFF",
                      backgroundColor: "#74777E",
                      width: "25vw",
                      height: "100%",
                    }}
                    onClick={() => handleButtonBarcodeClick()}
                  >
                    바코드
                  </Button>
                </td>
              </tr>
              <tr className={classes.tr}>
                <td className={classes.td}>사업장 :</td>
                <td className={classes.tdBody} colSpan="2">
                  <b>{detailItem.WORK_CUST_NM}</b>
                </td>
              </tr>
              <tr className={classes.tr}>
                <td className={classes.td}>
                  <span>사급업체 :</span>
                </td>
                <td className={classes.tdBody} colSpan="2">
                  <b>{detailItem.VEN_CUST_NM}</b>
                </td>
              </tr>
              <tr className={classes.tr}>
                <td className={classes.td}>
                  <span>착　　지 :</span>
                </td>
                <td className={classes.tdBody} colSpan="2">
                  <b>{detailItem.DLV_CUST_NM}</b>
                </td>
              </tr>
              <tr className={classes.tr}>
                <td className={classes.td}>
                  <span>차량번호 :</span>
                </td>
                <td className={classes.tdBody} colSpan="2">
                  <b>{detailItem.TRANS_CAR_NO}</b>
                </td>
                <td rowsPan="3"></td>
              </tr>
              <tr className={classes.tr}>
                <td className={classes.td}>
                  <span>운송기사 :</span>
                </td>
                <td className={classes.tdBody} colSpan="2">
                  <b>{detailItem.TRANS_MAN}</b>
                </td>
              </tr>
              <tr className={classes.tr}>
                <td className={classes.td}>
                  <span>전화번호 :</span>
                </td>
                <td className={classes.tdBody} colSpan="2">
                  <b>{detailItem.TRANS_MAN_PHONE}</b>
                </td>
              </tr>
            </tbody>
          </table>
          <table
            style={{
              width: "100%",
              padding: "10px 0px",
              borderBottom: "0.5px solid rgba(0 ,0, 0, .4)",
              tableLayout: "fixed",
              background: "#D6D6D6",

              fontSize: "15px",
            }}
          >
            <tbody>
              <tr>
                <td align="center" style={{ width: "25%" }}>
                  품명/재질
                </td>
                <td align="center" style={{ width: "35%" }}>
                  <span>
                    SIZE/제품번호/
                    <br />
                    적재위치
                  </span>
                </td>
                <td align="center" style={{ width: "15%" }}>
                  수량
                </td>
                <td align="center" style={{ width: "25%" }}>
                  중량
                </td>
              </tr>
            </tbody>
          </table>

          {itemList.length !== 0 &&
            itemList.DATA.map((item) => {
              let name_nm = item.NAME_NM.split("<br>");
              let dtl_info = item.DTL_INFO.split("<br>");
              return (
                <>
                  <table
                    style={{
                      width: "100%",
                      padding: "10px 10px",
                      borderBottom: "0.5px solid rgba(0 ,0, 0, .4)",
                      overflowX: "hidden",
                      tableLayout: "fixed",
                      whiteSpace: "nowrap",
                      fontSize: "15px",
                    }}
                  >
                    <tbody>
                      <tr>
                        <td align="left" style={{ width: "25%" }}>
                          {name_nm[0]}
                        </td>
                        <td style={{ width: "35%" }}>{dtl_info[0]}</td>
                        <td align="right" style={{ width: "15%" }}>
                          {item.QUANTITY_STR}
                        </td>
                        <td align="right" style={{ width: "25%" }}>
                          {item.WEIGHT_STR}
                        </td>
                      </tr>
                      <tr>
                        <td align="left" style={{ width: "25%" }}>
                          {name_nm[1]}
                        </td>
                        <td style={{ width: "35%" }}>{dtl_info[1]}</td>
                        <td align="right" style={{ width: "15%" }}></td>
                        <td align="right" style={{ width: "25%" }}></td>
                      </tr>
                      <tr>
                        <td align="left" style={{ width: "25%" }}>
                          {}
                        </td>
                        <td style={{ width: "35%" }}>{dtl_info[2]}</td>
                        <td align="right" style={{ width: "15%" }}></td>
                        <td align="right" style={{ width: "25%" }}></td>
                      </tr>
                    </tbody>
                  </table>
                </>
              );
            })}

          {itemList.TOTAL_QUANTITY !== 0 && (
            <table
              style={{
                width: "100%",
                padding: "5px 10px",
                overflowX: "hidden",
                background: "#EEEEEE",
                tableLayout: "fixed",
                whiteSpace: "nowrap",
                fontSize: "15px",
              }}
            >
              <tbody>
                <tr>
                  <td align="center" style={{ width: "25%" }}>
                    합계
                  </td>
                  <td style={{ width: "35%" }}>{}</td>
                  <td align="right" style={{ width: "15%" }}>
                    {numberWithCommas(String(itemList.TOTAL_QUANTITY))}
                  </td>
                  <td align="right" style={{ width: "25%" }}>
                    {numberWithCommas(String(itemList.TOTAL_WEIGHT))}
                  </td>
                </tr>
              </tbody>
            </table>
          )}

          <div
            style={{
              width: "100%",
              textAlign: "center",
              marginTop: "10px",
              marginBottom: "50px",
            }}
          >
            {signaturePadData === "" ? (
              <div
                style={{
                  display: "inline-block",
                  width: "80%",
                  height: "20vh",
                  lineHeight: "20vh",
                  verticalAlign: "middle",
                  textAlign: "center",
                  border: "1px solid #cdcdcd",
                }}
                onClick={() => handleSigPadOpen()}
              >
                터치하여 서명하세요
              </div>
            ) : (
              <>
                <div style={{ marginBottom: "10px" }}>{nowTime}</div>
                <img
                  style={{
                    width: "80%",
                    height: "20vh",
                    border: "1px solid #cdcdcd",
                  }}
                  src={"data:image/png;base64," + signaturePadData}
                  alt={"서명"}
                  onClick={() => handleSigPadOpen()}
                />
              </>
            )}
          </div>

          {signaturePadData === "" && (
            <Button
              fullWidth
              style={{
                position: "fixed",
                bottom: 0,
                backgroundColor: "#68A7DC",
                color: "#FFF",
              }}
              variant="contained"
              onClick={() => handleSigPadOpen()}
            >
              서명하기
            </Button>
          )}
        </div>
      </Drawer>

      {openBarCode === true && (
        <SimpleDialog
          open={openBarCode}
          onClose={handleBarcodeClose}
          barcodeNo={detailItem.BARCODE_NO}
        />
      )}

      {openSigPad === true && (
        <SignPad
          open={openSigPad}
          onClose={handleSigPadClose}
          shipNo={detailItem.SHIP_NO}
        />
      )}
    </>
  );
}
export default React.memo(Menu7_Detail);
