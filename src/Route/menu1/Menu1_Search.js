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
import CustomAlertDialog from "../../components/CusomAlertDialog";
import CustomDialogOnlySelect from "../../components/CustomDialogOnlySelect";
import CustomDialogMultiSelect from "../../components/CustomDialogMultiSelect";
import Drawer from "@material-ui/core/Drawer";
import SearchIcon from "@material-ui/icons/Search";

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
}));

function Menu1_Search({ parentState }) {
  const classes = useStyles();

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
    im_cls: "1",
    im_cls_nm: "자사",
    name_cd: "",
    name_nm: "",
    stan_cd: "",
    stan_nm: "",
    cust_cd: "",
    cust_nm: "",
    thick_f: "",
    thick_t: "",
    width_f: "",
    width_t: "",
    work_cust_cd: "",
    work_cust_nm: "",
    stock_cls: "0",
    stock_cls_nm: "가용재고",
    type_cls: "0",
    type_cls_nm: "전체",
  });

  const {
    im_cls_nm,
    name_nm,
    stan_nm,
    cust_nm,
    thick_f,
    thick_t,
    width_f,
    width_t,
    work_cust_nm,
    stock_cls_nm,
    type_cls_nm,
  } = inputs;
  const [codeKind, setCodeKind] = React.useState("");
  const [codeListSearch, setCodeListSearch] = React.useState([]);
  const [codeListDataOnlySelect, setCodeListDataOnlySelect] = React.useState(
    []
  );
  const [codeListDataMultiSelect, setCodeListMultiSelect] = React.useState([]);
  const [openSearch, setOpenSearch] = React.useState(true);
  const [openDialogSearch, setOpenDialogSearch] = useState(false);
  const [openDialogOnlySelect, setOpenDialogOnlySelect] = useState(false);
  const [openDialogMultiSelect, setOpenDialogMultiSelect] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = React.useState(false);
  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleClearIcon = (code_kind) => {
    if (code_kind === "im_cls") {
      setInputs({
        ...inputs,
        im_cls: "",
        im_cls_nm: "",
      });
    } else if (code_kind === "name_nm") {
      setInputs({
        ...inputs,
        name_cd: "",
        name_nm: "",
      });
    } else if (code_kind === "stan_nm") {
      setInputs({
        ...inputs,
        stan_cd: "",
        stan_nm: "",
      });
    } else if (code_kind === "cust_nm") {
      setInputs({
        ...inputs,
        cust_cd: "",
        cust_nm: "",
      });
    } else if (code_kind === "work_cust_cd") {
      setInputs({
        ...inputs,
        work_cust_cd: "",
        work_cust_nm: "",
      });
    } else if (code_kind === "stock_cls") {
      setInputs({
        ...inputs,
        stock_cls: "",
        stock_cls_nm: "",
      });
    } else if (code_kind === "type_cls") {
      setInputs({
        ...inputs,
        type_cls: "",
        type_cls_nm: "",
      });
    }
  };

  const handleClickOpenSearch = (code_kind) => {
    setCodeKind(code_kind);
    if (code_kind === "stan_cd") {
      setCodeListSearch(
        JSON.parse(window.sessionStorage.getItem("stan_cd_list"))
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
    } else if (code_kind === "work_cust_cd") {
      setCodeListDataOnlySelect([
        { CODE_CD: "0", CODE_NAME: "전체" },
        { CODE_CD: "ES014", CODE_NAME: "(주)에스에이" },
        { CODE_CD: "YJ004", CODE_NAME: "영진철강(주)" },
      ]);
    } else if (code_kind === "stock_cls") {
      setCodeListDataOnlySelect([
        { CODE_CD: "0", CODE_NAME: "가용재고" },
        { CODE_CD: "1", CODE_NAME: "전체재고" },
      ]);
    } else if (code_kind === "type_cls") {
      setCodeListDataOnlySelect([
        { CODE_CD: "0", CODE_NAME: "전체" },
        { CODE_CD: "005", CODE_NAME: "Blanking" },
      ]);
    }
    setOpenDialogOnlySelect(true);
  };

  const handleClickOpenMultiSelect = (code_kind) => {
    if (code_kind === "name_cd") {
      setCodeListMultiSelect(
        JSON.parse(window.sessionStorage.getItem("name_cd_list"))
      );
    }
    setOpenDialogMultiSelect(true);
  };

  const handleCloseSearch = (codeName, codeCd) => {
    if (codeCd === undefined) {
      codeName = "";
      codeCd = "";
    }

    console.log(codeKind);

    if (codeName !== "exit")
      if (codeKind === "stan_cd") {
        setInputs({ ...inputs, stan_cd: codeCd, stan_nm: codeName });
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
      } else if (codeKind === "stock_cls") {
        setInputs({
          ...inputs,
          stock_cls: codeCd,
          stock_cls_nm: codeName,
        });
      } else if (codeKind === "type_cls") {
        setInputs({
          ...inputs,
          type_cls: codeCd,
          type_cls_nm: codeName,
        });
      }

    setOpenDialogOnlySelect(false);
  };

  const handleCloseMultiSelect = (item) => {
    let codeCd = "";
    let codeNm = "";

    console.log(item);

    if (item.length > 0) {
      for (let i = 0; i < item.length; i++) {
        codeCd = codeCd + "'" + item[i].split("/")[0] + "',";
        codeNm = codeNm + "" + item[i].split("/")[1] + ",";
      }

      codeCd = codeCd.substring(0, codeCd.length - 1);
      codeNm = codeNm.substring(0, codeNm.length - 1);

      setInputs({ ...inputs, name_cd: codeCd, name_nm: codeNm });
    }
    setOpenDialogMultiSelect(false);
  };

  const handleClickAgree = () => {
    setOpenAlertDialog(false);
    closeProgram();
  };

  const handleClickDisagree = () => {
    setOpenAlertDialog(false);
  };

  const closeProgram = () => {
    window.sessionStorage.setItem("closeFlag", 0);
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
      {console.log("searchrender")}
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
                    {im_cls_nm.length > 0 && (
                      <IconButton
                        className={classes.clearIcon}
                        onClick={() => handleClearIcon("im_cls")}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td} align="right">
                    <span className={classes.span}>품명</span>
                  </td>
                  <td className={classes.td}>
                    <CssTextField
                      fullWidth
                      name="name_cd"
                      size="small"
                      placeholder="선택"
                      onChange={handleOnChange}
                      onClick={() => handleClickOpenMultiSelect("name_cd")}
                      value={name_nm}
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    {name_nm.length > 0 && (
                      <IconButton
                        className={classes.clearIcon}
                        onClick={() => handleClearIcon("name_nm")}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td} align="right">
                    <span className={classes.span}>재질</span>
                  </td>
                  <td className={classes.td}>
                    <CssTextField
                      placeholder="선택"
                      name="stan_nm"
                      fullWidth
                      size="small"
                      onChange={handleOnChange}
                      value={stan_nm}
                      variant="outlined"
                      onClick={() => handleClickOpenSearch("stan_cd")}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    {stan_nm.length > 0 && (
                      <IconButton
                        className={classes.clearIcon}
                        onClick={() => handleClearIcon("stan_nm")}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    )}
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
                    <span className={classes.span}>재고구분</span>
                  </td>
                  <td className={classes.td} align="center">
                    <CssTextField
                      name="stock_cls_nm"
                      placeholder="선택"
                      fullWidth
                      size="small"
                      onChange={handleOnChange}
                      onClick={() => handleClickOpenOnlySelect("stock_cls")}
                      className={classes.textField}
                      value={stock_cls_nm}
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
                  <td className={classes.td} align="center">
                    <CssTextField
                      name="type_cls_nm"
                      placeholder="선택"
                      fullWidth
                      size="small"
                      onChange={handleOnChange}
                      onClick={() => handleClickOpenOnlySelect("type_cls")}
                      className={classes.textField}
                      value={type_cls_nm}
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
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
                    im_cls: "1",
                    im_cls_nm: "자사",
                    name_cd: "",
                    name_nm: "",
                    stan_cd: "",
                    stan_nm: "",
                    cust_cd: "",
                    cust_nm: "",
                    thick_f: "",
                    thick_t: "",
                    width_f: "",
                    width_t: "",
                    work_cust_cd: "",
                    work_cust_nm: "",
                    stock_cls: "0",
                    stock_cls_nm: "가용재고",
                    type_cls: "0",
                    type_cls_nm: "전체",
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

          <CustomDialogMultiSelect
            codeListData={codeListDataMultiSelect}
            open={openDialogMultiSelect}
            onClose={handleCloseMultiSelect}
          />

          <CustomAlertDialog
            open={openAlertDialog}
            handleClickAgree={() => handleClickAgree()}
            handleClickDisagree={() => handleClickDisagree()}
            title={"프로그램 종료"}
            content={"소재재고현황 종료하시겠습니까?"}
          />
        </div>
      </Drawer>
    </div>
  );
}

Menu1_Search.propTypes = {
  history: PropTypes.object,
  programName: PropTypes.string,
  parentState: PropTypes.func,
  openSearchToggle: PropTypes.bool,
};

export default React.memo(Menu1_Search);
