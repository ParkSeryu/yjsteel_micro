import React, { PureComponent } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import imgA from "../../images/loading.gif";
import Menu6Search from "./Menu6_Search";

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
    textAlign: "right",
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

class Menu6 extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      itemList: [],
      openSearch: false,
    };
  }

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
        "http://121.165.242.72:5050/yjsteel/Developer/index.php/Menu6/retrieve",
        {
          params: {
            date_f: data.date_f !== null ? data.date_f.replaceAll("/", "") : "",
            date_t: data.date_t !== null ? data.date_t.replaceAll("/", "") : "",
            name_cd: data.name_cd,
            name_nm: data.name_nm,
            stan_cd: data.stan_cd,
            stan_nm: data.stan_nm,
            thick_f: data.thick_f,
            thick_t: data.thick_t,
            width_f: data.width_f,
            width_t: data.width_t,
            maker_cd: data.maker_cd,
            maker_nm: data.maker_nm,
            sell_cust_cd: data.sell_cust_cd,
            sell_cust_nm: data.sell_cust_nm,
            work_cust_cd: data.work_cust_cd,
            relation_cd: data.relation_cd,
            part_cd: data.part_cd,
            out_cls: data.out_cls,
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

  renderList = (index, data, length) => {
    let i = index;
    let result = [];
    for (i; i < length && data.DATA[i].SORT_VAL !== "1"; i++) {
      let name_nm = data.DATA[i].NAME_NM.split("<br>");
      let dtl_info = data.DATA[i].DTL_INFO.split("<br>");
      let quantity_line = data.DATA[i].QUANTITY.split("<br>");
      let weight = data.DATA[i].WEIGHT.split("<br>");
      result.push(
        <table
          style={{
            tableLayout: "fixed",
            width: "100%",
            padding: "10px 0px",
            backgroundColor: "#F5F5F5",
            fontSize: "14px",
            borderBottom: "0.5px solid rgba(0 ,0, 0, .4)",
          }}
        >
          <tbody>
            <tr>
              <td align="left" style={{ width: "25%", paddingLeft: "2px" }}>
                {name_nm[0]}
              </td>
              <td style={{ width: "30%", paddingLeft: "2px" }}>
                {dtl_info[0]}
              </td>
              <td align="right" style={{ width: "20%" }}>
                {quantity_line[0]}
              </td>
              <td align="right" style={{ width: "20%" }}>
                {weight[0]}
              </td>
            </tr>
            <tr>
              <td align="left" style={{ width: "25%", paddingLeft: "2px" }}>
                <span>{name_nm[1]}</span>
              </td>
              <td style={{ width: "30%", paddingLeft: "2px" }}>
                {dtl_info[1]}
              </td>
              <td align="right" style={{ width: "20%" }}>
                {quantity_line[1]}
              </td>
              <td align="right" style={{ width: "20%" }}>
                {weight[1]}
              </td>
            </tr>
            <tr>
              <td align="left" style={{ width: "25%", paddingLeft: "2px" }}>
                <span>{name_nm[2]}</span>
              </td>
              <td style={{ width: "30%", paddingLeft: "2px" }}>
                {dtl_info[2]}
              </td>
              <td align="right" style={{ width: "20%" }}>
                {}
              </td>
              <td align="right" style={{ width: "20%" }}>
                {weight[2]}
              </td>
            </tr>
          </tbody>
        </table>
      );
    }
    return result;
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Menu6Search parentState={this.loadItem} />
        <div className={classes.root}>
          <div className={classes.header}>
            <Grid className={classes.container} container>
              <Grid item xs={4} sm={4}>
                <Paper elevation={0} className={classes.typo_header}>
                  {"매출일"}
                </Paper>
              </Grid>
              <Grid item xs={4} sm={4}>
                <Paper elevation={0} className={classes.typo_header}>
                  {"수요가"}
                </Paper>
              </Grid>
              <Grid item xs={2} sm={2}>
                <Paper elevation={0} className={classes.typoLeft_header}>
                  {"중량"}
                </Paper>
              </Grid>
              <Grid item xs={2} sm={2}>
                <Paper elevation={0} className={classes.typoRight_header}>
                  {"금액"}
                </Paper>
              </Grid>
            </Grid>
          </div>
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
                            fontSize: "15px",
                          }}
                        >
                          <tbody>
                            <td className={classes.td} style={{ width: "25%" }}>
                              <b>{item.SHIP_DATE}</b>
                            </td>
                            <td className={classes.td} style={{ width: "30%" }}>
                              {item.SELL_CUST_NM}
                            </td>
                            <td
                              align="right"
                              className={classes.td}
                              style={{ width: "23%" }}
                            >
                              {item.TOT_WEIGHT}
                            </td>
                            <td
                              align="right"
                              className={classes.td}
                              style={{ width: "22%" }}
                            >
                              {item.TOT_AMOUNT}
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
                          fontSize: "11px",
                        }}
                      >
                        <tbody>
                          <tr>
                            <td
                              align="left"
                              style={{ width: "25%", paddingLeft: "2px" }}
                            >
                              품명/재질/사업장
                            </td>
                            <td
                              align="left"
                              style={{ width: "25%", paddingLeft: "2px" }}
                            >
                              SIZE/제품번호
                            </td>
                            <td align="right" style={{ width: "25%" }}>
                              착지/수량
                            </td>
                            <td align="right" style={{ width: "25%" }}>
                              중량/금액/단가
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
                <Grid item xs={3} sm={3}>
                  <Paper elevation={0} className={classes.typo_footer}>
                    {"합계"}
                  </Paper>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <Paper elevation={0} className={classes.typoLeft_footer}>
                    {numberWithCommas(String(this.state.itemList.TOTAL_WEIGHT))}
                  </Paper>
                </Grid>
                <Grid item xs={5} sm={5}>
                  <Paper elevation={0} className={classes.typoRight_footer}>
                    {numberWithCommas(String(this.state.itemList.TOTAL_AMOUNT))}
                  </Paper>
                </Grid>
              </Grid>
            </div>
          )}
      </div>
    );
  }
}

export default withStyles(useStyles)(Menu6);
