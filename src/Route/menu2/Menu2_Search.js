import React, { useState } from "react";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CustomDialogSearch from "../../components/CustomDialogSearch";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import CustomDialogOnlySelect from "../../components/CustomDialogOnlySelect";
import Drawer from "@material-ui/core/Drawer";
import SearchIcon from "@material-ui/icons/Search";
import format from "date-fns/format";
import koLocale from "date-fns/locale/ko";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import CustomToolbar from "../../components/CustomToolbar";

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
    width: "100vw", // Fix IE 11 issue.
    marginTop: theme.spacing(8),
  },

  td: {
    padding: "1vw",
  },

  numberTextField: {
    width: "25vw",
  },

  grow: {
    flexGrow: 1,
  },

  title: {
    fontFamily: "NanumGothic",
    marginTop: "5px",
  },

  line: {
    marginBottom: "125px",
  },

  span: {
    lineHeight: "40px",
    fontSize: "16px",
    whiteSpace: "nowrap",
    overflowX: "hidden",
  },

  table: {
    width: "100%",
    padding: "1vw",
    borderCollapse: "separate",
    borderSpacing: "0 5px",
    marginLeft: "-6px",
  },

  clearIcon: {
    position: "relative",
    float: "right",
    top: "-43px",
    left: "-1px",
    marginBottom: "-50px",
    zIndex: 2,
  },

  button: {
    textAlign: "center",
    marginTop: theme.spacing(1),
    marginLeft: "2vw",
  },

  clearButton: {
    borderRadius: "5em",
    marginRight: "2vw",
    width: "30%",
    fontFamily: "NanumGothic",
    fontSize: "16px",
    backgroundColor: "#6E7277",
    color: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#6E7277",
    },
  },

  retrieveButton: {
    borderRadius: "5em",
    fontFamily: "NanumGothic",
    width: "30%",
    fontSize: "16px",
    backgroundColor: "#67B7D9",
    color: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#67B7D9",
    },
  },

  searchIcon: {
    position: "fixed",
    top: "15px",
    right: "15px",
    zIndex: 1252,
  },

  datePicker: {
    visibility: "hidden",
  },
}));

class koLocalizedUtils extends DateFnsUtils {
  getCalendarHeaderText(date) {
    return format(date, "yyyy년　　 MM월", { locale: this.locale });
  }
}

