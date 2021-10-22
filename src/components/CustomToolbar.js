import React, { useState, useEffect } from "react";
import PickerToolbar from "@material-ui/pickers/_shared/PickerToolbar";
import { makeStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const CssTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "3px solid rgba(0, 176, 246, 1)",
      },
      "&.Mui-focused fieldset": {
        border: "3px solid rgba(0, 176, 246, 1)",
      },
    },
  },
})(TextField);

const useStyles = makeStyles({
  toolbar: {
    backgroundColor: "#FFFFFF",
    height: "35%",
  },

  root: {
    width: "100%",
    marginTop: "10px",
  },

  rightFloat: {
    float: "right",
  },

  yearSelectionBox: {
    position: "absolute",
    zIndex: 5,
    width: "85px",
    top: "127%",
    left: "26.5%",
  },

  monthSelectionBox: {
    position: "absolute",
    zIndex: 5,
    width: "55px",
    top: "127%",
    left: "59.5%",
  },

  textFieldMarginRight: {
    width: "135px",
    marginRight: "8px",
  },

  textField: {
    width: "135px",
  },
});

const StringToDate = (date_str) => {
  let yyyyMMdd = String(date_str);
  let sYear = yyyyMMdd.substring(0, 4);
  let sMonth = yyyyMMdd.substring(5, 7);
  let sDate = yyyyMMdd.substring(8, 10);
  return new Date(Number(sYear), Number(sMonth) - 1, Number(sDate));
};

const DateToString = (date) => {
  let year = date.getFullYear();
  let month = 1 + date.getMonth();
  month = month >= 10 ? month : "0" + month;
  let day = date.getDate();
  day = day >= 10 ? day : "0" + day;
  return year + "/" + month + "/" + day;
};

function CustomToolbar(props, date_from, date_to) {
  const classes = useStyles();
  const { date, setOpenView, openView, onChange } = props;
  const [date_f, setDateFrom] = useState(date_from);
  const [date_t, setDateTo] = useState(date_to);
  const [focus, setFocus] = useState("date_f");
  const [flag, setFlag] = useState(0);

  const handleChangeViewClick = (view) => (e) => {
    setOpenView(view);
  };

  const handleFocus = (type) => {
    setFlag(0);
    if (type === "date_f") {
      onChange(StringToDate(date_f));
      setFocus("date_f");
    } else if (type === "date_t") {
      onChange(StringToDate(date_t));
      setFocus("date_t");
    }
  };

  useEffect(() => {
    if (openView === "date") {
      if (focus === "date_f") {
        setDateFrom(DateToString(date));
        window.sessionStorage.setItem("date_f", DateToString(date));
        setFlag(flag + 1);
        if (flag !== 0) {
          handleFocus("date_t");
        }
      } else if (focus === "date_t") {
        if (StringToDate(date_f) > date) {
          alert("종료일은 시작일 이전에 설정할 수 없습니다.");
          onChange(StringToDate(date_f));
        } else {
          setDateTo(DateToString(date));
          window.sessionStorage.setItem("date_t", DateToString(date));
        }
      }
    } else {
      setFlag(0);
    }
  }, [date, openView]);

  return (
    <PickerToolbar className={classes.toolbar}>
      <div className={classes.root}>
        {openView === "date" && (
          <>
            <div
              className={classes.yearSelectionBox}
              onClick={handleChangeViewClick("year")}
            >
              <ArrowDropDownIcon className={classes.rightFloat} />
            </div>
            <div
              className={classes.monthSelectionBox}
              onClick={handleChangeViewClick("month")}
            >
              <ArrowDropDownIcon className={classes.rightFloat} />
            </div>
          </>
        )}
        {focus === "date_f" ? (
          <CssTextField
            className={classes.textFieldMarginRight}
            name="date_f"
            size="small"
            label="시작일"
            onClick={() => handleFocus("date_f")}
            value={date_f}
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
        ) : (
          <TextField
            className={classes.textFieldMarginRight}
            name="date_f"
            size="small"
            label="시작일"
            onClick={() => handleFocus("date_f")}
            value={date_f}
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
        )}

        {focus === "date_t" ? (
          <CssTextField
            className={classes.textField}
            name="date_t"
            size="small"
            label="종료일"
            onClick={() => handleFocus("date_t")}
            value={date_t}
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
        ) : (
          <TextField
            className={classes.textField}
            name="date_t"
            size="small"
            label="종료일"
            onClick={() => handleFocus("date_t")}
            value={date_t}
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
        )}
      </div>
    </PickerToolbar>
  );
}

export default CustomToolbar;
