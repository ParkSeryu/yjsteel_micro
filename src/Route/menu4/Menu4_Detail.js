import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import PictureDetail from "../../components/PictureDetail";
import Menu4Modify from "./Menu4_Modify";

const useStyles = makeStyles((theme) => ({
  AppBar: {
    // drawer Zindex : 1250
    zIndex: 1251,
    backgroundColor: "#DADCE0",
    color: "#000000",
    height: "55px",
  },
  tr: {
    borderBottom: "1px solid #EEEEEE",
    height: "50px",
  },

  circular_progress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },

  td: {
    color: "#858585",
    textAlign: "center",
    padding: "5px 0px",
    paddingLeft: "1vw",
  },

  tdBody: {
    fontStyle: "bold",
    paddingLeft: "5px",
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

let retrieve_flag = null;
let imgSrc = "";

function Menu4_Detail({ open, onClose, claimNo }) {
  const classes = useStyles();
  const [itemList, setItemList] = useState([]);
  const [claim_date, setClaimDate] = useState("");
  const [maker_id, setMakerId] = useState("");
  const [maker_nm, setMakerNm] = useState("");
  const [sell_cust, setSellCust] = useState("");
  const [work_cust_nm, setWorkCustNm] = useState("");
  const [bad_cls_nm, setBadClsNm] = useState("");
  const [cust_nm, setCustNm] = useState("");
  const [claim_contents, setClaimContents] = useState("");
  const [pictureOpen, setPictureOpen] = useState(false);
  const [modifyOpen, setModifyOpen] = useState(false);

  const handleClose = () => {
    onClose(retrieve_flag);
    retrieve_flag = null;
  };

  const handlePictureOpen = (img_name) => {
    imgSrc = itemList.IMAGE[img_name];
    setPictureOpen(true);
  };

  const handlePictureClose = () => {
    setPictureOpen(false);
  };

  const handleModifyDetail = () => {
    setModifyOpen(true);
  };

  const handleModifyClose = (retrieveFlag) => {
    if (retrieveFlag === "retrieve") {
      retrieveDetail();
      retrieve_flag = "retrieve";
    }
    setModifyOpen(false);
  };

  const retrieveDetail = () => {
    document.getElementById("detail_loading_circle").style.display = "block";
    axios
      .get(
        "http://121.165.242.72:5050/yjsteel/Developer/index.php/Menu4/detail",
        {
          params: {
            claim_no: claimNo,
          },
        }
      )
      .then((response) => {
        //console.log("response data receiving");
        //console.log(response);
        if (response.data.RESULT_CODE === "200") {
          // data라는 이름으로 json 파일에 있는 값에 state값을 바꿔준다.
          setItemList(response.data);
          setClaimDate(response.data.DATA.CLAIM_DATE);
          setMakerId(response.data.DATA.MAKER_ID);
          setMakerNm(response.data.DATA.MAKER_NM);
          setSellCust(response.data.DATA.SELL_CUST);
          setBadClsNm(response.data.DATA.BAD_CLS_NM);
          setCustNm(response.data.DATA.CUST_NM);
          setWorkCustNm(response.data.DATA.WORK_CUST_NM);
          setClaimContents(response.data.DATA.CLAIM_CONTENTS);
          document.getElementById("detail_loading_circle").style.display =
            "none";
        } else {
          alert("에러", () => handleClose());
        }
      })
      .catch((e) => {
        console.error(e); // 에러표시
      });
  };

  const handleClaimDelete = () => {
    if (window.confirm("해당 클레임을 삭제 하시겠습니까?")) {
      document.getElementById("detail_loading_circle").style.display = "block";
      axios
        .get(
          "http://121.165.242.72:5050/yjsteel/Developer/index.php/Menu4/delete",
          {
            params: {
              claim_no: claimNo,
            },
          }
        )
        .then((response) => {
          //console.log("response data receiving");
          console.log(response);
          if (response.status === 200) {
            // data라는 이름으로 json 파일에 있는 값에 state값을 바꿔준다.
            console.log(response);
            document.getElementById("detail_loading_circle").style.display =
              "none";
            alert("삭제가 완료되었습니다.");
            onClose("retrieve");
          } else {
            alert("에러", () => handleClose());
            document.getElementById("detail_loading_circle").style.display =
              "none";
          }
        })
        .catch((e) => {
          console.error(e); // 에러표시
        });
    }
  };

  window.addEventListener("checkBackFlag", funCheckOpenFlag, {
    once: true,
  });

  function funCheckOpenFlag() {
    let count = 0;
    if (count === 0) {
      if (open) {
        count = 1;
        handleClose();
      }
      window.sessionStorage.setItem("closeFlag", count);
    }
  }

  useEffect(() => {
    retrieveDetail();
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
              onClick={() => handleClose()}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" id="detailTitle" className={classes.title}>
              클레임 내용
            </Typography>
          </Toolbar>
        </AppBar>

        <>
          <table
            style={{
              tableLayout: "fixed",
              width: "100%",
              fontSize: "16px",
              marginTop: "60px",
              backgroundColor: "white",
              borderCollapse: "collapse",
            }}
          >
            <tbody>
              <tr className={classes.tr}>
                <td className={classes.td}>등록일</td>
                <td className={classes.tdBody} colSpan="3">
                  {claim_date}
                </td>
                <td className={classes.td} colSpan="1">
                  등록자
                </td>
                <td className={classes.tdBody} colSpan="1">
                  {maker_nm}
                </td>
              </tr>
              <tr className={classes.tr}>
                <td className={classes.td}>거래처</td>
                <td className={classes.tdBody} colSpan="5">
                  {sell_cust}
                </td>
              </tr>
              <tr className={classes.tr}>
                <td className={classes.td}>사업장</td>
                <td className={classes.tdBody} colSpan="5">
                  {work_cust_nm}
                </td>
              </tr>
              <tr className={classes.tr}>
                <td className={classes.td}>유형</td>
                <td className={classes.tdBody} colSpan="5">
                  {bad_cls_nm}
                </td>
              </tr>
              <tr className={classes.tr}>
                <td className={classes.td}>
                  <span>
                    고객사
                    <br />
                    담당자
                  </span>
                </td>
                <td className={classes.tdBody} colSpan="5">
                  {cust_nm}
                </td>
              </tr>
              <tr className={classes.tr} style={{ height: "70px" }}>
                <td className={classes.td} style={{ height: "70px" }}>
                  내용
                </td>
                <td
                  className={classes.tdBody}
                  style={{ whiteSpace: "normal", height: "70px" }}
                  colSpan="5"
                >
                  {claim_contents}
                </td>
              </tr>

              {itemList.length !== 0 && itemList.DATA.COIL_NO1 !== null && (
                <tr className={classes.tr}>
                  <td className={classes.td}>소재번호</td>
                  <td className={classes.tdBody}>{itemList.DATA.COIL_NO1}</td>
                  <td className={classes.td}>중량</td>
                  <td className={classes.tdBody}>
                    {itemList.DATA.COIL_WEIGHT1}
                  </td>
                  <td className={classes.td}>SIZE</td>
                  <td className={classes.tdBody} style={{ fontSize: "14px" }}>
                    {itemList.DATA.CO_SIZE1_NO}
                  </td>
                </tr>
              )}

              {itemList.length !== 0 && itemList.DATA.COIL_NO2 !== null && (
                <tr className={classes.tr}>
                  <td className={classes.td}>소재번호</td>
                  <td className={classes.tdBody}>{itemList.DATA.COIL_NO2}</td>
                  <td className={classes.td}>중량</td>
                  <td className={classes.tdBody}>
                    {itemList.DATA.COIL_WEIGHT2}
                  </td>
                  <td className={classes.td}>SIZE</td>
                  <td className={classes.tdBody} style={{ fontSize: "14px" }}>
                    {itemList.DATA.CO_SIZE2_NO}
                  </td>
                </tr>
              )}

              {itemList.length !== 0 && itemList.DATA.COIL_NO3 !== null && (
                <tr className={classes.tr}>
                  <td className={classes.td}>소재번호</td>
                  <td className={classes.tdBody}>{itemList.DATA.COIL_NO3}</td>
                  <td className={classes.td}>중량</td>
                  <td className={classes.tdBody}>
                    {itemList.DATA.COIL_WEIGHT3}
                  </td>
                  <td className={classes.td}>SIZE</td>
                  <td className={classes.tdBody} style={{ fontSize: "14px" }}>
                    {itemList.DATA.CO_SIZE3_NO}
                  </td>
                </tr>
              )}

              {itemList.length !== 0 && itemList.DATA.COIL_NO4 !== null && (
                <tr className={classes.tr}>
                  <td className={classes.td}>소재번호</td>
                  <td className={classes.tdBody}>{itemList.DATA.COIL_NO4}</td>
                  <td className={classes.td}>중량</td>
                  <td className={classes.tdBody}>
                    {itemList.DATA.COIL_WEIGHT4}
                  </td>
                  <td className={classes.td}>SIZE</td>
                  <td className={classes.tdBody} style={{ fontSize: "14px" }}>
                    {itemList.DATA.CO_SIZE4_NO}
                  </td>
                </tr>
              )}

              {itemList.length !== 0 && itemList.DATA.COIL_NO5 !== null && (
                <tr className={classes.tr}>
                  <td className={classes.td}>소재번호</td>
                  <td className={classes.tdBody}>{itemList.DATA.COIL_NO5}</td>
                  <td className={classes.td}>중량</td>
                  <td className={classes.tdBody}>
                    {itemList.DATA.COIL_WEIGHT5}
                  </td>
                  <td className={classes.td}>SIZE</td>
                  <td className={classes.tdBody} style={{ fontSize: "14px" }}>
                    {itemList.DATA.CO_SIZE5_NO}
                  </td>
                </tr>
              )}
              <tr>
                <td className={classes.td}>사진</td>
                <td className={classes.tdBody} colSpan="5">
                  {itemList.length !== 0 && itemList.IMAGE[0] !== undefined ? (
                    <img
                      width="100%"
                      height="200px"
                      src={"data:image/png;base64," + itemList.IMAGE[0]}
                      alt={"사진"}
                      onClick={() => handlePictureOpen(0)}
                    ></img>
                  ) : (
                    <div>등록한 사진이 없습니다.</div>
                  )}
                </td>
              </tr>
              <tr>
                <td className={classes.tdBody} colSpan="6">
                  {itemList.length !== 0 && itemList.IMAGE[1] !== undefined ? (
                    <img
                      width="100%"
                      height="200px"
                      src={"data:image/png;base64," + itemList.IMAGE[1]}
                      alt={"사진"}
                      onClick={() => handlePictureOpen(1)}
                    ></img>
                  ) : (
                    <div></div>
                  )}
                </td>
              </tr>
              <tr>
                <td className={classes.tdBody} colSpan="6">
                  {itemList.length !== 0 && itemList.IMAGE[2] !== undefined ? (
                    <img
                      width="100%"
                      height="200px"
                      src={"data:image/png;base64," + itemList.IMAGE[2]}
                      alt={"사진"}
                      onClick={() => handlePictureOpen(2)}
                    ></img>
                  ) : (
                    <div></div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          <div style={{ marginBottom: "35px" }}> </div>
        </>

        {maker_id === window.sessionStorage.getItem("user_id") && (
          <table
            style={{
              width: "100%",
              position: "fixed",
              bottom: 0,
              borderCollapse: "separate",
            }}
          >
            <tbody>
              <tr>
                <td style={{ width: "50%" }}>
                  <Button
                    fullWidth
                    style={{
                      backgroundColor: "#24292E",
                      color: "#FFF",
                    }}
                    variant="contained"
                    onClick={() => {
                      handleModifyDetail();
                    }}
                  >
                    수정하기
                  </Button>
                </td>
                <td style={{ width: "50%" }}>
                  <Button
                    fullWidth
                    style={{
                      backgroundColor: "#538CBD",
                      color: "#FFF",
                    }}
                    variant="contained"
                    onClick={() => {
                      handleClaimDelete();
                    }}
                  >
                    삭제
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </Drawer>

      {pictureOpen === true && (
        <PictureDetail
          open={pictureOpen}
          onClose={handlePictureClose}
          imgSrc={imgSrc}
        />
      )}

      {modifyOpen === true && (
        <Menu4Modify
          open={modifyOpen}
          onClose={handleModifyClose}
          data={itemList}
        />
      )}
    </>
  );
}
export default React.memo(Menu4_Detail);
