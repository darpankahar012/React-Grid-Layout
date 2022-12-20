import React, { Component } from "react";
import { connect } from "react-redux";
import { widgetService } from "../../services";
import CanvasJSReact from "../../assets/canvasjs.react";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ChartWithZoom extends Component {
  constructor() {
    super();
    this.state = {
      loaderArray: [],
    };
    this.generateDataPoints = this.generateDataPoints.bind(this);
  }
  updateTime = () => {
    // console.log("el", this.props.el);

    const { el, widget } = this.props;
    if (this.props.el.intervalValue && this.props.data) {
      console.log("🚀 ~ file: Chart with Zoom.js:21 ~ ChartWithZoom ~ this.props.data", this.props.data)
      console.log("🚀 ~ file: Chart with Zoom.js:21 ~ ChartWithZoom ~ this.props.el", this.props.el)
      console.log("IF");
      // let check = this.state.loaderArray;
      // if (!check.includes(this.props.el.i)) {
      //   check.push(this.props.el.i);
      //   this.setState({ loaderArray: check });
      // }
      this.props.addLoaderKey(el.i);
      // console.log("🚀 ~ file: Chart with Zoom.js:29 ~ ChartWithZoom ~ el.i", el.i)
      if (el.intervalValue && widget.loading === false) {
        this.props.autoRefreshGetWidget({
          label: el.label,
          key: el.key,
          type: el.type,
          intervalValue: el.intervalValue,
          index: el.i,
        });
      }
    }
  };

  updateTimeRecursively() {
    if (this.props.el.i) {
      this.updateTime();
      setInterval(this.updateTime, this.props.el.intervalValue);
    }
  }
  // Stop the stopwatch
  componentWillUnmount() {
    clearInterval(this.updateTime);
  }
  componentDidMount = () => {
    if (this.props.el.intervalValue && this.props.data) {
      this.updateTimeRecursively();
      // this.props.loaderArray
      // console.log("🚀 ~ file: this.props.loaderArray", this.props.loaderArray);
    }
  };
  generateDataPoints() {
    var asd =
      this.props.arrayData &&
      this.props.arrayData.length > 0 &&
      this.props.arrayData.find((check) => check.id === this.props.el.i);
    if (asd) {
      return asd.value;
    } else {
      return [];
    }
  }

  render() {
    const { loaderArray } = this.state;
    console.log("************************", this.props.arrayData);

    const options = {
      theme: "light2", // "light1", "dark1", "dark2"
      animationEnabled: true,
      // exportEnabled: true,
      zoomEnabled: true,
      // title: {
      //   text: "Try Zooming and Panning",
      // },
      axisY: {
        includeZero: false,
      },

      data: [
        {
          type: "column",
          dataPoints: this.generateDataPoints(500),
          xValueType: "dateTime",
          xValueFormatString: "DD MMM YY",
        },
      ],
    };

    const options2 = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2", // "light1", "dark1", "dark2"
      title: {
        text: "Bounce Rate by Week of Year",
      },
      axisY: {
        title: "Bounce Rate",
        includeZero: false,
        suffix: "%",
      },
      axisX: {
        title: "Week of Year",
        prefix: "W",
        interval: 2,
      },
      data: [
        {
          type: "line",
          toolTipContent: "Week {x}: {y}%",
          dataPoints: [
            { x: 1, y: 64 },
            { x: 2, y: 61 },
            { x: 3, y: 64 },
            { x: 4, y: 62 },
            { x: 5, y: 64 },
            { x: 6, y: 60 },
            { x: 7, y: 58 },
            { x: 8, y: 59 },
            { x: 9, y: 53 },
            { x: 10, y: 54 },
            { x: 11, y: 61 },
            { x: 12, y: 60 },
            { x: 13, y: 55 },
            { x: 14, y: 60 },
            { x: 15, y: 56 },
            { x: 16, y: 60 },
            { x: 17, y: 59.5 },
            { x: 18, y: 63 },
            { x: 19, y: 58 },
            { x: 20, y: 54 },
            { x: 21, y: 59 },
            { x: 22, y: 64 },
            { x: 23, y: 59 },
          ],
        },
      ],
    };

    return (
      <div className="chartContainer">
        <h6>
          {this.props.el.i} - {this.props.el.label}
        </h6>
        {/* {this.props.arrayData && this.props.arrayData.length > 0 ? ( */}
        {this.props.loaderArray &&
        this.props.loaderArray.length > 0 &&
        // this.props.arrayData.length === 0 &&
        this.props.loaderArray.includes(this.props.el.i) ? (
          <i class="fas fa-spinner fa-pulse"></i>
        ) : (
          <CanvasJSChart
            options={options}
            /* onRef={ref => this.chart = ref} */
          />
          // <CanvasJSChart options={options2} />
        )}
        {/* ) : (
          <i class="fas fa-spinner fa-pulse"></i>
        )} */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { data, widget } = {
    data: state.login,
    widget: state.widget,
  };
  return {
    data,
    widget,
  };
}

const mapDispatchToProps = (dispatch) => ({
  autoRefreshGetWidget: (req) => {
    dispatch(widgetService.autoRefreshGetWidget(req));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChartWithZoom);
