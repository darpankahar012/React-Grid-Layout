import * as React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import BasicModal from "./Modal";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ChartWithIndexLabel from "./Graph/Column Chart with Indexlabel";
import ChartWithZoom from "./Graph/Chart with Zoom";
import DateTimeAxisStockChart from "./Graph/StockChart with Date-Time Axis";
import ReactCardFlip from "react-card-flip";

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

    let setNewValue =
      originalLayout.length > 0
        ? data
        : [0, 1, 2].map(function (i, key, list) {
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
              filp: true,
              add: i === list.length - 1,
              interval: Math.floor(Math.random() * 6000) + 1000,
            };
          });
    this.setState({
      flipData: data,
      items: setNewValue,
    });
  }

  createElement(el) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer",
    };
    const i = el.add ? "+" : el.i;
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
                          <span onClick={(e) => this.handleClick(e, el)}>
                            Data
                          </span>
                          <i class="fas fa-trash-alt"></i>
                          <i class="fas fa-sync-alt"></i>
                        </div>
                      </div>
                    </div>
                  </>

                  <>
                    <ChartWithZoom />
                    <button onClick={(e) => this.handleClick(e, el)}>
                      Click to flip
                    </button>
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
              onClick={el.add != true && this.onRemoveItem.bind(this, i)}
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
    console.log("removing", i);
    this.setState({ items: _.reject(this.state.items, { i: i }) });
  }

  onResize(layout, oldLayoutItem, layoutItem, placeholder) {
    console.log("🚀 ~ onResize ~ layoutItem", layoutItem);
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
    // console.log(
    //   "🚀 ~ file: ShowcaseLayout.js ~ line 266 ~ AddRemoveLayout ~ render ~ items",
    //   items
    // );
    return (
      <>
        <div>
          {/* <button onClick={this.onAddItem}>Add Item</button> */}
          {/* <form class="form-inline" onsubmit="openModal()" id="myForm">
            <button
              onClick={(e) => this.changeState(e)}
              type="submit"
              class="btn btn-primary"
            >
              Add Item
            </button>
          </form> */}

          {/* <div>
            <Button onClick={(e) => this.resetState(e)}>Reset</Button>
            <Button onClick={(e) => this.changeState(e)}>Open modal</Button>
            <Modal
              open={openModal}
              onClose={() => this.setState({ openModal: false })}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <button
                  onClick={(e) => this.onAddItem(e)}
                  type="submit"
                  class="btn btn-primary"
                >
                  Add Item
                </button>
              </Box>
            </Modal>
          </div> */}
          {/* <main>
            <section class="comnpadding wigetbox">
              <div class="container">
                <div class="row">
                  <div class="col-xl-4">
                    <div class="boxdiv">
                      <img src="../../assets/images/graph-1.jpg" alt="" />
                      <div class="wigetoverlay">
                        <span>Data</span>
                        <i class="fas fa-trash-alt"></i>
                        <i class="fas fa-sync-alt"></i>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-4">
                    <div class="boxdiv">
                      <table>
                        <tr>
                          <th>Author</th>
                          <th>Title</th>
                          <th>Genre</th>
                          <th>Pages</th>
                        </tr>
                        <tr>
                          <td>Karen M. McManus</td>
                          <td>One of Us Is Lying</td>
                          <td>Young Adult Fiction</td>
                          <td>368</td>
                        </tr>

                        <tr>
                          <td>Karen M. McManus</td>
                          <td>One of Us Is Next</td>
                          <td>Young Adult Fiction</td>
                          <td>377</td>
                        </tr>
                        <tr>
                          <td>Karen M. McManus</td>
                          <td>One of Us Is Lying</td>
                          <td>Young Adult Fiction</td>
                          <td>368</td>
                        </tr>

                        <tr>
                          <td>Karen M. McManus</td>
                          <td>One of Us Is Next</td>
                          <td>Young Adult Fiction</td>
                          <td>377</td>
                        </tr>
                      </table>
                      <div class="wigetoverlay">
                        <span>Chart</span>
                        <i class="fas fa-trash-alt"></i>
                        <i class="fas fa-sync-alt"></i>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-4">
                    <div class="boxdiv">
                      <img src="../../assets/images/graph-3.jpg" alt="" />
                      <div class="wigetoverlay">
                        <span>Data</span>
                        <i class="fas fa-trash-alt"></i>
                        <i class="fas fa-sync-alt"></i>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-4">
                    <div class="boxdiv">
                      <table>
                        <tr>
                          <th>Author</th>
                          <th>Title</th>
                          <th>Genre</th>
                          <th>Pages</th>
                        </tr>

                        <tr>
                          <td>Karen M. McManus</td>
                          <td>One of Us Is Lying</td>
                          <td>Young Adult Fiction</td>
                          <td>368</td>
                        </tr>

                        <tr>
                          <td>Karen M. McManus</td>
                          <td>One of Us Is Next</td>
                          <td>Young Adult Fiction</td>
                          <td>377</td>
                        </tr>
                        <tr>
                          <td>Karen M. McManus</td>
                          <td>One of Us Is Lying</td>
                          <td>Young Adult Fiction</td>
                          <td>368</td>
                        </tr>

                        <tr>
                          <td>Karen M. McManus</td>
                          <td>One of Us Is Next</td>
                          <td>Young Adult Fiction</td>
                          <td>377</td>
                        </tr>
                      </table>
                      <div class="wigetoverlay">
                        <span>Chart</span>
                        <i class="fas fa-trash-alt"></i>
                        <i class="fas fa-sync-alt"></i>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-4">
                    <div class="boxdiv">
                      <img src="../../assets/images/graph-2.jpg" alt="" />
                      <div class="wigetoverlay">
                        <span>Data</span>
                        <i class="fas fa-trash-alt"></i>
                        <i class="fas fa-sync-alt"></i>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-4">
                    <div class="boxdiv">
                      <table>
                        <tr>
                          <th>Author</th>
                          <th>Title</th>
                          <th>Genre</th>
                          <th>Pages</th>
                        </tr>

                        <tr>
                          <td>Karen M. McManus</td>
                          <td>One of Us Is Lying</td>
                          <td>Young Adult Fiction</td>
                          <td>368</td>
                        </tr>

                        <tr>
                          <td>Karen M. McManus</td>
                          <td>One of Us Is Next</td>
                          <td>Young Adult Fiction</td>
                          <td>377</td>
                        </tr>
                        <tr>
                          <td>Karen M. McManus</td>
                          <td>One of Us Is Lying</td>
                          <td>Young Adult Fiction</td>
                          <td>368</td>
                        </tr>

                        <tr>
                          <td>Karen M. McManus</td>
                          <td>One of Us Is Next</td>
                          <td>Young Adult Fiction</td>
                          <td>377</td>
                        </tr>
                      </table>
                      <div class="wigetoverlay">
                        <span>Chart</span>
                        <i class="fas fa-trash-alt"></i>
                        <i class="fas fa-sync-alt"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main> */}
          <main>
            <section class="comnpadding wigetbox">
              <ResponsiveReactGridLayout
                onLayoutChange={this.onLayoutChange}
                onBreakpointChange={this.onBreakpointChange}
                onResize={this.onResize}
                {...this.props}
              >
                {_.map(this.state.items, (el) => this.createElement(el))}
              </ResponsiveReactGridLayout>
            </section>
          </main>
        </div>
        {/* <BasicModal value={openModal} /> */}
      </>
    );
  }
}

export default AddRemoveLayout;

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
