import React from "react";
import ReactDOM from "react-dom";
import AddRemoveLayout from "./ShowcaseLayout";
// import AddRemoveLayout from "./ShowcaseLayout";

export default class ExampleLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { layout: [] };
    this.onLayoutChange = this.onLayoutChange.bind(this);
  }

  onLayoutChange(layout) {
    this.saveToLS("layout", layout);
    this.setState({ layout: layout });
  }

  saveToLS(key, value) {
    const findIndex = value.findIndex((val) => val.i === "+");
    const checkValue = value.find((val) => val.i === "+");
    // const addValToLastIndex = value[value.length - 1];
    const changeValue = { ...checkValue, add: true };
    value[findIndex] = changeValue;
    if (global.localStorage) {
      global.localStorage.setItem(
        "rgl-7",
        JSON.stringify({
          [key]: value,
        })
      );
    }
  }

  stringifyLayout() {
    return this.state.layout.map(function (l) {
      return (
        <div className="layoutItem" key={l.i}>
          <b>{l.i}</b>: [{l.x}, {l.y}, {l.w}, {l.h}]
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        {/* <div className="layoutJSON">
          Displayed as <code>[x, y, w, h]</code>:
          <h1>Helllo</h1>
          <div className="columns">{this.stringifyLayout()}</div>
        </div> */}
        <AddRemoveLayout onLayoutChange={this.onLayoutChange} />
      </div>
    );
  }
}

const contentDiv = document.getElementById("root");
const gridProps = window.gridProps || {};
ReactDOM.render(React.createElement(ExampleLayout, gridProps), contentDiv);