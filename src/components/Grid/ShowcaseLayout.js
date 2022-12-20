import * as React from "react";
import { connect } from "react-redux";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import BasicModal from "../Modal";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ChartWithIndexLabel from "../Graph/Column Chart with Indexlabel";
import ChartWithZoom from "../Graph/Chart with Zoom";
import DateTimeAxisStockChart from "../Graph/StockChart with Date-Time Axis";
import ReactCardFlip from "react-card-flip";
import LineGraph from "./../Rechart/LineGraph";
import { widgetService } from "../../services";
import {
  resetGetWidgetStatus,
  layoutChangeSuccess,
  resetAddedWidgetData,
  resetaddedWidget,
  getWidgetListSuccess,
} from "../../store/actions";
import GridItemContainer from "./GridItemContainer";
import GridItems from "./GridItems";
import Table from "./../Graph/Table";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const originalLayout = getFromLS("layout") || [];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// function mapStateToProps(state) {
//   const { isAuthenticated } = state.widget
//   return { isAuthenticated }
// }

/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
class AddRemoveLayout extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 100,
    // This turns off compaction so you can place items wherever.
    verticalCompact: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      layout: JSON.parse(JSON.stringify(originalLayout)),
      newCounter: 0,
      openModal: false,
      flipData: [],
      isFlipped: false,
      loaderArray: [],
      refresherData: [],
    };

    this.onAddItem = this.onAddItem.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    let setNewValue = null;
    let data = null;

    // Using Redux
    if (this.props.widgetsListData && this.props.widgetsListData.length > 0) {
      data = this.props.widgetsListData.map((obj) => {
        return {
          ...obj,
          filp: true,
          interval: Math.floor(Math.random() * 6000) + 1000,
        };
      });
      setNewValue = this.props.widgetsListData.length > 0 ? data : [];
      this.setState({
        flipData: data,
        items: setNewValue,
      });
    }
    // console.log("🚀 ~ file: ShowcaseLayout.js ~ line 62 ~ AddRemoveLayout ~ data ~ data", data)

    // originalLayout.map((obj) => {
    //   return { ...obj, filp: true };
    // })
    // console.log("🚀 ~ file: ShowcaseLayout.js ~ line 67 ~ AddRemoveLayout ~ originalLayout.map ~ originalLayout", originalLayout)

    // Using localStorage
    //  data = JSON.parse(JSON.stringify(originalLayout)).map((obj) => {
    //   return { ...obj, filp: true };
    // });
    //  setNewValue = originalLayout.length > 0 ? data : [];
    // let setNewValue =
    //   originalLayout.length > 0
    //     ? data
    //     : [0, 1, 2].map(function (i, key, list) {
    //         return {
    //           i: i.toString(),
    //           x: i * 2,
    //           y: 0,
    //           w: 4,
    //           h: 4,
    //           minW: 2,
    //           minH: 2,
    //           maxW: 4,
    //           maxH: 4,
    //           filp: true,
    //           add: i === list.length - 1,
    //           interval: Math.floor(Math.random() * 6000) + 1000,
    //         };
    //       });
    // this.setState({
    //   flipData: data,
    //   items: setNewValue,
    // });
    if (this.props.data) {
      if (this.props.data.data) this.props.getWidgetList("getWidgets_layout");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    //Typical usage, don't forget to compare the props

    // Add New Widget
    if (this.props.widget.widgetAdded !== prevProps.widget.widgetAdded) {
      if (this.props.widget?.widgetAdded) {
        this.onAddItem(this.props.widgetAddedData);
        setTimeout(() => {
          this.props.resetGetWidgetStatus();
          this.props.resetaddedWidget();
          this.props.resetAddedWidgetData();
        }, 1000);
      }
    }

    if (this.props.widgetsListData !== prevProps.widgetsListData) {
      let setNewValue = null;
      let data = null;
      // Using Redux
      if (this.props.widgetsListData && this.props.widgetsListData.length > 0) {
        data = this.props.widgetsListData.map((obj) => {
          return {
            ...obj,
            interval: Math.floor(Math.random() * 30000) + 6000,
          };
        });
        setNewValue = this.props.widgetsListData.length > 0 ? data : [];
      }
      // console.log("🚀 ~ file: ShowcaseLayout.js:169 ~ AddRemoveLayout ~ componentDidUpdate ~ data", data)
      this.setState({
        flipData: data,
        items: setNewValue,
      });
      // this.setState({
      //   flipData: data,
      //   items: setNewValue,
      //   refresherData: setNewValue,
      // });
    }

    if (this.props.widgetAutoRefreshId !== prevProps.widgetAutoRefreshId) {
      // console.log("🚀 ~ widgetAutoRefreshId IF ");
      this.removeIdLoaderArray(this.props.widgetAutoRefreshId);
      this.newDataArray();
    }

    if (this.props.widgetData.data !== prevProps.widgetData.data) {
      // console.log("🚀 ~ widgetData IF ");
      if (this.props.widgetData.widgetAdded) {
        // console.log("🚀 ~ widgetAdded IF ");
        // this.addLoaderKey(this.props.widgetData.data.id);
        this.newDataArray();
      }
    }

    // Remove Widget From refresherData Array
    // if (this.props.widgetLayout !== prevProps.widgetLayout) {
    //   if (this.props.widgetLayout.length > 0) {
    //     let check = this.props.widgetLayout.map((el) => {
    //       return this.state.refresherData.find((obj) => obj.id === el.i);
    //     });
    //     // console.log(
    //     //   "🚀 ~ file: ShowcaseLayout.js:183 ~ AddRemoveLayout ~ check ~ check",
    //     //   check
    //     // );
    //   } else {
    //     // return this.setState({
    //     //   refresherData: [],
    //     // });
    //   }
    // }

    // if (this.state.items !== prevState.items) {
    //   console.log(
    //     "🚀 ~ componentDidUpdate ~ this.state.items",
    //     this.state.items
    //   );
    // this.props.layoutChangeSuccess(this.state.items);
    // }
  }

  // addLoaderKey = (id) => {
  //   console.log("id", id);
  //   // let check = this.state.loaderArray;
  //   // if (check.length > 0 && !check.includes(id)) {
  //   //   console.log("addLoaderKey ~ if");
  //   //   check.push(id);
  //   //   this.setState({ loaderArray: check });
  //   // } else {
  //   //   console.log("🚀 ~ file: ShowcaseLayout.js:183 ~ AddRemoveLayout ~ check", check)
  //   //   console.log("addLoaderKey ~ else");
  //   this.setState({ loaderArray: [id] });
  //   // }
  // };

  addLoaderKey = (id) => {
    // console.log("addLoaderKey", id);
    let check = this.state.loaderArray;
    if (!check.includes(id) && !this.props.widgetData.widgetAdded) {
      check.push(id);
      this.setState({ loaderArray: check });
    }
  };

  removeIdLoaderArray = (id) => {
    // console.log("---------------> removeIdLoaderArray - id", id);
    let check = this.state.loaderArray;
    if (id) {
      this.setState({ loaderArray: check.filter((item) => item !== id) });
    }
  };

  newDataArray = () => {
    let oldVal = this.state.refresherData;

    let widgetId = this.props.widgetData.widgetAdded
      ? this.props.widgetData.data.id
      : this.props.widgetAutoRefreshId;
    let autoWidgetData = this.props.widgetData.widgetAdded
      ? this.props.widgetData.data
      : this.props.widgetAutoRefreshData;

    // console.log("🚀 ~ AddRemoveLayout ~ widgetId", widgetId);
    // console.log("🚀 ~ AddRemoveLayout ~ autoWidgetData", autoWidgetData);
    if (oldVal.length > 0) {
      console.log("MAIN IF");
      if (oldVal.some((vendor) => vendor.id === widgetId)) {
        console.log("LENGTH IF");
        const findIndex = oldVal.findIndex((val) => val.id === widgetId);
        oldVal[findIndex] = autoWidgetData;
        return this.setState({
          refresherData: oldVal,
        });
      } else {
        console.log("LENGTH ELSE");
        if (autoWidgetData) {
          oldVal.push(autoWidgetData);
          return this.setState({
            refresherData: oldVal,
          });
        }
      }
    } else {
      console.log("MAIN ELSE");
      if (autoWidgetData) {
        return this.setState({
          refresherData: [autoWidgetData],
        });
      }
    }
  };

  createElement(el) {
    // console.log(
    //   "🚀 ~ file: ShowcaseLayout.js:280 ~ AddRemoveLayout ~ createElement ~ el",
    //   el
    // );
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer",
    };

    let style = {
      width: "479px",
      height: "310px",
      position: "absolute",
      touchAction: "none",
    };
    // const i = el.add ? "+" : el.i;
    const i = el.i;
    // console.log(
    //   "🚀 ~ file: ShowcaseLayout.js:168 ~ AddRemoveLayout ~ createElement ~ el",
    //   el
    // );

    return (
      <div key={i} data-grid={el}>
        <div class="full_height">
          <ReactCardFlip
            isFlipped={el.filp}
            flipDirection="horizontal"
            flipSpeedBackToFront={0.8}
            flipSpeedFrontToBack={0.8}
          >
            <>
              <div class={"boxdiv"}>
                {/* <DateTimeAxisStockChart el={el} /> */}
                <Table
                  el={el}
                  arrayData={this.state.refresherData}
                  addLoaderKey={(id) => this.addLoaderKey(id)}
                  loaderArray={this.state.loaderArray}
                />
                {/* <button onClick={(e) => this.handleClick(e, el)}>
                    Click to flip
                  </button> */}
                <div class="wigetoverlay">
                  <span onClick={(e) => this.handleClick(e, el)}>Graph</span>
                  <i
                    class="fas fa-trash-alt"
                    onClick={this.onRemoveItem.bind(this, i)}
                  ></i>
                  {/* <i class="fas fa-sync-alt"></i> */}
                </div>
              </div>
            </>

            <>
              {/* <div style={{ flex: 1 }}> */}
              <div class={"boxdiv"}>
                <ChartWithZoom
                  el={el}
                  addLoaderKey={(id) => this.addLoaderKey(id)}
                  loaderArray={this.state.loaderArray}
                  arrayData={this.state.refresherData}
                />
                {/* <LineGraph /> */}
                {/* <ChartWithZoom /> */}

                {/* <button onClick={(e) => this.handleClick(e, el)}>
                    Click to flip
                  </button> */}
                <div class="wigetoverlay">
                  <span onClick={(e) => this.handleClick(e, el)}>Data</span>
                  <i
                    class="fas fa-trash-alt"
                    onClick={this.onRemoveItem.bind(this, i)}
                  ></i>
                  {/* <i class="fas fa-sync-alt"></i> */}
                </div>
              </div>
            </>
          </ReactCardFlip>

          {/* // el.i === "0" ? (
                //   <DateTimeAxisStockChart />
                // ) : (
                //   <ChartWithZoom />
              ) */}
          {/* // </span> */}
          {/* } */}
          {/* <span
            className="remove"
            style={removeStyle}
            // onClick={el.add != true && this.onRemoveItem.bind(this, i)}
            onClick={this.onRemoveItem.bind(this, i)}
          >
            x
          </span> */}
        </div>
      </div>
    );
  }

  onAddItem(data) {
    // console.log(
    //   "🚀 ~ file: ShowcaseLayout.js:269 ~ AddRemoveLayout ~ onAddItem ~ this.state.items",
    //   this.state.items
    // );
    /*eslint no-console: 0*/
    // console.log("adding", "n" + this.state.newCounter);
    let newValue = [];
    if (this.state.items && this.state.items.length > 0) {
      let arry = this.state.items;
      let lastElement = arry[arry.length - 1].i;
      let lastElementXVal = parseInt(arry[arry.length - 1].x) + 3;
      console.log("🚀 ~ X", lastElementXVal);
      let lastElementYVal = parseInt(arry[arry.length - 1].y);
      console.log("🚀 ~ Y", lastElementYVal);
      let lastIndex = parseInt(lastElement.match(/\d+/)[0]) + 1;

      newValue = this.state.items.concat({
        i: "n" + lastIndex,
        x: lastElementXVal % (this.state.cols || 12),
        // x: 3,
        y: lastElementYVal, // puts it at the bottom
        minW: 2,
        minH: 2,
        // maxW: 4,
        maxH: 4,
        side: 1,
        w: 3,
        h: 3,
        filp: true,
        intervalValue: data.intervalValue,
        key: data.key,
        label: data.label,
        type: data.type,
      });
    } else {
      newValue.push({
        i: "n" + 0,
        x: (0 * 2) % (this.state.cols || 12),
        y: 0, // puts it at the bottom
        minW: 2,
        minH: 2,
        // maxW: 4,
        // maxH: 4,
        side: 1,
        w: 3,
        h: 3,
        filp: true,
        intervalValue: data.intervalValue,
        key: data.key,
        label: data.label,
        type: data.type,
      });
    }
    console.log(
      "🚀 ~ file: ShowcaseLayout.js:308 ~ AddRemoveLayout ~ onAddItem ~ newValue",
      newValue
    );
    this.props.onLayoutChange(newValue);
    this.props.layoutChangeSuccess(newValue);
    this.setState({
      // openModal: false,
      // Add a new item. It must have a unique key!
      items: newValue,
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1,
    });
  }

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols,
    });
  }

  // onLayoutChange(layout) {
  //   console.log("🚀 ~ onLayoutChange ~ layout", layout);
  //   this.props.onLayoutChange(layout);
  //   this.setState({ layout: layout });
  // }
  changeState(e) {
    e.preventDefault();
    const { openModal } = this.state;
    this.setState({ openModal: true });
  }

  handleClick(e, el) {
    e.preventDefault();
    let oldData = this.state.items;
    const findIndex = oldData.findIndex((val) => {
      return val.i === el.i;
    });
    const checkValue = oldData.find((val) => val.i === el.i);
    // const addValToLastIndex = oldData[oldData.length - 1];
    const changeValue = { ...checkValue, filp: !checkValue.filp };
    oldData[findIndex] = changeValue;
    this.props.layoutChangeSuccess(oldData);
    this.setState((prevState) => ({ ...prevState, items: oldData }));
    this.forceUpdate();
  }

  resetState(i) {
    this.setState({ items: [] });
    const old = [0, 1, 2].map(function (i, key, list) {
      return {
        i: i.toString(),
        x: i * 2,
        y: 0,
        w: 4,
        h: 4,
        minW: 2,
        minH: 2,
        maxW: 4,
        maxH: 4,
        side: 1,
        add: i === list.length - 1,
      };
    });
    this.setState({ items: old });
    this.props.onLayoutChange(old);
  }
  onRemoveItem(i) {
    // console.log("this.state.items", this.state.items);
    console.log("removing", i);
    let newArray = _.reject(this.state.items, { i: i });

    let childCompArray = _.reject(this.state.refresherData, { id: i });
    // console.log(
    //   "🚀 ~ fWile: ShowcaseLayout.js:506 ~ onRemoveItem ~ childCompArray",
    //   childCompArray
    // );
    this.setState({
      refresherData: childCompArray,
    });

    this.props.getWidgetListSuccess({
      value: newArray,
      message: "Widget data",
    });
    this.setState({ items: newArray });
  }

  onResize(layout, oldLayoutItem, layoutItem, placeholder) {
    // console.log("🚀 ~ onResize ~ layoutItem", layoutItem);
    // `oldLayoutItem` contains the state of the item before the resize.
    // You can modify `layoutItem` to enforce constraints.

    if (layoutItem.h < 4 && layoutItem.w > 3) {
      layoutItem.w = 3;
      placeholder.w = 3;
      layoutItem.h = 3;
      placeholder.h = 3;
    }

    if (layoutItem.h >= 3 && layoutItem.w < 3) {
      layoutItem.w = 3;
      placeholder.w = 3;
      layoutItem.h = 3;
      placeholder.h = 3;
    }
  }

  render() {
    const { openModal, items, refresherData } = this.state;
    // console.log(
    //   "🚀 ~ file: ShowcaseLayout.js:465 ~ render ~ refresherData",
    //   refresherData
    // );
    // const { widget } = this.props;
    // console.log("🚀 ~ file: ShowcaseLayout.js:319 ~ AddRemoveLayout ~ render ~ widget", widget.widgetsListData.value
    // )
    // console.log("🚀 ~ file: render ~ widget", items);
    // console.log("🚀 ~ file: loaderArray", this.state.loaderArray);

    return (
      <>
        {this.props.widgetsListLoading ? (
          // <h3>Loading</h3>
          <i class="fas fa-spinner fa-pulse"></i>
        ) : (
          <div>
            <main>
              <section class="comnpadding wigetbox">
                <ResponsiveReactGridLayout
                  onLayoutChange={this.onLayoutChange}
                  onBreakpointChange={this.onBreakpointChange}
                  onResize={this.onResize}
                  breakpoints={{ lg: 1280, md: 992, sm: 767, xs: 480, xxs: 0 }}
                  cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                  {...this.props}
                >
                  {_.map(this.state.items, (el) => this.createElement(el))}
                  {/* {this.state.items &&
                  this.state.items.map((item) => (
                    <GridItems key={item} item={item} />
                  ))} */}
                  {/* {this.state.items &&
                  this.state.items.map((item) => (
                    <GridItemContainer key={item} item={item} />
                  ))} */}
                </ResponsiveReactGridLayout>
              </section>
            </main>
          </div>
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  const {
    data,
    widget,
    widgetsListData,
    saveWidgetsListLoading,
    widgetsListLoading,
    widgetAddedData,
    widgetAutoRefreshId,
    widgetAutoRefreshData,
    widgetData,
    widgetLayout,
  } = {
    data: state.login,
    widget: state.widget,
    widgetsListData: state.widget.widgetsListData.value,
    saveWidgetsListLoading: state.widget.saveWidgetsListLoading,
    widgetsListLoading: state.widget.widgetsListLoading,
    saveWidgetsListData: state.widget.saveWidgetsListData,
    widgetAddedData: state.widget.widgetAddedData,
    widgetAutoRefreshId: state.widget.widgetAutoRefresh.id,
    widgetAutoRefreshData: state.widget.widgetAutoRefresh,
    widgetData: state.widget,
    widgetLayout: state.layout.data,
  };
  return {
    data,
    widget,
    widgetsListData,
    saveWidgetsListLoading,
    widgetsListLoading,
    widgetAddedData,
    widgetAutoRefreshId,
    widgetAutoRefreshData,
    widgetData,
    widgetLayout,
  };
}

const mapDispatchToProps = (dispatch) => ({
  getWidgetList: (req) => {
    dispatch(widgetService.getWidgetList(req));
  },
  resetGetWidgetStatus: () => {
    dispatch(resetGetWidgetStatus());
  },
  resetaddedWidget: () => {
    dispatch(resetaddedWidget());
  },
  resetAddedWidgetData: () => {
    dispatch(resetAddedWidgetData());
  },
  layoutChangeSuccess: (data) => {
    dispatch(layoutChangeSuccess(data));
  },
  getWidgetListSuccess: (data) => {
    dispatch(getWidgetListSuccess(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRemoveLayout);

// export default AddRemoveLayout;
// export default connect(mapStateToProps)(AddRemoveLayout);

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-7")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}
