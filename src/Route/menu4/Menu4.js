import React, { PureComponent } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import imgA from "../../images/loading.gif";
import Menu4Search from "./Menu4_Search";
import Button from "@mui/material/Button";
import Menu4Reg from "./Menu4_Reg";
import InfiniteScroll from "react-infinite-scroll-component";
import Menu4Detail from "./Menu4_Detail";

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
    bottom: 37,
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
    color: "#FFFFFF",
    textAlign: "center",
    backgroundColor: "transparent",
  },

  typoLeft_header: {
    color: "#FFFFFF",
    padding: "5px 0",
    margin: 0,
    paddingLeft: "20px",
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

let index = 30;
let temp_data = [];

class Menu4 extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      itemList: [],
      temp_item: [],
      claim_no: "",
      openSearchToggle: false,
      openClaimRegister: false,
      openDetail: false,
    };
  }

  componentDidMount() {
    this.setState({
      openSearchToggle: false,
    });
  }

  handleButtonClick = () => {
    this.setState({
      openClaimRegister: true,
    });
  };

  handleDialogClose = (retrieveFlag) => {
    if (retrieveFlag === "retrieve") {
      this.loadItem(temp_data);
    }
    this.setState({
      openClaimRegister: false,
    });
  };

  handleDetailClose = (retrieveFlag) => {
    if (retrieveFlag === "retrieve") {
      this.loadItem(temp_data);
    }
    this.setState({
      openDetail: false,
    });
  };

  handleOnClickData = (claim_no) => {
    this.setState({
      openDetail: true,
      claim_no: claim_no,
    });
  };

  fetchMoreData = () => {
    console.log(index);
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      this.setState({
        temp_item: this.state.temp_item.concat(
          this.state.itemList.DATA.slice(index, index + 30)
        ),
      });
      index = index + 30;
    }, 500);
  };

  loadItem = async (data) => {
    console.log(data);
    temp_data = data;

    this.setState({
      loading: true,
    });
    // http://121.165.242.72:5050/yjsteel/Developer/index.php/Menu4/retrieveTest
    axios
      .get(
        "http://121.165.242.72:5050/yjsteel/Developer/index.php/Menu4/retrieve",
        {
          params: {
            date_f: data.date_f !== null ? data.date_f.replaceAll("/", "") : "",
            date_t: data.date_t !== null ? data.date_t.replaceAll("/", "") : "",
            sell_cust_cd: data.sell_cust_cd,
            sell_cust_nm: data.sell_cust_nm,
            bad_cls: data.bad_cls,
            maker_id: data.maker_id,
            maker_nm: data.maker_nm,
            work_cust_cd: data.work_cust_cd,
            work_cust_nm: data.work_cust_nm,
          },
        }
      )
      .then((response) => {
        //console.log("response data receiving");
        if (response.data.RESULT_CODE === "200") {
          // data라는 이름으로 json 파일에 있는 값에 state값을 바꿔준다.
          console.log(response.data);
          this.setState(
            {
              loading: false, // load되었으니 false,
              itemList: response.data, // 비어있던 Itemlist는 data에 Item객체를 찾아넣어준다. (Item : json파일에 있는 항목)
              openSearchToggle: false,
            },
            () => {
              //console.log(this.state.itemList.DATA.slice(0, 40));
              this.setState({
                temp_item: this.state.itemList.DATA.slice(0, 30),
              });
              index = 30;
            }
          );
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
        <Menu4Search parentState={this.loadItem} />
        <div className={classes.root}>
          <div>
            <div className={classes.header}>
              <Grid className={classes.container} container>
                <Grid item xs={3} sm={3}>
                  <Paper elevation={0} className={classes.typo_header}>
                    {"등록일"}
                  </Paper>
                </Grid>
                <Grid item xs={3} sm={3}>
                  <Paper elevation={0} className={classes.typo_header}>
                    {"거래처"}
                  </Paper>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <Paper elevation={0} className={classes.typoLeft_header}>
                    {"담당자명"}
                  </Paper>
                </Grid>
                <Grid item xs={2} sm={2}>
                  <Paper elevation={0} className={classes.typoRight_header}>
                    {"유형"}
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </div>
          {this.state.loading === true ? (
            <div className={classes.circular_progress}>
              <img src={imgA} width="50px" height="50px" alt="loading..." />
            </div>
          ) : (
            <div>
              <InfiniteScroll
                dataLength={this.state.temp_item.length}
                next={this.fetchMoreData}
                hasMore={true}
                height={"80vh"}
              >
                {this.state.temp_item.map((item, index) => {
                  return (
                    <div
                      key={item.CLAIM_NO}
                      onClick={() => this.handleOnClickData(item.CLAIM_NO)}
                    >
                      <table
                        style={{
                          width: "100%",
                          paddingTop: "10px",
                          paddingLeft: "1vw",
                          paddingRight: "1vw",
                          overflowX: "hidden",
                          tableLayout: "fixed",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <tbody>
                          <tr>
                            <td className={classes.td} style={{ width: "20%" }}>
                              <b>{item.CLAIM_DATE.substring(2)}</b>
                            </td>
                            <td
                              className={classes.td}
                              style={{
                                width: "35%",
                                overflowX: "hidden",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {item.SELL_CUST}
                            </td>
                            <td
                              className={classes.td}
                              style={{ width: "22%", textAlign: "center" }}
                            >
                              {item.MAKER_NM}
                            </td>
                            <td
                              className={classes.td}
                              style={{ width: "13%", textAlign: "right" }}
                            >
                              {item.BAD_CLS_NM}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        style={{
                          width: "100%",
                          paddingLeft: "1vw",
                          paddingRight: "1vw",
                          paddingBottom: "10px",
                          borderBottom: "0.5px solid rgba(0 ,0, 0, .4)",
                        }}
                      >
                        <tbody>
                          <tr>
                            <td></td>
                            <td
                              style={{
                                maxWidth: "50px",
                                fontSize: "13px",
                                color: "gray",
                              }}
                            >
                              {item.CLAIM_REASON}
                            </td>
                            <td></td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  );
                })}
              </InfiniteScroll>
            </div>
          )}
          {this.state.loading !== true &&
            this.state.itemList.TOTAL_WEIGHT !== undefined && (
              <div className={classes.footer}>
                <Grid className={classes.container} container>
                  <Grid item xs={3} sm={3}>
                    <Paper elevation={0} className={classes.typo_footer}>
                      {"총 건수"}
                    </Paper>
                  </Grid>
                  <Grid item xs={3} sm={3}>
                    <Paper elevation={0} className={classes.typoLeft_footer}>
                      {numberWithCommas(
                        String(this.state.itemList.TOTAL_QUANTITY) + "건"
                      )}
                    </Paper>
                  </Grid>
                  <Grid item xs={3} sm={3}>
                    <Paper elevation={0} className={classes.typo_footer}>
                      {"총 중량"}
                    </Paper>
                  </Grid>
                  <Grid item xs={3} sm={3}>
                    <Paper elevation={0} className={classes.typoRight_footer}>
                      {numberWithCommas(
                        String(this.state.itemList.TOTAL_WEIGHT)
                      )}
                    </Paper>
                  </Grid>
                </Grid>
              </div>
            )}
          <Button
            fullWidth
            style={{
              position: "fixed",
              bottom: 0,
              backgroundColor: "#68A7DC",
              color: "#FFF",
            }}
            variant="contained"
            onClick={() => this.handleButtonClick()}
          >
            클레임등록
          </Button>
          <Menu4Reg
            open={this.state.openClaimRegister}
            onClose={this.handleDialogClose}
          />

          {this.state.openDetail === true && (
            <Menu4Detail
              open={this.state.openDetail}
              onClose={this.handleDetailClose}
              claimNo={this.state.claim_no}
            />
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(Menu4);
