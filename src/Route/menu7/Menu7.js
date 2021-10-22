import React, { PureComponent } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import imgA from "../../images/loading.gif";
import Menu7Search from "./Menu7_Search";
import InfiniteScroll from "react-infinite-scroll-component";
import Divider from "@material-ui/core/Divider";
import Menu7Detail from "./Menu7_Detail";

const useStyles = (theme) => ({
  root: {
    width: "100%",
    marginTop: "97px",
    marginBottom: "38px",
  },

  td: {
    padding: "1vw",
  },

  circular_progress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
});

let index = 10;
let temp_data = [];

class Menu7 extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      detailItem: [],
      itemList: [],
      temp_item: [],
      openSearchToggle: false,
      openDetail: false,
    };
  }

  componentDidMount() {
    this.setState({
      openSearchToggle: true,
    });
  }

  handleDetailClose = (save_flag) => {
    if (save_flag === "success") {
      this.setState({
        openDetail: false,
      });
      this.loadItem(temp_data);
    } else {
      this.setState({
        openDetail: false,
      });
    }
  };

  handleOnClickData = (item) => {
    this.setState({
      openDetail: true,
      detailItem: item,
    });
  };

  fetchMoreData = () => {
    console.log(index);
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      this.setState({
        temp_item: this.state.temp_item.concat(
          this.state.itemList.DATA.slice(index, index + 10)
        ),
      });
      index = index + 10;
    }, 500);
  };

  loadItem = async (data) => {
    console.log(data);
    temp_data = data;

    this.setState({
      loading: true,
    });

    axios
      .get(
        "http://121.165.242.72:5050/yjsteel/Developer/index.php/Menu7/retrieve",
        {
          params: {
            date_f: data.date_f !== null ? data.date_f.replaceAll("/", "") : "",
            date_t: data.date_t !== null ? data.date_t.replaceAll("/", "") : "",
            sell_cust_cd: data.cust_cd,
            sell_cust_nm: data.cust_nm,
            ship_type_cd: data.ship_type_cd,
            ship_type_nm: data.ship_type_nm,
            dlv_cust_cd: data.dlv_cust_cd,
            dlv_cust_nm: data.dlv_cust_nm,
            maker_cd: data.maker_cd,
            maker_nm: data.maker_nm,
            work_cust_cd: data.work_cust_cd,
            work_cust_nm: data.work_cust_nm,
            login_id: window.sessionStorage.getItem("user_id"),
            player_id: window.sessionStorage.getItem("player_id"),
          },
        }
      )
      .then((response) => {
        //console.log("response data receiving");
        if (response.data.RESULT_CODE === "200") {
          // data라는 이름으로 json 파일에 있는 값에 state값을 바꿔준다.
          this.setState(
            {
              loading: false, // load되었으니 false,
              itemList: response.data, // 비어있던 Itemlist는 data에 Item객체를 찾아넣어준다. (Item : json파일에 있는 항목)
              openSearchToggle: false,
            },
            () => {
              this.setState({
                temp_item: this.state.itemList.DATA.slice(0, 10),
              });
              index = 10;
            }
          );
        } else {
          this.setState({
            loading: false,
            itemList: "",
            openSearchToggle: true,
          });
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
        <Menu7Search parentState={this.loadItem} />
        {this.state.loading === true ? (
          <div className={classes.circular_progress}>
            <img src={imgA} width="50px" height="50px" alt="loading..." />
          </div>
        ) : (
          <div>
            <InfiniteScroll
              style={{ marginTop: "60px" }}
              dataLength={this.state.temp_item.length}
              next={this.fetchMoreData}
              hasMore={true}
              height={"95vh"}
            >
              {this.state.temp_item.map((item, index) => {
                return (
                  <div
                    key={item.SHIP_NO}
                    onClick={() => this.handleOnClickData(item)}
                  >
                    <table
                      style={{
                        width: "100%",
                        fontSize: "15px",
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
                            출고일:
                          </td>
                          <td className={classes.td} style={{ width: "35%" }}>
                            {item.OUT_DATE}
                          </td>
                          <td
                            className={classes.td}
                            style={{ width: "20%", textAlign: "center" }}
                          >
                            출고유형:
                          </td>
                          <td
                            className={classes.td}
                            style={{ width: "15%", textAlign: "center" }}
                          >
                            <b>
                              {item.SHIP_TYPE === "S"
                                ? "매출"
                                : item.SHIP_TYPE === "Q"
                                ? "송품"
                                : "이동"}
                            </b>
                          </td>
                        </tr>
                        <tr>
                          <td className={classes.td} style={{ width: "20%" }}>
                            스캔시간:
                          </td>
                          <td
                            className={classes.td}
                            style={{ width: "35%", color: "blue" }}
                          >
                            {item.SCAN_TIME}
                          </td>
                        </tr>
                        <tr>
                          <td className={classes.td} style={{ width: "20%" }}>
                            사업장:
                          </td>
                          <td className={classes.td} style={{ width: "35%" }}>
                            {item.WORK_CUST_NM}
                          </td>
                        </tr>
                        <tr>
                          <td className={classes.td} style={{ width: "20%" }}>
                            수요가:
                          </td>
                          <td className={classes.td} style={{ width: "35%" }}>
                            {item.SELL_CUST_NM}
                          </td>
                        </tr>
                        <tr>
                          <td className={classes.td} style={{ width: "20%" }}>
                            착지:
                          </td>
                          <td className={classes.td} style={{ width: "35%" }}>
                            {item.DLV_CUST_NM}
                          </td>
                        </tr>
                        <tr>
                          <td className={classes.td} style={{ width: "20%" }}>
                            중량:
                          </td>
                          <td className={classes.td} style={{ width: "35%" }}>
                            {item.TOT_WEIGHT}
                          </td>
                          <td
                            className={classes.td}
                            style={{ width: "20%", textAlign: "center" }}
                          ></td>
                          <td
                            className={classes.td}
                            style={
                              item.APPEND_CLS !== "확인"
                                ? {
                                    color: "red",
                                    width: "15%",
                                    textAlign: "left",
                                  }
                                : {
                                    width: "15%",
                                    textAlign: "left",
                                  }
                            }
                          >
                            <b>{item.APPEND_CLS}</b>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <Divider style={{ margin: "5px 0px" }} />
                  </div>
                );
              })}
            </InfiniteScroll>
          </div>
        )}

        {this.state.openDetail === true && (
          <Menu7Detail
            open={this.state.openDetail}
            onClose={this.handleDetailClose}
            detailItem={this.state.detailItem}
          />
        )}
      </div>
    );
  }
}

export default withStyles(useStyles)(Menu7);
