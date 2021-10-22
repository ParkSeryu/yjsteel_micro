import React, { useState } from "react";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import CustomDialogOnlySelect from "../../components/CustomDialogOnlySelect";
import axios from "axios";
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

function Menu8_Search({ parentState }) {
  const classes = useStyles();
  let today = new Date();
  let year = today.getFullYear();
  let month = ("0" + (1 + today.getMonth())).slice(-2);
  let date = ("0" + today.getDate()).slice(-2);
  let date_p = ("0" + (today.getDate() - 1)).slice(-2);
  let date_n = ("0" + (today.getDate() + 1)).slice(-2);

  window.addEventListener("checkBackFlag", funCheckDialogFlag, {
    once: true,
  });

  function funCheckDialogFlag() {
    let count = 0;
    if (count === 0) {
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
    if (openSearch) {
      setOpenSearch(!openSearch);
      count = 2;
    }
    window.sessionStorage.setItem("closeFlag", count);
  }

  const [inputs, setInputs] = useState({
    date_f: year + "/" + month + "/" + date_p,
    date_t: year + "/" + month + "/" + date_n,
    job_cust_cd: "YJ004",
    job_cust_nm: "영진철강(주)",
    plant_cust_cd: "201",
    plant_cust_nm: "SL1",
    job_status_cust_cd: "2",
    job_status_cust_nm: "계획",
    work_cust_cd: "",
    work_cust_nm: "",
  });

  const {
    date_f,
    date_t,
    job_cust_cd,
    job_cust_nm,
    plant_cust_nm,
    job_status_cust_nm,
    work_cust_nm,
  } = inputs;
  const [codeKind, setCodeKind] = React.useState("");
  const [codeListDataOnlySelect, setCodeListDataOnlySelect] = React.useState(
    []
  );
  const [openSearch, setOpenSearch] = React.useState(true);
  const [openDialogOnlySelect, setOpenDialogOnlySelect] = useState(false);
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
        date_f: year + "/" + month + "/" + date_p,
        date_t: year + "/" + month + "/" + date_n,
      });
    } else if (code_kind === "job_cust_cd") {
      setInputs({
        ...inputs,
        job_cust_cd: "",
        job_cust_nm: "",
      });
    } else if (code_kind === "plant_cust_cd") {
      setInputs({
        ...inputs,
        plant_cust_cd: "",
        plant_cust_nm: "",
      });
    } else if (code_kind === "job_status_cust_cd") {
      setInputs({
        ...inputs,
        job_status_cust_cd: "",
        job_status_cust_nm: "",
      });
    } else if (code_kind === "work_cust_cd") {
      setInputs({
        ...inputs,
        work_cust_cd: "",
        work_cust_nm: "",
      });
    }
  };

  const handleClickOpenOnlySelect = (code_kind) => {
    setCodeKind(code_kind);
    if (code_kind === "job_cust_cd") {
      setCodeListDataOnlySelect(
        JSON.parse(window.sessionStorage.getItem("job_cust_list"))
      );
    } else if (code_kind === "job_status_cust_cd") {
      setCodeListDataOnlySelect([
        { CODE_CD: "0", CODE_NAME: "전체" },
        { CODE_CD: "2", CODE_NAME: "계획" },
        { CODE_CD: "4", CODE_NAME: "완료" },
      ]);
    } else if (code_kind === "plant_cust_cd") {
      axios
        .get(
          "http://121.165.242.72:5050/yjsteel/Developer/index.php/Menu8/getPlantCust",
          {
            params: {
              job_cust_cd: job_cust_cd,
            },
          }
        )
        .then((response) => {
          console.log(response);
          if (response.data.RESULT_CODE === "200") {
            // data라는 이름으로 json 파일에 있는 값에 state값을 바꿔준다.
            let temp = [];

            response.data.DATA.map((item) => {
              temp.push({ CODE_CD: item.CODE_CD, CODE_NAME: item.CODE_NM });
              console.log(temp);
            });

            setCodeListDataOnlySelect(temp);
          }
        })
        .catch((e) => {
          console.error(e); // 에러표시
        });
    } else if (code_kind === "work_cust_cd") {
      setCodeListDataOnlySelect([
        { CODE_CD: "0", CODE_NAME: "전체" },
        { CODE_CD: "YJ004", CODE_NAME: "영진철강(주)" },
        { CODE_CD: "ES014", CODE_NAME: "(주)에스에이" },
      ]);
    }
    setOpenDialogOnlySelect(true);
  };

  const handleClickOpenCalendar = () => {
    window.sessionStorage.setItem("date_f", date_f);
    window.sessionStorage.setItem("date_t", date_t);
    setOpenCalendar(!openCalendar);
  };

  const handleCloseOnlySelect = (codeName, codeCd) => {
    if (codeCd === undefined) {
      codeName = "";
      codeCd = "";
    }

    if (codeName !== "exit")
      if (codeKind === "job_cust_cd") {
        setInputs({ ...inputs, job_cust_cd: codeCd, job_cust_nm: codeName });
      } else if (codeKind === "work_cust_cd") {
        setInputs({ ...inputs, work_cust_cd: codeCd, work_cust_nm: codeName });
      } else if (codeKind === "plant_cust_cd") {
        setInputs({
          ...inputs,
          plant_cust_cd: codeCd,
          plant_cust_nm: codeName,
        });
      } else if (codeKind === "job_status_cust_cd") {
        setInputs({
          ...inputs,
          job_status_cust_cd: codeCd,
          job_status_cust_nm: codeName,
        });
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
                    <span className={classes.span}>편성일</span>
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
                    <span className={classes.span}>작업장</span>
                  </td>
                  <td className={classes.td}>
                    <CssTextField
                      fullWidth
                      name="job_cust_cd"
                      size="small"
                      placeholder="선택"
                      variant="outlined"
                      onChange={handleOnChange}
                      onClick={() => handleClickOpenOnlySelect("job_cust_cd")}
                      value={job_cust_nm}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    {job_cust_nm.length > 0 && (
                      <IconButton
                        className={classes.clearIcon}
                        onClick={() => handleClearIcon("job_cust_cd")}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td} align="right">
                    <span className={classes.span}>편성라인</span>
                  </td>
                  <td className={classes.td}>
                    <CssTextField
                      name="plant_cust_nm"
                      placeholder="선택"
                      fullWidth
                      size="small"
                      onChange={handleOnChange}
                      className={classes.textField}
                      value={plant_cust_nm}
                      variant="outlined"
                      onClick={() => handleClickOpenOnlySelect("plant_cust_cd")}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    {plant_cust_nm.length > 0 && (
                      <IconButton
                        className={classes.clearIcon}
                        onClick={() => handleClearIcon("plant_cust_cd")}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td} align="right">
                    <span className={classes.span}>진행상태</span>
                  </td>
                  <td className={classes.td}>
                    <CssTextField
                      fullWidth
                      name="job_status_cust_nm"
                      size="small"
                      placeholder="선택"
                      onChange={handleOnChange}
                      onClick={() =>
                        handleClickOpenOnlySelect("job_status_cust_cd")
                      }
                      value={job_status_cust_nm}
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    {job_status_cust_nm.length > 0 && (
                      <IconButton
                        className={classes.clearIcon}
                        onClick={() => handleClearIcon("job_status_cust_cd")}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    )}
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
              </tbody>
            </table>

            <div className={classes.button}>
              <Button
                className={classes.clearButton}
                variant="contained"
                onClick={() => {
                  setInputs({
                    date_f: year + "/" + month + "/" + date - 1,
                    date_t: year + "/" + month + "/" + date + 1,
                    job_cust_cd: "YJ004",
                    job_cust_nm: "영진철강(주)",
                    plant_cust_cd: "201",
                    plant_cust_nm: "SL1",
                    job_status_cust_cd: "2",
                    job_status_cust_nm: "계획",
                    work_cust_cd: "",
                    work_cust_nm: "",
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

Menu8_Search.propTypes = {
  programName: PropTypes.string,
  parentState: PropTypes.func,
  openSearchToggle: PropTypes.bool,
};

export default React.memo(Menu8_Search);
