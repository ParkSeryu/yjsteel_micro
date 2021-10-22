import React, { PureComponent } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import imgA from "../../images/loading.gif";
import Menu1Search from "./Menu1_Search";

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const useStyles = (theme) => ({
  root: {
    width: "100%",
    marginTop: "97px",
    marginBottom: "38px",
  },

  td: {
    padding: "1vw",
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

  footer: {
    position: "fixed",
    width: "100%",
    height: "35px",
    backgroundColor: "#DADADA",
    color: "white",
    bottom: 0,
  },

  circular_progress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },

  typo_header: {
    padding: "5px 0",
    margin: 0,
    paddingRight: "40px",
    color: "#FFFFFF",
    textAlign: "center",
    backgroundColor: "transparent",
  },

  typoLeft_header: {
    color: "#FFFFFF",
    padding: "5px 0",
    margin: 0,
    paddingRight: "20px",
    textAlign: "center",
    backgroundColor: "transparent",
  },

  typoRight_header: {
    color: "#FFFFFF",
    padding: "5px 0",
    margin: 0,
    textAlign: "center",
    backgroundColor: "transparent",
  },

  typo_footer: {
    padding: "5px 0",
    paddingRight: "20px",
    margin: 0,
    color: "#000000",
    textAlign: "center",
    backgroundColor: "transparent",
  },

  typoLeft_footer: {
    color: "#000000",
    padding: "5px 0",
    margin: 0,
    textAlign: "center",
    backgroundColor: "transparent",
  },

  typoRight_footer: {
    color: "#000000",
    padding: "5px 0",
    margin: 0,
    paddingRight: "30px",
    textAlign: "center",
    backgroundColor: "transparent",
  },
});

const nullCheck = (text) => {
  if (text === null) return "-";
  else return text;
};

const nullCheckZero = (text) => {
  if (text === null) return "0";
  else return text;
};

