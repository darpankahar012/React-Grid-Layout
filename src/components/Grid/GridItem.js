import React from "react";
import PropTypes from "prop-types";
import ChartWithZoom from "../Graph/Chart with Zoom";
import DateTimeAxisStockChart from "../Graph/StockChart with Date-Time Axis";
import ReactCardFlip from "react-card-flip";
// import GraphBlock from "./GraphBlock";
// import Title from "./Title";

const GridItem = ({ handleClick, el, children, onRemoveItem, ...rest }) => {
  const removeStyle = {
    position: "absolute",
    right: "2px",
    top: 0,
    cursor: "pointer",
  };
  const i = el.i;
  console.log("🚀 ~ file: GridItem.js:18 ~ data");
  // const width = parseInt(style.width, 10);
  // const height = parseInt(style.height, 10) - 50;
  return (
    <div key={el.i} data-grid={el}>
       <div class="container">
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
            <div class="col-xl-12">
              <div class={"boxdiv"}>
                <DateTimeAxisStockChart />
                <button onClick={(e) => handleClick(e, el)}>
                  Click to flip
                </button>
                <div class="wigetoverlay">
                  <span onClick={(e) => handleClick(e, el)}>Data</span>
                  <i class="fas fa-trash-alt"></i>
                  <i class="fas fa-sync-alt"></i>
                </div>
              </div>
            </div>
          </>

          <>
            <div class="col-xl-12">
              {/* <div style={{ flex: 1 }}> */}
              <div class={"boxdiv"}>
                <ChartWithZoom />
                {/* <LineGraph /> */}
                {/* <ChartWithZoom /> */}

                <button onClick={(e) => handleClick(e, el)}>
                  Click to flip
                </button>
                <div class="wigetoverlay">
                  <span onClick={(e) => handleClick(e, el)}>Data</span>
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
          onClick={() => onRemoveItem(this, el.i)}
        >
          x
        </span>
      </div>
    </div>
  );
};

GridItem.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  root: PropTypes.string.isRequired,
  children: PropTypes.array,
};

export default GridItem;
