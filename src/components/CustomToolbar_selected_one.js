import React from "react";
import PickerToolbar from "@material-ui/pickers/_shared/PickerToolbar";
import ToolbarButton from "@material-ui/pickers/_shared/ToolbarButton";
import { makeStyles } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const useStyles = makeStyles({
  toolbar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },

  root: {
    width: "100%",
    marginTop: "10px",
  },

  test: {
    float: "right",
  },

  yearSelectionBox: {
    position: "absolute",
    zIndex: 5,
    width: "85px",
    top: "115%",
    left: "26.5%",
  },

  monthSelectionBox: {
    position: "absolute",
    zIndex: 5,
    width: "55px",
    top: "115%",
    left: "59.5%",
  },

  textField: {
    width: "135px",
  },
});

const DateToString = (date, flag) => {
  let year = date.getFullYear();
  let month = 1 + date.getMonth();
  month = month >= 10 ? month : "0" + month;
  let day = date.getDate();
  day = day >= 10 ? day : "0" + day;

  if (flag === 1) return year + "년";

  return month + "월 " + day + "일 ";
};

const CustomToolbar_selected_one = function (props) {
  const { date, isLandscape, openView, setOpenView, title } = props;

  const handleChangeViewClick = (view) => (e) => {
    setOpenView(view);
  };

  const classes = useStyles();

  return (
    <PickerToolbar
      className={classes.toolbar}
      title={title}
      isLandscape={isLandscape}
    >
      {openView === "date" && (
        <>
          <div
            className={classes.yearSelectionBox}
            onClick={handleChangeViewClick("year")}
          >
            <ArrowDropDownIcon className={classes.test} />
          </div>
          <div
            className={classes.monthSelectionBox}
            onClick={handleChangeViewClick("month")}
          >
            <ArrowDropDownIcon className={classes.test} />
          </div>
        </>
      )}
      <ToolbarButton
        onClick={handleChangeViewClick("year")}
        variant="h6"
        label={DateToString(date, 1)}
        selected={openView === "year"}
      />
      <ToolbarButton
        onClick={handleChangeViewClick("month")}
        variant="h4"
        selected={openView === "date"}
        label={DateToString(date, 2)}
      />
    </PickerToolbar>
  );
};

export default CustomToolbar_selected_one;
