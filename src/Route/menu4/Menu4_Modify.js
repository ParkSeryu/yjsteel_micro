import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";
import format from "date-fns/format";
import AddBoxIcon from "@mui/icons-material/AddBox";
import koLocale from "date-fns/locale/ko";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import CustomDialogSearch from "../../components/CustomDialogSearch";
import CustomDialogOnlySelect from "../../components/CustomDialogOnlySelect";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import CustomToolbarSelectedOne from "../../components/CustomToolbar_selected_one";
import Divider from "@material-ui/core/Divider";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#ABADB3",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { color: "#ABADB3" },
      "&.Mui-focused fieldset": {
        borderColor: "rgba(0, 176, 246, 1)",
      },
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(6),
  },

  td: {
    padding: "1vw",
  },

  coilTextField: {
    width: "30vw",
  },

  sizeTextField: {
    width: "15vw",
  },

  weightTextField: {
    width: "20vw",
  },

  spanVerticalAlign: {
    padding: "0px 5px",
  },

  title: {
    fontFamily: "NanumGothic",
    marginTop: "5px",
  },

  line: {
    marginBottom: "125px",
  },

  span: {
    fontSize: "16px",
    whiteSpace: "nowrap",
    overflowX: "hidden",
  },

  table: {
    width: "100%",
    padding: "1vw",
    borderSpacing: "0 5px",
    marginLeft: "-6px",
  },

  datePicker: {
    visibility: "hidden",
  },

  buttons: {
    position: "absolute",
    top: "-65%",
    left: "75%",
  },

  label: {
    display: "block",
    color: "#000",
    backgroundColor: "#f6f6f6",
    lineHeight: "200px",
    width: "100%",
    margin: "5px 0px",
    height: "200px",
    textAlign: "center",
  },

  img: {
    width: "100%",
    height: "200px",
    margin: "5px 0px",
  },

  input: {
    position: "absolute",
    width: 0,
    height: 0,
    padding: 0,
    overflow: "hidden",
    border: 0,
  },
}));

class koLocalizedUtils extends DateFnsUtils {
  getCalendarHeaderText(date) {
    return format(date, "yyyy년　　 MM월", { locale: this.locale });
  }
}

const DateToString = (date) => {
  let year = date.getFullYear();
  let month = 1 + date.getMonth();
  month = month >= 10 ? month : "0" + month;
  let day = date.getDate();
  day = day >= 10 ? day : "0" + day;
  return year + "/" + month + "/" + day;
};

const nullCheck = (text) => {
  if (text === null) return "";
  else return text;
};

