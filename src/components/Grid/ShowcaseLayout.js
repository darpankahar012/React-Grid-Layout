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

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const originalLayout = getFromLS("layout") || [];
console.log("🚀 ~ originalLayout", originalLayout)

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
    };

    this.onAddItem = this.onAddItem.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    let data = JSON.parse(JSON.stringify(originalLayout)).map((obj) => {
      return { ...obj, filp: true };
    });
    // console.log("🚀 ~ file: ShowcaseLayout.js ~ line 62 ~ AddRemoveLayout ~ data ~ data", data)

    // originalLayout.map((obj) => {
    //   return { ...obj, filp: true };
    // })
    // console.log("🚀 ~ file: ShowcaseLayout.js ~ line 67 ~ AddRemoveLayout ~ originalLayout.map ~ originalLayout", originalLayout)

    let setNewValue = originalLayout.length > 0 ? data : [];
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
    this.setState({
      flipData: data,
      items: setNewValue,
    });
  }

  componentDidUpdate(prevProps) {
    //Typical usage, don't forget to compare the props
    if (this.props.widget !== prevProps.widget) {
      if (!this.props.widget?.loading) {
        this.onAddItem();
      }
    }
  }

  createElement(el) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer",
    };
    // const i = el.add ? "+" : el.i;
    const i = el.i;
    return (
      <div key={i} data-grid={el}>
        <div class="container">
          <div class="row">
            {/* {
              el.add ? (
                <center>
                  <span
                    className="add text"
                    onClick={this.onAddItem}
                    title="You can add an item by clicking here, too."
                  >
                    Add +
                  </span>
                </center>
              ) : ( */}
            {/* // <span className="text"> */}
            <ReactCardFlip
              isFlipped={el.filp}
              flipDirection="horizontal"
              flipSpeedBackToFront={0.8}
              flipSpeedFrontToBack={0.8}
            >
              <>
                <div class="col-xl-4">
                  <div class="boxdiv">
                    <DateTimeAxisStockChart />
                    <button onClick={(e) => this.handleClick(e, el)}>
                      Click to flip
                    </button>
                    <div class="wigetoverlay">
                      <span onClick={(e) => this.handleClick(e, el)}>Data</span>
                      <i class="fas fa-trash-alt"></i>
                      <i class="fas fa-sync-alt"></i>
                    </div>
                  </div>
                </div>
              </>

              <>
                <div class="col-xl-12">
                  <div class="boxdiv">
                    <ChartWithZoom />
                    <button onClick={(e) => this.handleClick(e, el)}>
                      Click to flip
                    </button>
                    <div class="wigetoverlay">
                      <span onClick={(e) => this.handleClick(e, el)}>Data</span>
                      <i class="fas fa-trash-alt"></i>
                      <i class="fas fa-sync-alt"></i>
                    </div>
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
            <span
              className="remove"
              style={removeStyle}
              // onClick={el.add != true && this.onRemoveItem.bind(this, i)}
              onClick={this.onRemoveItem.bind(this, i)}
            >
              x
            </span>
          </div>
        </div>
      </div>
    );
  }

  onAddItem() {
    /*eslint no-console: 0*/
    console.log("adding", "n" + this.state.newCounter);
    let newValue = this.state.items.concat({
      i: "n" + this.state.newCounter,
      x: (this.state.items.length * 2) % (this.state.cols || 12),
      y: Infinity, // puts it at the bottom
      minW: 2,
      minH: 2,
      maxW: 4,
      maxH: 4,
      side: 1,
      w: 4,
      h: 4,
      filp: true,
    });
    this.props.onLayoutChange(newValue);
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

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
    this.setState({ layout: layout });
  }
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
    this.setState({ items: _.reject(this.state.items, { i: i }) });
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
    const { openModal, items } = this.state;
    const { widget } = this.props;
    // console.log(
    //   "🚀 ~ file: grid-layout.js:48 ~ ExampleLayout ~ render ~ widget",
    //   widget
    // );
    return (
      <>
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
              </ResponsiveReactGridLayout>
            </section>
          </main>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { data, widget } = {
    data: state.login,
    widget: state.widget,
  };
  return { data, widget };
}

export default connect(mapStateToProps)(AddRemoveLayout);

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
