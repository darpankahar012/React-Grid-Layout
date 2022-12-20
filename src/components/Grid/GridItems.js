import React from "react";
import ChartWithZoom from "../Graph/Chart with Zoom";
import DateTimeAxisStockChart from "../Graph/StockChart with Date-Time Axis";
import ReactCardFlip from "react-card-flip";

const GridItems = ({ item: el }) => {
  console.log("🚀 ~ file: GridItemContainer.js:7 ~ GridItems ~ el", el);
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
            <div class="col-xl-4">
              <div class={"boxdiv"}>
                <DateTimeAxisStockChart />
                <button>Click to flip</button>
                <div class="wigetoverlay">
                  <span>Data</span>
                  <i class="fas fa-trash-alt"></i>
                  <i class="fas fa-sync-alt"></i>
                </div>
              </div>
            </div>
          </>

          <>
            <div class="col-xl-4">
              {/* <div style={{ flex: 1 }}> */}
              <div class={"boxdiv"}>
                <ChartWithZoom />
                {/* <LineGraph /> */}
                {/* <ChartWithZoom /> */}

                <button>Click to flip</button>
                <div class="wigetoverlay">
                  <span>Data</span>
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
        >
          x
        </span>
      </div>
    </div>
  );
};

export default GridItems;