function Menu4_Modify({ open, onClose, data }) {
  const classes = useStyles();
  window.addEventListener("checkBackFlag", funCheckDialogFlag, {
    once: true,
  });

  console.log(data);

  useEffect(() => {
    setTimeout(() => {
      document.getElementById("claim_contents").value =
        data.DATA.CLAIM_CONTENTS;
    }, 100);
  }, []);

  function funCheckDialogFlag() {
    let count = 0;
    if (count === 0) {
      if (openDialogSearch) {
        setOpenDialogSearch(false);
        console.log("dialog");
        count = count + 1;
      }
      if (openDialogOnlySelect) {
        setOpenDialogOnlySelect(false);
        console.log("onlySelectDialog");
        count = count + 1;
      }
    }
    window.sessionStorage.setItem("closeFlag", count);
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

  const [inputs, setInputs] = useState({
    claim_date: data.DATA.CLAIM_DATE.replaceAll(".", "/"),
    claim_no: data.DATA.CLAIM_NO,
    cust_cd: data.DATA.SELL_CUST_CD,
    cust_nm: data.DATA.SELL_CUST,
    work_cust_cd: data.DATA.WORK_CUST_CD,
    work_cust_nm: data.DATA.WORK_CUST_NM,
    bad_cls: data.DATA.BAD_CD,
    bad_cls_nm: data.DATA.BAD_CLS_NM,
    maker_nm: data.DATA.CUST_NM,
    coil_no1: nullCheck(data.DATA.COIL_NO1),
    coil_weight1: data.DATA.COIL_WEIGHT1,
    coil_size1_1: data.DATA.CO_SIZE1_1,
    coil_size1_2: data.DATA.CO_SIZE1_2,
    coil_size1_3: data.DATA.CO_SIZE1_3,
    coil_no2: nullCheck(data.DATA.COIL_NO2),
    coil_weight2: data.DATA.COIL_WEIGHT2,
    coil_size2_1: data.DATA.CO_SIZE2_1,
    coil_size2_2: data.DATA.CO_SIZE2_2,
    coil_size2_3: data.DATA.CO_SIZE2_3,
    coil_no3: nullCheck(data.DATA.COIL_NO3),
    coil_weight3: data.DATA.COIL_WEIGHT3,
    coil_size3_1: data.DATA.CO_SIZE3_1,
    coil_size3_2: data.DATA.CO_SIZE3_1,
    coil_size3_3: data.DATA.CO_SIZE3_1,
    coil_no4: nullCheck(data.DATA.COIL_NO4),
    coil_weight4: data.DATA.COIL_WEIGHT4,
    coil_size4_1: data.DATA.CO_SIZE4_1,
    coil_size4_2: data.DATA.CO_SIZE4_1,
    coil_size4_3: data.DATA.CO_SIZE4_1,
    coil_no5: nullCheck(data.DATA.COIL_NO5),
    coil_weight5: data.DATA.COIL_WEIGHT5,
    coil_size5_1: data.DATA.CO_SIZE5_1,
    coil_size5_2: data.DATA.CO_SIZE5_1,
    coil_size5_3: data.DATA.CO_SIZE5_1,
    claim_img_0:
      data.IMAGE[0] !== undefined
        ? "data:image/png;base64," + data.IMAGE[0]
        : "", // 이미지
    claim_img_1:
      data.IMAGE[1] !== undefined
        ? "data:image/png;base64," + data.IMAGE[1]
        : "",
    claim_img_2:
      data.IMAGE[2] !== undefined
        ? "data:image/png;base64," + data.IMAGE[2]
        : "",
  });

  const {
    claim_date,
    claim_no,
    bad_cls,
    cust_cd,
    cust_nm,
    bad_cls_nm,
    work_cust_cd,
    work_cust_nm,
    maker_nm,
    coil_no1,
    coil_weight1,
    coil_size1_1,
    coil_size1_2,
    coil_size1_3,
    coil_no2,
    coil_weight2,
    coil_size2_1,
    coil_size2_2,
    coil_size2_3,
    coil_no3,
    coil_weight3,
    coil_size3_1,
    coil_size3_2,
    coil_size3_3,
    coil_no4,
    coil_weight4,
    coil_size4_1,
    coil_size4_2,
    coil_size4_3,
    coil_no5,
    coil_weight5,
    coil_size5_1,
    coil_size5_2,
    coil_size5_3,
    claim_img_0,
    claim_img_1,
    claim_img_2,
  } = inputs;
  const [codeKind, setCodeKind] = React.useState("");
  const [codeListSearch, setCodeListSearch] = React.useState([]);
  const [codeListDataOnlySelect, setCodeListDataOnlySelect] = React.useState(
    []
  );
  const [openDialogSearch, setOpenDialogSearch] = useState(false);
  const [openDialogOnlySelect, setOpenDialogOnlySelect] = useState(false);
  const [openCalendar, setOpenCalendar] = React.useState(false);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleClickOpenSearch = (code_kind) => {
    setCodeKind(code_kind);
    if (code_kind === "cust_cd") {
      setCodeListSearch(
        JSON.parse(window.sessionStorage.getItem("cust_cd_list"))
      );
    } else if (code_kind === "maker_cd") {
      setCodeListSearch(
        JSON.parse(window.sessionStorage.getItem("emp_cd_list"))
      );
    }
    setOpenDialogSearch(true);
  };

  const handleClickOpenOnlySelect = (code_kind) => {
    setCodeKind(code_kind);
    if (code_kind === "bad_cls") {
      setCodeListDataOnlySelect([
        { CODE_CD: "1", CODE_NAME: "원재료" },
        { CODE_CD: "2", CODE_NAME: "작업" },
        { CODE_CD: "3", CODE_NAME: "보관" },
        { CODE_CD: "4", CODE_NAME: "운반" },
      ]);
    } else if (code_kind === "work_cust_cd") {
      setCodeListDataOnlySelect([
        { CODE_CD: "YJ004", CODE_NAME: "영진철강(주)" },
        { CODE_CD: "ES014", CODE_NAME: "(주)에스에이" },
      ]);
    }

    setOpenDialogOnlySelect(true);
  };

  const handleClickOpenCalendar = () => {
    setOpenCalendar(!openCalendar);
  };

  const handleCloseSearch = (codeName, codeCd) => {
    if (codeCd === undefined) {
      codeName = "";
      codeCd = "";
    }

    if (codeName !== "exit")
      if (codeKind === "cust_cd") {
        setInputs({ ...inputs, cust_cd: codeCd, cust_nm: codeName });
      } else if (codeKind === "maker_cd") {
        setInputs({ ...inputs, maker_cd: codeCd, maker_nm: codeName });
      }

    setOpenDialogSearch(false);
  };

  const handleCloseOnlySelect = (codeName, codeCd) => {
    if (codeCd === undefined) {
      codeName = "";
      codeCd = "";
    }

    if (codeName !== "exit")
      if (codeKind === "bad_cls") {
        setInputs({ ...inputs, bad_cls: codeCd, bad_cls_nm: codeName });
      } else if (codeKind === "work_cust_cd") {
        setInputs({ ...inputs, work_cust_cd: codeCd, work_cust_nm: codeName });
      }

    setOpenDialogOnlySelect(false);
  };

  const handleFileOnChange = (event, flag) => {
    event.preventDefault();
    console.log(flag);
    let reader = new FileReader();
    let file = event.target.files[0];
    if (file !== undefined) {
      if (flag === "img_0") {
        reader.onloadend = () => {
          setInputs({
            ...inputs,
            claim_img_0: reader.result,
          });
        };
        reader.readAsDataURL(file);
      }
      if (flag === "img_1") {
        reader.onloadend = () => {
          setInputs({
            ...inputs,
            claim_img_1: reader.result,
          });
        };
        reader.readAsDataURL(file);
      }
      if (flag === "img_2") {
        reader.onloadend = () => {
          setInputs({
            ...inputs,
            claim_img_2: reader.result,
          });
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleClaimReg = () => {
    document.getElementById("detail_loading_circle").style.display = "block";
    let form = new FormData();
    form.append("claim_no", claim_no);
    form.append("bad_cls", bad_cls);
    form.append(
      "claim_contents",
      document.getElementById("claim_contents").value
    );
    form.append("claim_date", claim_date.replaceAll("/", ""));
    form.append("cust_man_cd", maker_nm);
    form.append("maker_id", window.sessionStorage.getItem("user_id"));
    form.append("sell_cust_cd", cust_cd);
    form.append("coil_no1", coil_no1);
    form.append("coil_weight1", coil_weight1);
    form.append("size1_1", coil_size1_1);
    form.append("size1_2", coil_size1_2);
    form.append("size1_3", coil_size1_3);
    form.append("coil_no2", coil_no2);
    form.append("coil_weight2", coil_weight2);
    form.append("size2_1", coil_size2_1);
    form.append("size2_2", coil_size2_2);
    form.append("size2_3", coil_size2_3);
    form.append("coil_no3", coil_no3);
    form.append("coil_weight3", coil_weight3);
    form.append("size3_1", coil_size3_1);
    form.append("size3_2", coil_size3_2);
    form.append("size3_3", coil_size3_3);
    form.append("coil_no4", coil_no4);
    form.append("coil_weight4", coil_weight4);
    form.append("size4_1", coil_size4_1);
    form.append("size4_2", coil_size4_2);
    form.append("size4_3", coil_size4_3);
    form.append("coil_no5", coil_no5);
    form.append("coil_weight5", coil_weight5);
    form.append("size5_1", coil_size5_1);
    form.append("size5_2", coil_size5_2);
    form.append("size5_3", coil_size5_3);
    form.append("work_cust_cd", work_cust_cd);
    form.append("claim_img_base64_0", claim_img_0);
    form.append("claim_img_base64_1", claim_img_1);
    form.append("claim_img_base64_2", claim_img_2);
    axios
      .post(
        "http://121.165.242.72:5050/yjsteel/Developer/index.php/Menu4/claimReg",
        form
      )
      .then((response) => {
        console.log(response);
        document.getElementById("detail_loading_circle").style.display = "none";
        alert("클레임 수정완료");
        onClose("retrieve");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullScreen>
        <AppBar
          style={{
            backgroundColor: "#DADCE0",
            color: "#000000",
            height: "55px",
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              style={{ marginLeft: "0px" }}
              onClick={() => handleClose()}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" id="detailTitle" className={classes.title}>
              클레임 수정
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.grow}>
          <Container className={classes.root}>
            <table className={classes.table}>
              <colgroup>
                <col width="20%" />
                <col />
              </colgroup>
              <tbody>
                <tr>
                  <td className={classes.td} align="right">
                    <span className={classes.span}>등록일</span>
                  </td>
                  <td className={classes.td}>
                    <CssTextField
                      name="claim_date"
                      size="small"
                      placeholder="선택"
                      style={{ width: "30vw" }}
                      onClick={() => handleClickOpenCalendar("date")}
                      value={claim_date}
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <span style={{ paddingLeft: "10px" }}>
                      {window.sessionStorage.getItem("user_name")}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className={classes.td} align="right">
                    <span className={classes.span}>거래처</span>
                  </td>
                  <td className={classes.td}>
                    <CssTextField
                      name="cust_nm"
                      placeholder="선택"
                      fullWidth
                      size="small"
                      onChange={handleOnChange}
                      className={classes.textField}
                      value={cust_nm}
                      variant="outlined"
                      onClick={() => handleClickOpenSearch("cust_cd")}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className={classes.td} align="right">
                    <span className={classes.span}>사업장</span>
                  </td>
                  <td className={classes.td} align="center">
                    <CssTextField
                      name="work_cust_nm"
                      placeholder="선택"
                      fullWidth
                      size="small"
                      onChange={handleOnChange}
                      onClick={() => handleClickOpenOnlySelect("work_cust_cd")}
                      className={classes.textField}
                      value={work_cust_nm}
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className={classes.td} align="right">
                    <span className={classes.span}>유형</span>
                  </td>
                  <td className={classes.td}>
                    <CssTextField
                      placeholder="선택"
                      name="bad_cls"
                      fullWidth
                      size="small"
                      onChange={handleOnChange}
                      value={bad_cls_nm}
                      variant="outlined"
                      onClick={() => handleClickOpenOnlySelect("bad_cls")}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className={classes.td} align="right">
                    <span className={classes.span}>
                      고객사
                      <br />
                      담당자
                    </span>
                  </td>
                  <td className={classes.td}>
                    <CssTextField
                      name="maker_nm"
                      placeholder="선택"
                      fullWidth
                      size="small"
                      onChange={handleOnChange}
                      onClick={() => handleClickOpenSearch("maker_cd")}
                      className={classes.textField}
                      value={maker_nm}
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              id="coil_1"
              style={
                coil_no1 === "" ? { display: "none" } : { display: "block" }
              }
            >
              <tbody>
                <tr>
                  <td className={classes.td} align="right">
                    <span className={classes.span}>소재번호</span>
                  </td>
                  <td className={classes.td}>
                    <CssTextField
                      name="coil_no1"
                      onChange={handleOnChange}
                      size="small"
                      className={classes.coilTextField}
                      variant="outlined"
                      value={coil_no1}
                    />
                  </td>
                  <td className={classes.td} align="right">
                    <span className={classes.span}>중량</span>
                  </td>
                  <td className={classes.td}>
                    <CssTextField
                      name="coil_weight1"
                      onChange={handleOnChange}
                      size="small"
                      className={classes.weightTextField}
                      variant="outlined"
                      value={coil_weight1}
                      inputProps={{
                        inputMode: "numeric",
                        style: { textAlign: "center" },
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className={classes.td} align="right">
                    <span className={classes.span}>SIZE</span>
                  </td>
                  <td colSpan="3" className={classes.td}>
                    <CssTextField
                      placeholder="0.0"
                      name="coil_size1_1"
                      onChange={handleOnChange}
                      size="small"
                      className={classes.sizeTextField}
                      variant="outlined"
                      value={coil_size1_1}
                      inputProps={{
                        inputMode: "numeric",
                        style: { textAlign: "center" },
                      }}
                    />
                    <span className={classes.spanVerticalAlign}>x</span>
                    <CssTextField
                      placeholder="0.0"
                      name="coil_size1_2"
                      onChange={handleOnChange}
                      size="small"
                      className={classes.sizeTextField}
                      variant="outlined"
                      value={coil_size1_2}
                      inputProps={{
                        inputMode: "numeric",
                        style: { textAlign: "center" },
                      }}
                    />
                    <span className={classes.spanVerticalAlign}>x</span>
                    <CssTextField
                      placeholder="0.0"
                      name="coil_size1_3"
                      onChange={handleOnChange}
                      size="small"
                      className={classes.sizeTextField}
                      variant="outlined"
                      value={coil_size1_3}
                      inputProps={{
                        inputMode: "numeric",
                        style: { textAlign: "center" },
                      }}
                    />
                    <IconButton
                      color="primary"
                      className={classes.button}
                      onClick={() => {
                        document.getElementById("coil_1").style.display =
                          "none";
                        setInputs({
                          ...inputs,
                          coil_no1: "",
                          coil_weight1: "",
                          coil_size1_1: "",
                          coil_size1_2: "",
                          coil_size1_3: "",
                        });
                      }}
                    >
                      <IndeterminateCheckBoxIcon />
                    </IconButton>
                  </td>
                </tr>
              </tbody>
            </table>
            <Divider />
            <table
              id="coil_2"
              style={
                coil_no2 === "" ? { display: "none" } : { display: "block" }
              }
            >
              <tbody>
                <tr>
                  <td className={classes.td} align="right">
                    <span className={classes.span}>소재번호</span>
                  </td>
                  <td className={classes.td}>
                    <CssTextField
                      name="coil_no2"
                      onChange={handleOnChange}
                      size="small"
                      className={classes.coilTextField}
                      variant="outlined"
                      value={coil_no2}
                    />
                  </td>
                  <td className={classes.td} align="right">
                    <span className={classes.span}>중량</span>
                  </td>
                  <td className={classes.td}>
                    <CssTextField
                      name="coil_weight2"
                      onChange={handleOnChange}
                      size="small"
                      className={classes.weightTextField}
                      variant="outlined"
                      value={coil_weight2}
                      inputProps={{
                        inputMode: "numeric",
                        style: { textAlign: "center" },
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className={classes.td} align="right">
                    <span className={classes.span}>SIZE</span>
                  </td>
                  <td colSpan="3" className={classes.td}>
                    <CssTextField
                      placeholder="0.0"
                      name="coil_size2_1"
                      onChange={handleOnChange}
                      size="small"
                      className={classes.sizeTextField}
                      variant="outlined"
                      value={coil_size2_1}
                      inputProps={{
                        inputMode: "numeric",
                        style: { textAlign: "center" },
                      }}
                    />
                    <span className={classes.spanVerticalAlign}>x</span>
                    <CssTextField
                      placeholder="0.0"
                      name="coil_size2_2"
                      onChange={handleOnChange}
                      size="small"
                      className={classes.sizeTextField}
                      variant="outlined"
                      value={coil_size2_2}
                      inputProps={{
                        inputMode: "numeric",
                        style: { textAlign: "center" },
                      }}
                    />
                    <span className={classes.spanVerticalAlign}>x</span>
                    <CssTextField
                      placeholder="0.0"
                      name="coil_size2_3"
                      onChange={handleOnChange}
                      size="small"
                      className={classes.sizeTextField}
                      variant="outlined"
                      value={coil_size2_3}
                      inputProps={{
                        inputMode: "numeric",
                        style: { textAlign: "center" },
                      }}
                    />
                    <IconButton
                      color="primary"
                      className={classes.button}
                      onClick={() => {
                        setInputs({
                          ...inputs,
                          coil_no2: "",
                          coil_weight2: "",
                          coil_size2_1: "",
                          coil_size2_2: "",
                          coil_size2_3: "",
                        });
                        document.getElementById("coil_2").style.display =
                          "none";
                      }}
                    >
                      <IndeterminateCheckBoxIcon />
                    </IconButton>
                  </td>
                </tr>
              </tbody>
              <Divider />
            </table>
            <table
              id="coil_3"
              style={
                coil_no3 === "" ? { display: "none" } : { display: "block" }
              }
            >
              <tbody>
                <tr>
                  <td className={classes.td} align="right">
                    <span className={classes.span}>소재번호</span>
                  </td>
                  <td className={classes.td}>
                    <CssTextField
                      name="coil_no3"
                      onChange={handleOnChange}
                      size="small"
                      className={classes.coilTextField}
                      variant="outlined"
                      value={coil_no3}
                    />
                  </td>
                  <td className={classes.td} align="right">
                    <span className={classes.span}>중량</span>
                  </td>
                  <td className={classes.td}>
                    <CssTextField
                      name="coil_weight3"
                      onChange={handleOnChange}
                      size="small"
                      className={classes.weightTextField}
                      variant="outlined"
                      value={coil_weight3}
                      inputProps={{
                        inputMode: "numeric",
                        style: { textAlign: "center" },
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className={classes.td} align="right">
                    <span className={classes.span}>SIZE</span>
                  </td>
                  <td colSpan="3" className={classes.td}>
                    <CssTextField
                      placeholder="0.0"
                      name="coil_size3_1"
                      onChange={handleOnChange}
                      size="small"
                      className={classes.sizeTextField}
                      variant="outlined"
                      value={coil_size3_1}
                      inputProps={{
                        inputMode: "numeric",
                        style: { textAlign: "center" },
                      }}
                    />
                    <span className={classes.spanVerticalAlign}>x</span>
                    <CssTextField
                      placeholder="0.0"
                      name="coil_size3_2"
                      onChange={handleOnChange}
                      size="small"
                      className={classes.sizeTextField}
                      variant="outlined"
                      value={coil_size3_2}
                      inputProps={{
                        inputMode: "numeric",
                        style: { textAlign: "center" },
                      }}
                    />
                    <span className={classes.spanVerticalAlign}>x</span>
                    <CssTextField
                      placeholder="0.0"
                      name="coil_size3_3"
                      onChange={handleOnChange}
                      size="small"
                      className={classes.sizeTextField}
                      variant="outlined"
                      value={coil_size3_3}
                      inputProps={{
                        inputMode: "numeric",
                        style: { textAlign: "center" },
                      }}
                    />
                    <IconButton
                      color="primary"
                      className={classes.button}
                      onClick={() => {
                        document.getElementById("coil_3").style.display =
                          "none";
                        setInputs({
                          ...inputs,
                          coil_no3: "",
                          coil_weight3: "",
                          coil_size3_1: "",
                          coil_size3_2: "",
                          coil_size3_3: "",
                        });
                      }}
                    >
                      <IndeterminateCheckBoxIcon />
                    </IconButton>
                  </td>
                </tr>
              </tbody>
              <Divider />
            </table>
            <table
              id="coil_4"
              style={
                coil_no4 === "" ? { display: "none" } : { display: "block" }
              }
            >
              <tbody>
                <tr>
                  <td className={classes.td} align="right">
                    <span className={classes.span}>소재번호</span>
                  </td>
                  <td className={classes.td}>
                    <CssTextField
                      name="coil_no4"
                      onChange={handleOnChange}
                      size="small"
                      className={classes.coilTextField}
                      variant="outlined"
                      value={coil_no4}
                    />
                  </td>
                  <td className={classes.td} align="right">
                    <span className={classes.span}>중량</span>
                  </td>
                  <td className={classes.td}>
                    <CssTextField
                      name="coil_weight4"
                      onChange={handleOnChange}
                      size="small"
                      className={classes.weightTextField}
                      variant="outlined"
                      value={coil_weight4}
                      inputProps={{
                        inputMode: "numeric",
                        style: { textAlign: "center" },
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className={classes.td} align="right">
                    <span className={classes.span}>SIZE</span>
                  </td>
                  <td colSpan="3" className={classes.td}>
                    <CssTextField
                      placeholder="0.0"
                      name="coil_size4_1"
                      onChange={handleOnChange}
                      size="small"
                      className={classes.sizeTextField}
                      variant="outlined"
                      value={coil_size4_1}
                      inputProps={{
                        inputMode: "numeric",
                        style: { textAlign: "center" },
                      }}
                    />
                    <span className={classes.spanVerticalAlign}>x</span>
                    <CssTextField
                      placeholder="0.0"
                      name="coil_size4_2"
                      onChange={handleOnChange}
                      size="small"
                      className={classes.sizeTextField}
                      variant="outlined"
                      value={coil_size4_2}
                      inputProps={{
                        inputMode: "numeric",
                        style: { textAlign: "center" },
                      }}
                    />
                    <span className={classes.spanVerticalAlign}>x</span>
                    <CssTextField
                      placeholder="0.0"
                      name="coil_size4_3"
                      onChange={handleOnChange}
                      size="small"
                      className={classes.sizeTextField}
                      variant="outlined"
                      value={coil_size4_3}
                      inputProps={{
                        inputMode: "numeric",
                        style: { textAlign: "center" },
                      }}
                    />
                    <IconButton
                      color="primary"
                      className={classes.button}
                      onClick={() => {
                        document.getElementById("coil_4").style.display =
                          "none";
                        setInputs({
                          ...inputs,
                          coil_no4: "",
                          coil_weight4: "",
                          coil_size4_1: "",
                          coil_size4_2: "",
                          coil_size4_3: "",
                        });
                      }}
                    >
                      <IndeterminateCheckBoxIcon />
                    </IconButton>
                  </td>
                </tr>
              </tbody>
              <Divider />
            </table>
            <table
              id="coil_5"
              style={
                coil_no5 === "" ? { display: "none" } : { display: "block" }
              }
            >
              <tbody>
                <tr>
                  <td className={classes.td} align="right">
                    <span className={classes.span}>소재번호</span>
                  </td>
                  <td className={classes.td}>
                    <CssTextField
                      name="coil_no5"
                      onChange={handleOnChange}
                      size="small"
                      className={classes.coilTextField}
                      variant="outlined"
                      value={coil_no5}
                    />
                  </td>
                  <td className={classes.td} align="right">
                    <span className={classes.span}>중량</span>
                  </td>
                  <td className={classes.td}>
                    <CssTextField
                      name="coil_weight5"
                      onChange={handleOnChange}
                      size="small"
                      className={classes.weightTextField}
                      variant="outlined"
                      value={coil_weight5}
                      inputProps={{
                        inputMode: "numeric",
                        style: { textAlign: "center" },
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className={classes.td} align="right">
                    <span className={classes.span}>SIZE</span>
                  </td>
                  <td colSpan="3" className={classes.td}>
                    <CssTextField
                      placeholder="0.0"
                      name="coil_size5_1"
                      onChange={handleOnChange}
                      size="small"
                      className={classes.sizeTextField}
                      variant="outlined"
                      value={coil_size5_1}
                      inputProps={{
                        inputMode: "numeric",
                        style: { textAlign: "center" },
                      }}
                    />
                    <span className={classes.spanVerticalAlign}>x</span>
                    <CssTextField
                      placeholder="0.0"
                      name="coil_size5_2"
                      onChange={handleOnChange}
                      size="small"
                      className={classes.sizeTextField}
                      variant="outlined"
                      value={coil_size5_2}
                      inputProps={{
                        inputMode: "numeric",
                        style: { textAlign: "center" },
                      }}
                    />
                    <span className={classes.spanVerticalAlign}>x</span>
                    <CssTextField
                      placeholder="0.0"
                      name="coil_size5_3"
                      onChange={handleOnChange}
                      size="small"
                      className={classes.sizeTextField}
                      variant="outlined"
                      value={coil_size5_3}
                      inputProps={{
                        inputMode: "numeric",
                        style: { textAlign: "center" },
                      }}
                    />
                    <IconButton
                      color="primary"
                      className={classes.button}
                      onClick={() => {
                        document.getElementById("coil_5").style.display =
                          "none";
                        setInputs({
                          ...inputs,
                          coil_no5: "",
                          coil_weight5: "",
                          coil_size5_1: "",
                          coil_size5_2: "",
                          coil_size5_3: "",
                        });
                      }}
                    >
                      <IndeterminateCheckBoxIcon />
                    </IconButton>
                  </td>
                </tr>
              </tbody>
              <Divider />
            </table>

            <IconButton
              color="primary"
              className={classes.button}
              style={{ left: "48%" }}
              onClick={() => {
                for (let i = 1; i < 6; i++) {
                  let str = "coil_" + i;
                  if (document.getElementById(str).style.display == "none") {
                    document.getElementById(str).style.display = "block";
                    break;
                  }
                }
              }}
            >
              <AddBoxIcon />
            </IconButton>
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td
                    className={classes.td}
                    style={{ width: "15%" }}
                    align="center"
                  >
                    <span className={classes.span}>내용</span>
                  </td>
                  <td align="left" style={{ width: "70%" }}>
                    <CssTextField
                      id="claim_contents"
                      placeholder="입력"
                      multiline
                      fullWidth
                      rows={4}
                      size="small"
                      variant="outlined"
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <div
              style={{ marginTop: "10px", position: "relative" }}
              className="filebox"
            >
              {claim_img_0 === "" ? (
                <>
                  <label for="profile_img" className={classes.label}>
                    <AddAPhotoIcon fontSize="large" />
                  </label>
                  <input
                    className={classes.input}
                    type="file"
                    name="profile_img"
                    id="profile_img"
                    accept="image/*"
                    onChange={(event) => handleFileOnChange(event, "img_0")}
                  />
                </>
              ) : (
                <div className={classes.img}>
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={claim_img_0}
                  />

                  <Button
                    className={classes.buttons}
                    onClick={() =>
                      setInputs({
                        ...inputs,
                        claim_img_0: "",
                      })
                    }
                    color="error"
                    variant="contained"
                    startIcon={<DoDisturbOnOutlinedIcon />}
                  >
                    삭제
                  </Button>
                </div>
              )}
              {claim_img_1 === "" ? (
                <>
                  <label for="profile_img" className={classes.label}>
                    <AddAPhotoIcon fontSize="large" />
                  </label>
                  <input
                    className={classes.input}
                    type="file"
                    name="profile_img"
                    id="profile_img"
                    accept="image/*"
                    onChange={(event) => handleFileOnChange(event, "img_1")}
                  />
                </>
              ) : (
                <div className={classes.img}>
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={claim_img_1}
                  />
                  <Button
                    className={classes.buttons}
                    onClick={() =>
                      setInputs({
                        ...inputs,
                        claim_img_1: "",
                      })
                    }
                    color="error"
                    variant="contained"
                    startIcon={<DoDisturbOnOutlinedIcon />}
                  >
                    삭제
                  </Button>
                </div>
              )}
              {claim_img_2 === "" ? (
                <>
                  <label for="profile_img" className={classes.label}>
                    <AddAPhotoIcon fontSize="large" />
                  </label>
                  <input
                    className={classes.input}
                    type="file"
                    name="profile_img"
                    id="profile_img"
                    accept="image/*"
                    onChange={(event) => handleFileOnChange(event, "img_2")}
                  />
                </>
              ) : (
                <div className={classes.img}>
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={claim_img_2}
                  />
                  <Button
                    className={classes.buttons}
                    onClick={() =>
                      setInputs({
                        ...inputs,
                        claim_img_2: "",
                      })
                    }
                    color="error"
                    variant="contained"
                    startIcon={<DoDisturbOnOutlinedIcon />}
                  >
                    삭제
                  </Button>
                </div>
              )}
            </div>
          </Container>

          <MuiPickersUtilsProvider utils={koLocalizedUtils} locale={koLocale}>
            <DatePicker
              className={classes.datePicker}
              open={openCalendar}
              onClose={() => {
                setOpenCalendar(!openCalendar);
              }}
              views={["year", "month", "date"]}
              ToolbarComponent={(props) =>
                CustomToolbarSelectedOne(props, claim_date)
              }
              value={claim_date}
              inputVariant="outlined"
              cancelLabel="닫기"
              showTodayButton
              onAccept={(date) => {
                setInputs({
                  ...inputs,
                  claim_date: DateToString(date),
                });
              }}
              orientation="portrait"
              fullWidth
              todayLabel="오늘"
              okLabel="확인"
              size="small"
              onChange={() => console.log("test")}
            />
          </MuiPickersUtilsProvider>

          <CustomDialogSearch
            codeListData={codeListSearch}
            open={openDialogSearch}
            onClose={handleCloseSearch}
          />

          <CustomDialogOnlySelect
            data={codeListDataOnlySelect}
            open={openDialogOnlySelect}
            onClose={handleCloseOnlySelect}
          />
        </div>
        <Button
          fullWidth
          style={{
            position: "fixed",
            bottom: 0,
            backgroundColor: "#538CBD",
            color: "#FFF",
          }}
          variant="contained"
          onClick={() => {
            cust_nm !== ""
              ? work_cust_nm !== ""
                ? bad_cls_nm !== ""
                  ? maker_nm !== ""
                    ? document.getElementById("claim_contents").value !== ""
                      ? window.confirm("수정 하시겠습니까?") && handleClaimReg()
                      : alert("내용이 입력되지 않았습니다")
                    : alert("고객사담당자 명이 입력되지 않았습니다.")
                  : alert("유형이 선택되지 않았습니다")
                : alert("사업장이 선택되지 않았습니다")
              : alert("거래처가 선택되지 않았습니다");
          }}
        >
          수정하기
        </Button>
      </Dialog>
    </div>
  );
}
export default React.memo(Menu4_Modify);
