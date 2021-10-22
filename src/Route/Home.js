import React, { Component } from "react";
import AppBars from "../components/AppBars";
import { withRouter } from "react-router-dom";
import Menu1 from "./menu1/Menu1";
import Menu5 from "./menu5/Menu5";
import Menu2 from "./menu2/Menu2";
import Menu6 from "./menu6/Menu6";
import Menu4 from "./menu4/Menu4";
import Menu7 from "./menu7/Menu7";
import Menu8 from "./menu8/Menu8";
import DetailPage from "../components/DetailPage";
import imgA from "../images/loading.gif";

const programChange = (program_id, program_nm) => {
  const all_program = document.getElementsByClassName("cont");
  for (let item of all_program) {
    let string = item.id.toString() + "_scroll";
    if (
      item.id.toString() === window.sessionStorage.getItem("prev_program_id")
    ) {
      window.sessionStorage.setItem(string, window.pageYOffset);
    }
    item.style.display = "none";
    //item.classList.add("hidden");
  }

  document.getElementById("programNameText").textContent = program_nm;
  window.sessionStorage.setItem("prev_program_id", program_id);

  let program = document.getElementById(program_id);
  program.style.display = "block";
  //program.classList.remove("hidden");

  window.scrollTo(
    0,
    window.sessionStorage.getItem(program.id.toString() + "_scroll")
  );
};

class Home extends Component {
  render() {
    return (
      <div>
        {console.log("render")}
        <div>
          <AppBars programName="영진철강(주)" programChange={programChange} />
        </div>
        <div
          id="home"
          className="cont"
          style={{
            display: "block",
            width: "100vw",
            marginTop: "15vh",
            textAlign: "center",
          }}
        >
          <b>영진철강(주) ERP 접속을 환영합니다.</b>
        </div>
        <div id="menu1" className="cont" style={{ display: "none" }}>
          <Menu1 />
        </div>
        <div id="menu5" className="cont" style={{ display: "none" }}>
          <Menu5 />
        </div>
        <div id="menu2" className="cont" style={{ display: "none" }}>
          <Menu2 />
        </div>
        <div id="menu6" className="cont" style={{ display: "none" }}>
          <Menu6 />
        </div>
        <div id="menu4" className="cont" style={{ display: "none" }}>
          <Menu4 />
        </div>
        <div id="menu7" className="cont" style={{ display: "none" }}>
          <Menu7 />
        </div>
        <div id="menu8" className="cont" style={{ display: "none" }}>
          <Menu8 />
        </div>
        <DetailPage />
        <div
          id="detail_loading_circle"
          style={{
            display: "none",
            position: "fixed",
            top: "50%",
            left: "45%",
            zIndex: 3000,
          }}
        >
          <img src={imgA} width="50px" height="50px" alt="loading..." />
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
