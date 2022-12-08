import React from "react";
import PropTypes from "prop-types";

import GraphBlock from "./GraphBlock";
// import Title from "./Title";

const GridItem = ({
  title,
  data,
  type,
  className,
  style,
  dispatch,
  root,
  children,
  ...rest
}) => {
  console.log("🚀 ~ file: GridItem.js:18 ~ data", data);
  let Data = [
    {
      time: "2:52 PM",
      value: 2262,
    },
    {
      time: "1:39 PM",
      value: 4843,
    },
    {
      time: "11:19 PM",
      value: 4611,
    },
    {
      time: "2:08 PM",
      value: 4345,
    },
    {
      time: "3:41 PM",
      value: 831,
    },
    {
      time: "5:17 PM",
      value: 301,
    },
    {
      time: "12:57 AM",
      value: 4583,
    },
    {
      time: "3:01 PM",
      value: 3046,
    },
    {
      time: "2:13 PM",
      value: 2290,
    },
    {
      time: "4:49 PM",
      value: 1057,
    },
    {
      time: "5:08 AM",
      value: 2263,
    },
    {
      time: "4:11 PM",
      value: 783,
    },
    {
      time: "11:24 AM",
      value: 477,
    },
    {
      time: "11:11 AM",
      value: 701,
    },
    {
      time: "10:12 AM",
      value: 3867,
    },
    {
      time: "2:30 AM",
      value: 3013,
    },
    {
      time: "11:34 PM",
      value: 3578,
    },
    {
      time: "7:25 PM",
      value: 2078,
    },
    {
      time: "5:03 AM",
      value: 4649,
    },
    {
      time: "11:21 PM",
      value: 4262,
    },
    {
      time: "1:17 PM",
      value: 4583,
    },
    {
      time: "1:49 AM",
      value: 2856,
    },
    {
      time: "4:07 PM",
      value: 290,
    },
    {
      time: "3:49 AM",
      value: 1830,
    },
    {
      time: "4:59 PM",
      value: 1907,
    },
    {
      time: "7:45 AM",
      value: 982,
    },
    {
      time: "7:10 PM",
      value: 993,
    },
    {
      time: "7:35 AM",
      value: 1476,
    },
    {
      time: "1:28 AM",
      value: 4153,
    },
    {
      time: "10:00 AM",
      value: 1401,
    },
    {
      time: "6:35 PM",
      value: 1841,
    },
    {
      time: "1:48 PM",
      value: 4285,
    },
    {
      time: "3:48 AM",
      value: 4013,
    },
    {
      time: "6:36 AM",
      value: 3680,
    },
    {
      time: "3:56 AM",
      value: 3649,
    },
    {
      time: "8:08 AM",
      value: 2908,
    },
    {
      time: "6:34 AM",
      value: 4972,
    },
    {
      time: "2:24 AM",
      value: 3278,
    },
    {
      time: "6:13 AM",
      value: 2608,
    },
    {
      time: "4:16 AM",
      value: 630,
    },
    {
      time: "11:56 PM",
      value: 1360,
    },
    {
      time: "12:04 AM",
      value: 1715,
    },
    {
      time: "12:05 PM",
      value: 3166,
    },
    {
      time: "9:26 PM",
      value: 3279,
    },
    {
      time: "8:33 AM",
      value: 3338,
    },
  ];
  const width = parseInt(style.width, 10);
  const height = parseInt(style.height, 10) - 50;
  return (
    <div className={`grid-item ${className}`} style={style} {...rest}>
      <div className="grid-item__title">
        <h2>{"title"}</h2>
      </div>
      <div className="grid-item__graph">
        <GraphBlock type={"line"} data={Data} width={width} height={height} />
      </div>
      {children}
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
