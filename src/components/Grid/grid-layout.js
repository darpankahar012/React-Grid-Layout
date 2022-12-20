import React from "react";
import ReactDOM from "react-dom";
import AddRemoveLayout from "./ShowcaseLayout";
// import AddRemoveLayout from "./ShowcaseLayout";
import { SuspenseFallbackLoader } from "./../Loader";
import { connect } from "react-redux";
import { layoutChangeSuccess } from "../../store/actions";

class ExampleLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { layout: [] };
    this.onLayoutChange = this.onLayoutChange.bind(this);
  }

  onLayoutChange(layout) {
    const { layoutList } = this.props;

    const checkValue = layout.map((el) => {
      if (layoutList && layoutList.length > 0) {
        let val = layoutList.find((check) => check.i === el.i);
        const changeValue = { ...val, w: el.w, x: el.x, y: el.y, h: el.h };
        return changeValue;
      }
    });

    this.props.layoutChangeSuccess(checkValue);
    // this.saveToLS("layout", layout);
    this.setState({ layout: layout });
  }

  saveToLS(key, value) {
    const findIndex = value.findIndex((val) => val.i === "+");
    const checkValue = value.find((val) => val.i === "+");
    // const addValToLastIndex = value[value.length - 1];
    const changeValue = { ...checkValue, add: true };
    value[findIndex] = changeValue;
    // console.log("🚀 ~ saveToLS ~ value", value);
    // this.props.layoutChangeSuccess(value);
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
    // const { layoutList, data } = this.props;
    return (
      <div>
        {/* <div className="layoutJSON">
          Displayed as <code>[x, y, w, h]</code>:
          <h1>Helllo</h1>
          <div className="columns">{this.stringifyLayout()}</div>
        </div> */}
        <AddRemoveLayout onLayoutChange={this.onLayoutChange} />
        {/* <SuspenseFallbackLoader /> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { data, layoutList } = {
    data: state.login,
    layoutList: state.layout.data,
  };
  return { data, layoutList };
}

const mapDispatchToProps = (dispatch) => ({
  layoutChangeSuccess: (data) => {
    dispatch(layoutChangeSuccess(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ExampleLayout);

// const contentDiv = document.getElementById("root");
// const gridProps = window.gridProps || {};
// ReactDOM.render(React.createElement(ExampleLayout, gridProps), contentDiv);