class Menu1 extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      itemList: [],
      openSearch: false,
    };
  }

  renderList = (index, data, length) => {
    let i = index;
    let result = [];
    for (i; i < length && data.DATA[i].SORT_VAL !== "1"; i++) {
      let stock_status = data.DATA[i].STOCK_STATUS;
      result.push(
        <table
          id={
            data.DATA[i].WORK_CUST_CD +
            "#" +
            data.DATA[i].COIL_NO +
            "#" +
            data.DATA[i].COIL_SEQ
          }
          onClick={(e) => this.handleListClick(e.currentTarget.id)}
          style={
            stock_status === "R"
              ? {
                  tableLayout: "fixed",
                  width: "100%",
                  padding: "10px 0px",
                  fontSize: "14px",
                  borderBottom: "0.5px solid rgba(0 ,0, 0, .4)",
                  backgroundColor: "#6EE6E6",
                }
              : stock_status === "B"
              ? {
                  tableLayout: "fixed",
                  width: "100%",
                  padding: "10px 0px",
                  fontSize: "14px",
                  borderBottom: "0.5px solid rgba(0 ,0, 0, .4)",
                  backgroundColor: "#FA5858",
                }
              : stock_status === "J"
              ? {
                  tableLayout: "fixed",
                  width: "100%",
                  padding: "10px 0px",
                  fontSize: "14px",
                  borderBottom: "0.5px solid rgba(0 ,0, 0, .4)",
                  backgroundColor: "#37E664",
                }
              : {
                  tableLayout: "fixed",
                  width: "100%",
                  padding: "10px 0px",
                  fontSize: "14px",
                  borderBottom: "0.5px solid rgba(0 ,0, 0, .4)",
                }
          }
        >
          <tbody>
            <tr>
              <td align="center" style={{ width: "20%" }}>
                {data.DATA[i].CODE_NM}
              </td>
              <td align="center" style={{ width: "14%" }}>
                {nullCheck(data.DATA[i].OIL_NM)}
              </td>
              <td style={{ width: "14%" }}>
                {nullCheck(data.DATA[i].AFTER_PROC_NM)}
              </td>
              <td style={{ width: "10%" }}>
                {" "}
                {nullCheckZero(data.DATA[i].YP)}
              </td>
              <td style={{ width: "10%" }}>
                {" "}
                {nullCheckZero(data.DATA[i].TS)}
              </td>
              <td style={{ width: "10%" }}>
                {" "}
                {nullCheckZero(data.DATA[i].EL)}
              </td>
              <td align="center" style={{ width: "12%" }}>
                {data.DATA[i].SUMMARY_QUANTITY_VAL}
              </td>
              <td align="right" style={{ width: "16%", paddingRight: "5px" }}>
                {data.DATA[i].STOCK_WEIGHT}
              </td>
            </tr>
            <tr>
              <td style={{ width: "20%" }}> {data.DATA[i].WORK_CUST_NM}</td>
              <td style={{ width: "14%" }}></td>
              <td style={{ width: "14%" }}></td>
              <td style={{ width: "10%" }}> {nullCheckZero(data.DATA[i].C)}</td>
              <td style={{ width: "10%" }}>
                {" "}
                {nullCheckZero(data.DATA[i].SI)}
              </td>
              <td style={{ width: "10%" }}>
                {" "}
                {nullCheckZero(data.DATA[i].MN)}
              </td>
              <td align="center" style={{ width: "12%" }}></td>
              <td align="right" style={{ width: "16%", paddingRight: "5px" }}>
                {data.DATA[i].BUY_UNIT_PRICE}
              </td>
            </tr>
          </tbody>
        </table>
      );
    }
    return result;
  };

  handleListClick = (id) => {
    console.log(id);
    let strArray = id.split("#");
    let work_cust_cd = strArray[0];
    let coil_no = strArray[1];
    let coil_seq = strArray[2];
    console.log(work_cust_cd + "  " + coil_no + "  " + coil_seq);
    document.getElementById("detail_loading_circle").style.display = "block";
    const instance = axios.create({
      timeout: 3000,
    });

    instance
      .get(
        "http://121.165.242.72:5050/yjsteel/Developer/index.php/Menu1/detail",
        {
          params: {
            work_cust_cd: work_cust_cd,
            coil_no: coil_no,
            coil_seq: coil_seq,
          },
        }
      )
      .then((response) => {
        console.log(response.data.DATA);

        document.getElementById("detailTitle").textContent = "소재재고현황";
        document.getElementById("work_cust_nm").textContent = nullCheck(
          response.data.DATA.WORK_CUST_NM
        );
        document.getElementById("yard_cust_nm").textContent = nullCheck(
          response.data.DATA.YARD_CUST_NM
        );
        document.getElementById("im_cls").textContent = nullCheck(
          response.data.DATA.IM_CLS
        );
        document.getElementById("in_date").textContent = nullCheck(
          response.data.DATA.IN_DATE
        );
        document.getElementById("coil_no").textContent = nullCheck(
          response.data.DATA.COIL_NO + "-" + response.data.DATA.COIL_SEQ
        );
        document.getElementById("pack_no").textContent = nullCheck(
          response.data.DATA.PACK_NO
        );
        document.getElementById("name_nm").textContent = nullCheck(
          response.data.DATA.NAME_NM
        );
        document.getElementById("stan_nm").textContent = nullCheck(
          response.data.DATA.STAN_NM
        );
        document.getElementById("size_no").textContent = nullCheck(
          response.data.DATA.SIZE_NO
        );
        document.getElementById("pos_nm").textContent = nullCheck(
          response.data.DATA.POS_NM
        );
        document.getElementById("sell_cust_nm").textContent = nullCheck(
          response.data.DATA.SELL_CUST_NM
        );
        document.getElementById("stock_quantity").textContent = nullCheck(
          response.data.DATA.STOCK_QUANTITY
        );
        document.getElementById("stock_weight").textContent = nullCheck(
          response.data.DATA.STOCK_WEIGHT
        );
        document.getElementById("stock_weight_day").textContent = nullCheck(
          response.data.DATA.STOCK_WEIGHT_DAY
        );
        document.getElementById("stock_coil_length").textContent = nullCheck(
          response.data.DATA.STOCK_COIL_LENGTH
        );
        document.getElementById("buy_type_nm").textContent = nullCheck(
          response.data.DATA.BUY_TYPE_NM
        );
        document.getElementById("buy_cust_nm").textContent = nullCheck(
          response.data.DATA.BUY_CUST_NM
        );
        document.getElementById("buy_unit_price").textContent = nullCheckZero(
          response.data.DATA.BUY_UNIT_PRICE
        );
        document.getElementById("bad_type_nm").textContent = nullCheck(
          response.data.DATA.BAD_TYPE_NM
        );
        document.getElementById("color_nm").textContent = nullCheck(
          response.data.DATA.COLOR_NM
        );
        document.getElementById("C").textContent = nullCheckZero(
          response.data.DATA.C
        );
        document.getElementById("Si").textContent = nullCheckZero(
          response.data.DATA.SI
        );
        document.getElementById("Mn").textContent = nullCheckZero(
          response.data.DATA.MN
        );
        document.getElementById("YP").textContent = nullCheckZero(
          response.data.DATA.YP
        );
        document.getElementById("TS").textContent = nullCheckZero(
          response.data.DATA.TS
        );
        document.getElementById("EL").textContent = nullCheckZero(
          response.data.DATA.EL
        );
        document.getElementById("remark").textContent = nullCheck(
          response.data.DATA.REAMRK
        );
        document.getElementById("modal").style.display = "block";
        document.body.style.touchAction = "none";
        document.getElementById("detail_loading_circle").style.display = "none";
      })
      .catch((e) => {
        console.log(e);
        alert("네트워크 에러입니다. 데이터 연결을 확인해 주세요");
      });
  };

  componentDidMount() {
    this.setState({
      openSearchToggle: true,
    });
  }

  loadItem = async (data) => {
    console.log(data);

    this.setState({
      loading: true,
    });

    axios
      .get(
        "http://121.165.242.72:5050/yjsteel/Developer/index.php/Menu1/retrieve",
        {
          params: {
            im_cls: data.im_cls,
            name_cd: data.name_cd,
            name_nm: data.name_nm,
            stan_cd: data.stan_cd,
            stan_nm: data.stan_nm,
            work_cust_cd: data.work_cust_cd,
            work_cust_nm: data.work_cust_nm,
            thick_f: data.thick_f,
            thick_t: data.thick_t,
            width_f: data.width_f,
            width_t: data.width_t,
            sell_cust_cd: data.sell_cust_cd,
            sell_cust_nm: data.sell_cust_nm,
            stock_cls: data.stock_cls,
            type_cls: data.type_cls,
          },
        }
      )
      .then((response) => {
        //console.log("response data receiving");
        if (response.data.RESULT_CODE === "200") {
          // data라는 이름으로 json 파일에 있는 값에 state값을 바꿔준다.
          this.setState({
            loading: false, // load되었으니 false,
            itemList: response.data, // 비어있던 Itemlist는 data에 Item객체를 찾아넣어준다. (Item : json파일에 있는 항목)
            openSearchToggle: false,
          });
        } else {
          alert(
            "조회된 내역이 없습니다.",
            this.setState({
              loading: false,
              itemList: "",
              openSearchToggle: true,
            })
          );
        }
      })
      .catch((e) => {
        console.error(e); // 에러표시
        this.setState({
          loading: false, // 이때는 load 가 false 유지
        });
      });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Menu1Search parentState={this.loadItem} />
        <div className={classes.header}>
          <Grid className={classes.container} container>
            <Grid item xs={4} sm={4}>
              <Paper elevation={0} className={classes.typo_header}>
                {"품명"}
              </Paper>
            </Grid>
            <Grid item xs={4} sm={4}>
              <Paper elevation={0} className={classes.typo_header}>
                {"사이즈"}
              </Paper>
            </Grid>
            <Grid item xs={2} sm={2}>
              <Paper elevation={0} className={classes.typoLeft_header}>
                {"수량"}
              </Paper>
            </Grid>
            <Grid item xs={2} sm={2}>
              <Paper elevation={0} className={classes.typoRight_header}>
                {"중량"}
              </Paper>
            </Grid>
          </Grid>
        </div>
        <div className={classes.root}>
          {this.state.loading === true ? (
            <div className={classes.circular_progress}>
              <img src={imgA} width="50px" height="50px" alt="loading..." />
            </div>
          ) : (
            this.state.itemList.length !== 0 &&
            this.state.itemList.DATA.map((item, index) => {
              if (item.SORT_VAL === "1") {
                return (
                  <div key={index}>
                    <details>
                      <summary>
                        <table
                          style={{
                            width: "100%",
                            padding: "10px 1vw",
                            borderBottom: "0.5px solid rgba(0 ,0, 0, .4)",
                            overflowX: "hidden",
                            tableLayout: "fixed",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <tbody>
                            <td className={classes.td} style={{ width: "30%" }}>
                              <b>{item.NAME_NM}</b>
                            </td>
                            <td className={classes.td} style={{ width: "35%" }}>
                              {item.SIZE_VAL}
                            </td>
                            <td
                              align="right"
                              className={classes.td}
                              style={{ width: "13%" }}
                            >
                              {item.STOCK_QUANTITY}
                            </td>
                            <td
                              align="right"
                              className={classes.td}
                              style={{ width: "22%" }}
                            >
                              {item.STOCK_WEIGHT}
                            </td>
                          </tbody>
                        </table>
                      </summary>
                      <table
                        style={{
                          width: "100%",
                          padding: "10px 0px",
                          borderBottom: "0.5px solid rgba(0 ,0, 0, .4)",
                          tableLayout: "fixed",
                          background: "#E4E4E4",
                          fontSize: "13px",
                        }}
                      >
                        <tbody>
                          <tr>
                            <td
                              align="center"
                              style={{ width: "20%", left: "15px" }}
                            >
                              재질
                            </td>
                            <td align="center" style={{ width: "14%" }}>
                              도유
                            </td>
                            <td style={{ width: "14%" }}>후처리</td>
                            <td style={{ width: "10%" }}>YP</td>
                            <td style={{ width: "10%" }}>TS</td>
                            <td style={{ width: "10%" }}>EL</td>
                            <td align="center" style={{ width: "12%" }}>
                              수량
                            </td>
                            <td
                              align="right"
                              style={{ width: "16%", paddingRight: "5px" }}
                            >
                              중량
                            </td>
                          </tr>
                        </tbody>
                        <tbody>
                          <tr>
                            <td align="center" style={{ width: "20%" }}>
                              사업장
                            </td>
                            <td style={{ width: "14%" }}></td>
                            <td style={{ width: "14%" }}></td>
                            <td style={{ width: "10%" }}>C</td>
                            <td style={{ width: "10%" }}>Si</td>
                            <td style={{ width: "10%" }}>Mn</td>
                            <td align="center" style={{ width: "12%" }}></td>
                            <td
                              align="right"
                              style={{ width: "16%", paddingRight: "5px" }}
                            >
                              매입단가
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      {this.renderList(
                        index + 1,
                        this.state.itemList,
                        this.state.itemList.DATA.length,
                        classes
                      )}
                    </details>
                  </div>
                );
              }
            })
          )}
        </div>
        {this.state.loading !== true &&
          this.state.itemList.TOTAL_WEIGHT !== undefined && (
            <div className={classes.footer}>
              <Grid className={classes.container} container>
                <Grid item xs={6} sm={6}>
                  <Paper elevation={0} className={classes.typo_footer}>
                    {"합계"}
                  </Paper>
                </Grid>
                <Grid item xs={3} sm={3}>
                  <Paper elevation={0} className={classes.typoLeft_footer}>
                    {numberWithCommas(
                      String(this.state.itemList.TOTAL_QUANTITY)
                    )}
                  </Paper>
                </Grid>
                <Grid item xs={3} sm={3}>
                  <Paper elevation={0} className={classes.typoRight_footer}>
                    {numberWithCommas(String(this.state.itemList.TOTAL_WEIGHT))}
                  </Paper>
                </Grid>
              </Grid>
            </div>
          )}
      </div>
    );
  }
}

export default withStyles(useStyles)(Menu1);