function Menu2_Search({ parentState }) {
  const classes = useStyles();
  let today = new Date();
  let year = today.getFullYear();
  let month = ("0" + (1 + today.getMonth())).slice(-2);
  let month_f = ("0" + today.getMonth()).slice(-2);
  let date = ("0" + today.getDate()).slice(-2);

  window.addEventListener("checkBackFlag", funCheckDialogFlag, {
    once: true,
  });

  function funCheckDialogFlag() {
    let count = 0;
    if (count === 0) {
      if (openDialogSearch) {
        setOpenDialogSearch(false);
        console.log("dialog");
        count = count + 1;
      }
      if (openAlertDialog) {
        setOpenAlertDialog(false);
        console.log("alertDialog");
        count = count + 1;
      }
      if (openDialogOnlySelect) {
        setOpenDialogOnlySelect(false);
        console.log("onlySelectDialog");
        count = count + 1;
      }
      if (openDialogMultiSelect) {
        setOpenDialogMultiSelect(false);
        console.log("multiSelectDialog");
        count = count + 1;
      }
      if (openCalendar) {
        setOpenCalendar(false);
        console.log("calendar");
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
    if (openSearch) {
      setOpenSearch(!openSearch);
      count = 2;
    }
    window.sessionStorage.setItem("closeFlag", count);
  }

  const [inputs, setInputs] = useState({
    date_f: year + "/" + month_f + "/" + date,
    date_t: year + "/" + month + "/" + date,
    im_cls: "1",
    im_cls_nm: "자사",
    search_ship_status: "6",
    search_ship_status_nm: "미출고",
    cust_cd: "",
    cust_nm: "",
    thick_f: "",
    thick_t: "",
    width_f: "",
    width_t: "",
    work_cust_cd: "",
    work_cust_nm: "",
    maker_cd: window.sessionStorage.getItem("user_id"),
    maker_nm: window.sessionStorage.getItem("user_name"),
  });

  const {
    date_f,
    date_t,
    im_cls_nm,
    search_ship_status_nm,
    cust_nm,
    thick_f,
    thick_t,
    width_f,
    width_t,
    work_cust_nm,
    maker_nm,
  } = inputs;
  const [codeKind, setCodeKind] = React.useState("");
  const [codeListSearch, setCodeListSearch] = React.useState([]);
  const [codeListDataOnlySelect, setCodeListDataOnlySelect] = React.useState(
    []
  );
  const [openSearch, setOpenSearch] = React.useState(true);
  const [openDialogSearch, setOpenDialogSearch] = useState(false);
  const [openDialogOnlySelect, setOpenDialogOnlySelect] = useState(false);
  const [openDialogMultiSelect, setOpenDialogMultiSelect] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = React.useState(false);
  const [openCalendar, setOpenCalendar] = React.useState(false);
  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleClearIcon = (code_kind) => {
    if (code_kind === "date") {
      setInputs({
        ...inputs,
        date_f: year + "/" + month_f + "/" + date,
        date_t: year + "/" + month + "/" + date,
      });
    } else if (code_kind === "cust_nm") {
      setInputs({
        ...inputs,
        cust_cd: "",
        cust_nm: "",
      });
    } else if (code_kind === "maker_nm") {
      setInputs({
        ...inputs,
        maker_cd: "",
        maker_nm: "",
      });
    } else if (code_kind === "work_cust_cd") {
      setInputs({
        ...inputs,
        work_cust_cd: "",
        work_cust_nm: "",
      });
    }
  };

  const handleClickOpenSearch = (code_kind) => {
    setCodeKind(code_kind);
    if (code_kind === "maker_cd") {
      setCodeListSearch(
        JSON.parse(window.sessionStorage.getItem("emp_cd_list"))
      );
    } else if (code_kind === "cust_cd") {
      setCodeListSearch(
        JSON.parse(window.sessionStorage.getItem("cust_cd_list"))
      );
    }
    setOpenDialogSearch(true);
  };

  const handleClickOpenOnlySelect = (code_kind) => {
    setCodeKind(code_kind);
    if (code_kind === "im_cls") {
      setCodeListDataOnlySelect([
        { CODE_CD: "0", CODE_NAME: "전체" },
        { CODE_CD: "1", CODE_NAME: "자사" },
        { CODE_CD: "2", CODE_NAME: "임가공" },
        { CODE_CD: "3", CODE_NAME: "보관(자사)" },
        { CODE_CD: "4", CODE_NAME: "보관(임가공)" },
        { CODE_CD: "6", CODE_NAME: "보관(가공)" },
      ]);
    } else if (code_kind === "search_ship_status") {
      setCodeListDataOnlySelect([
        { CODE_CD: "", CODE_NAME: "전체" },
        { CODE_CD: "0", CODE_NAME: "요청" },
        { CODE_CD: "1", CODE_NAME: "출고" },
        { CODE_CD: "2", CODE_NAME: "지시" },
        { CODE_CD: "3", CODE_NAME: "생산" },
        { CODE_CD: "4", CODE_NAME: "계획" },
        { CODE_CD: "5", CODE_NAME: "출고중" },
        { CODE_CD: "6", CODE_NAME: "미출고" },
        { CODE_CD: "21", CODE_NAME: "지시(1차)" },
        { CODE_CD: "41", CODE_NAME: "계획(1차)" },
        { CODE_CD: "31", CODE_NAME: "생산(1차)" },
      ]);
    } else if (code_kind === "work_cust_cd") {
      setCodeListDataOnlySelect([
        { CODE_CD: "0", CODE_NAME: "전체" },
        { CODE_CD: "ES014", CODE_NAME: "(주)에스에이" },
        { CODE_CD: "YJ004", CODE_NAME: "영진철강(주)" },
      ]);
    }
    setOpenDialogOnlySelect(true);
  };

  const handleClickOpenCalendar = () => {
    window.sessionStorage.setItem("date_f", date_f);
    window.sessionStorage.setItem("date_t", date_t);
    setOpenCalendar(!openCalendar);
  };

  const handleCloseSearch = (codeName, codeCd) => {
    if (codeCd === undefined) {
      codeName = "";
      codeCd = "";
    }

    if (codeName !== "exit")
      if (codeKind === "maker_cd") {
        setInputs({ ...inputs, maker_cd: codeCd, maker_nm: codeName });
      } else if (codeKind === "cust_cd") {
        setInputs({ ...inputs, cust_cd: codeCd, cust_nm: codeName });
      }

    setOpenDialogSearch(false);
  };

  const handleCloseOnlySelect = (codeName, codeCd) => {
    if (codeCd === undefined) {
      codeName = "";
      codeCd = "";
    }

    if (codeName !== "exit")
      if (codeKind === "im_cls") {
        setInputs({ ...inputs, im_cls: codeCd, im_cls_nm: codeName });
      } else if (codeKind === "work_cust_cd") {
        setInputs({ ...inputs, work_cust_cd: codeCd, work_cust_nm: codeName });
      }

    setOpenDialogOnlySelect(false);
  };

  const setLoadItem = (item, isSort) => {
    parentState(item, isSort); // 조회시 state 넘기는 역할
  };

  return (
    <div>
      <SearchIcon
        id="searchIcon"
        className={classes.searchIcon}
        onClick={() => setOpenSearch(!openSearch)}
      />
      <Drawer open={openSearch} anchor={"right"} variant="persistent">
        <div className={classes.grow}>
          <Container className={classes.root}>
            <table className={classes.table}>
              <colgroup>
                <col width="20%" />
                <col />
              </colgroup>
              <tbody>
                <tr>
                  <td align="right">
                    <span className={classes.span}>등록일</span>
                  </td>
                  <td className={classes.td}>
                    <CssTextField
                      fullWidth
                      name="date"
                      size="small"
                      placeholder="선택"
                      onClick={() => handleClickOpenCalendar("date")}
                      value={date_f + " - " + date_t}
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    {date_f.length > 0 && (
                      <IconButton
                        className={classes.clearIcon}
                        onClick={() => handleClearIcon("date")}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td} align="right">
                    <span className={classes.span}>소유</span>
                  </td>
                  <td className={classes.td}>
                    <CssTextField
                      fullWidth
                      name="im_cls"
                      size="small"
                      placeholder="선택"
                      variant="outlined"
                      onChange={handleOnChange}
                      onClick={() => handleClickOpenOnlySelect("im_cls")}
                      value={im_cls_nm}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className={classes.td} align="right">
                    <span className={classes.span}>출고구분</span>
                  </td>
                  <td className={classes.td}>
                    <CssTextField
                      fullWidth
                      name="im_cls"
                      size="small"
                      placeholder="선택"
                      variant="outlined"
                      onChange={handleOnChange}
                      onClick={() =>
                        handleClickOpenOnlySelect("search_ship_status")
                      }
                      value={search_ship_status_nm}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className={classes.td} align="right">
                    <span className={classes.span}>수요가명</span>
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
                    {cust_nm.length > 0 && (
                      <IconButton
                        className={classes.clearIcon}
                        onClick={() => handleClearIcon("cust_nm")}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td} align="right">
                    <span className={classes.span}>두께</span>
                  </td>
                  <td className={classes.td}>
                    <CssTextField
                      placeholder="0.0"
                      name="thick_f"
                      onChange={handleOnChange}
                      size="small"
                      className={classes.numberTextField}
                      variant="outlined"
                      value={thick_f}
                      inputProps={{
                        inputMode: "numeric",
                        style: { textAlign: "center" },
                      }}
                    />
                    <object className={classes.spanVerticalAlign}>~</object>
                    <CssTextField
                      placeholder="0.0"
                      name="thick_t"
                      onChange={handleOnChange}
                      size="small"
                      className={classes.numberTextField}
                      variant="outlined"
                      value={thick_t}
                      inputProps={{
                        inputMode: "numeric",
                        style: { textAlign: "center" },
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className={classes.td} align="right">
                    <span className={classes.span}>폭</span>
                  </td>
                  <td className={classes.td}>
                    <CssTextField
                      placeholder="0.0"
                      name="width_f"
                      onChange={handleOnChange}
                      size="small"
                      className={classes.numberTextField}
                      variant="outlined"
                      value={width_f}
                      inputProps={{
                        inputMode: "numeric",
                        style: { textAlign: "center" },
                      }}
                    />
                    <object className={classes.spanVerticalAlign}>~</object>
                    <CssTextField
                      placeholder="0.0"
                      name="width_t"
                      onChange={handleOnChange}
                      size="small"
                      className={classes.numberTextField}
                      variant="outlined"
                      value={width_t}
                      inputProps={{
                        inputMode: "numeric",
                        style: { textAlign: "center" },
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
                    {work_cust_nm.length > 0 && (
                      <IconButton
                        className={classes.clearIcon}
                        onClick={() => handleClearIcon("work_cust_cd")}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td} align="right">
                    <span className={classes.span}>담당자</span>
                  </td>
                  <td className={classes.td} align="center">
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
                    {maker_nm.length > 0 && (
                      <IconButton
                        className={classes.clearIcon}
                        onClick={() => handleClearIcon("maker_nm")}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className={classes.button}>
              <Button
                className={classes.clearButton}
                variant="contained"
                onClick={() => {
                  setInputs({
                    date_f: year + "/" + month_f + "/" + date,
                    date_t: year + "/" + month + "/" + date,
                    im_cls: "0",
                    im_cls_nm: "자사",
                    search_ship_status: "6",
                    search_ship_status_nm: "미출고",
                    cust_cd: "",
                    cust_nm: "",
                    thick_f: "",
                    thick_t: "",
                    width_f: "",
                    width_t: "",
                    work_cust_cd: "",
                    work_cust_nm: "",
                    maker_cd: window.sessionStorage.getItem("user_id"),
                    maker_nm: window.sessionStorage.getItem("user_name"),
                  });
                }}
              >
                초기화
              </Button>

              <Button
                className={classes.retrieveButton}
                variant="contained"
                onClick={() => {
                  setOpenSearch(!openSearch);
                  setLoadItem(inputs);
                }}
              >
                조회
              </Button>
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
              ToolbarComponent={(props) => CustomToolbar(props, date_f, date_t)}
              value={date_f}
              inputVariant="outlined"
              cancelLabel="닫기"
              showTodayButton
              onAccept={() => {
                setInputs({
                  ...inputs,
                  date_f: window.sessionStorage.getItem("date_f"),
                  date_t: window.sessionStorage.getItem("date_t"),
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
      </Drawer>
    </div>
  );
}

Menu2_Search.propTypes = {
  history: PropTypes.object,
  programName: PropTypes.string,
  parentState: PropTypes.func,
  openSearchToggle: PropTypes.bool,
};

export default React.memo(Menu2_Search);
