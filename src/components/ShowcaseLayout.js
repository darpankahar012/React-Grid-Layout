import * as React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import BasicModal from "./Modal";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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
export default class AddRemoveLayout extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 100,
  };

  constructor(props) {
    super(props);

    this.state = {
      items:
        JSON.parse(JSON.stringify(originalLayout)) >= 0
          ? [0, 1, 2, 3, 4].map(function (i, key, list) {
              return {
                i: i.toString(),
                x: i * 2,
                y: 0,
                w: 2,
                h: 2,
                add: i === list.length - 1,
              };
            })
          : JSON.parse(JSON.stringify(originalLayout)),
      layout: JSON.parse(JSON.stringify(originalLayout)),
      newCounter: 0,
      openModal: false,
    };

    this.onAddItem = this.onAddItem.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
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
        {el.add ? (
          <center>
            <span
              className="add text"
              onClick={this.onAddItem}
              title="You can add an item by clicking here, too."
            >
              Add +
            </span>
          </center>
        ) : (
          <span className="text">{i}</span>
        )}
        <span
          className="remove"
          style={removeStyle}
          onClick={el.add != true && this.onRemoveItem.bind(this, i)}
        >
          x
        </span>
      </div>
    );
  }

  onAddItem() {
    /*eslint no-console: 0*/
    console.log("adding", "n" + this.state.newCounter);
    this.setState({
      // openModal: false,
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
        i: "n" + this.state.newCounter,
        x: (this.state.items.length * 2) % (this.state.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2,
      }),
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

  resetState(i) {
    this.setState({ items: [] });
    const old = [0, 1, 2, 3, 4].map(function (i, key, list) {
      return {
        i: i.toString(),
        x: i * 2,
        y: 0,
        w: 2,
        h: 2,
        add: i === list.length - 1,
      };
    });
    console.log("🚀 ~ file: ~ resetState ~ old", old);
    this.setState({ items: old });
    this.props.onLayoutChange(old);
  }
  onRemoveItem(i) {
    console.log("removing", i);
    this.setState({ items: _.reject(this.state.items, { i: i }) });
  }

  render() {
    const { openModal } = this.state;
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

          <div>
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
          </div>
          <ResponsiveReactGridLayout
            onLayoutChange={this.onLayoutChange}
            onBreakpointChange={this.onBreakpointChange}
            {...this.props}
          >
            {_.map(this.state.items, (el) => this.createElement(el))}
          </ResponsiveReactGridLayout>
        </div>
        {/* <BasicModal value={openModal} /> */}
      </>
    );
  }
}

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
