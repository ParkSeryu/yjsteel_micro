import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import CloseIcon from "@material-ui/icons/Close";

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

function DetailPage() {
  const classes = useStyles();

  return (
    <div id="modal" style={{ display: "none" }} className="modal">
      <div className="modalBox">
        <AppBar className={classes.AppBar}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              onClick={() => {
                document.getElementById("modal").style.display = "none";
                document.body.style.touchAction = "auto";
              }}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" id="detailTitle" className={classes.title}>
              제품재고현황
            </Typography>
          </Toolbar>
        </AppBar>

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
              <td className={classes.td}>사업장</td>
              <td className={classes.tdBody} colSpan="5" id="work_cust_nm">
                사업장
              </td>
            </tr>
            <tr className={classes.tr}>
              <td className={classes.td}>하치장</td>
              <td className={classes.tdBody} colSpan="5" id="yard_cust_nm">
                하치장
              </td>
            </tr>
            <tr className={classes.tr}>
              <td className={classes.td}>소유</td>
              <td className={classes.tdBody} colSpan="5" id="im_cls">
                소유
              </td>
            </tr>
            <tr className={classes.tr}>
              <td className={classes.td}>생산일</td>
              <td className={classes.tdBody} colSpan="5" id="in_date">
                생산일
              </td>
            </tr>
            <tr className={classes.tr}>
              <td className={classes.td}>코일번호</td>
              <td className={classes.tdBody} colSpan="5" id="coil_no">
                코일번호
              </td>
            </tr>
            <tr className={classes.tr}>
              <td className={classes.td}>포장번호</td>
              <td className={classes.tdBody} colSpan="5" id="pack_no">
                포장번호
              </td>
            </tr>
            <tr className={classes.tr}>
              <td className={classes.td}>품명</td>
              <td className={classes.tdBody} id="name_nm">
                품명
              </td>
              <td className={classes.td}>재질</td>
              <td className={classes.tdBody} colSpan="3" id="stan_nm">
                재질
              </td>
            </tr>
            <tr className={classes.tr}>
              <td className={classes.td}>사이즈</td>
              <td className={classes.tdBody} colSpan="2" id="size_no">
                사이즈
              </td>
              <td className={classes.td}>적재위치</td>
              <td className={classes.tdBody} colSpan="2" id="pos_nm">
                적재위치
              </td>
            </tr>
            <tr className={classes.tr}>
              <td className={classes.td}>수요가명</td>
              <td className={classes.tdBody} colSpan="5" id="sell_cust_nm">
                수요가명
              </td>
            </tr>
            <tr className={classes.tr}>
              <td className={classes.td}>수량</td>
              <td className={classes.tdBody} id="stock_quantity">
                수량
              </td>
              <td className={classes.td}>가용중량</td>
              <td className={classes.tdBody} colSpan="3" id="stock_weight">
                가용중량
              </td>
            </tr>
            <tr className={classes.tr}>
              <td className={classes.td}></td>
              <td className={classes.td}></td>
              <td className={classes.td}>재고중량</td>
              <td className={classes.tdBody} id="stock_weight_day" colSpan="3">
                재고중량
              </td>
            </tr>
            <tr className={classes.tr}>
              <td className={classes.td}>길이</td>
              <td className={classes.tdBody} colSpan="5" id="stock_coil_length">
                길이
              </td>
            </tr>
            <tr className={classes.tr}>
              <td className={classes.td}>매입구분</td>
              <td className={classes.tdBody} id="buy_type_nm">
                매입구분
              </td>
              <td className={classes.td}>매입처</td>
              <td className={classes.tdBody} colSpan="3" id="buy_cust_nm">
                매입처
              </td>
            </tr>
            <tr className={classes.tr}>
              <td className={classes.td}>매입단가</td>
              <td className={classes.tdBody} id="buy_unit_price">
                매입단가
              </td>
              <td className={classes.td}>불량유형</td>
              <td className={classes.tdBody} colSpan="3" id="bad_type_nm">
                불량유형
              </td>
            </tr>
            <tr className={classes.tr}>
              <td className={classes.td}>컬러</td>
              <td className={classes.tdBody} colSpan="5" id="color_nm">
                컬러
              </td>
            </tr>
            <tr className={classes.tr}>
              <td className={classes.td}>C</td>
              <td className={classes.tdBody} id="C">
                C
              </td>
              <td className={classes.td}>Si</td>
              <td className={classes.tdBody} id="Si">
                Si
              </td>
              <td className={classes.td}>Mn</td>
              <td className={classes.tdBody} id="Mn">
                Mn
              </td>
            </tr>
            <tr className={classes.tr}>
              <td className={classes.td}>YP</td>
              <td className={classes.tdBody} id="YP">
                YP
              </td>
              <td className={classes.td}>TS</td>
              <td className={classes.tdBody} id="TS">
                TS
              </td>
              <td className={classes.td}>EL</td>
              <td className={classes.tdBody} id="EL">
                EL
              </td>
            </tr>
            <tr className={classes.tr}>
              <td className={classes.td}>비고</td>
              <td className={classes.tdBody} colSpan="5" id="remark">
                비고
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default React.memo(DetailPage);
