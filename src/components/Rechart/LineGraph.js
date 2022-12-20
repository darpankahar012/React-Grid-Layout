import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

const LineGraph = () => {
  let data = [
    {
      time: "11:01 PM",
      value: 2584,
    },
    {
      time: "5:27 AM",
      value: 4601,
    },
    {
      time: "12:25 AM",
      value: 2051,
    },
    {
      time: "9:44 AM",
      value: 4797,
    },
    {
      time: "3:08 PM",
      value: 1731,
    },
    {
      time: "3:35 PM",
      value: 2966,
    },
    {
      time: "6:54 AM",
      value: 3129,
    },
    {
      time: "6:22 AM",
      value: 3152,
    },
    {
      time: "1:00 PM",
      value: 1912,
    },
    {
      time: "4:45 PM",
      value: 4969,
    },
    {
      time: "6:22 AM",
      value: 3150,
    },
    {
      time: "8:47 AM",
      value: 1891,
    },
    {
      time: "10:51 AM",
      value: 2708,
    },
    {
      time: "1:10 AM",
      value: 324,
    },
    {
      time: "12:20 AM",
      value: 2374,
    },
    {
      time: "8:51 AM",
      value: 2265,
    },
    {
      time: "6:52 PM",
      value: 3601,
    },
    {
      time: "6:03 AM",
      value: 4022,
    },
    {
      time: "11:15 AM",
      value: 4140,
    },
    {
      time: "10:57 PM",
      value: 373,
    },
    {
      time: "9:30 AM",
      value: 2498,
    },
    {
      time: "11:22 AM",
      value: 403,
    },
    {
      time: "6:21 PM",
      value: 2825,
    },
    {
      time: "9:27 AM",
      value: 1549,
    },
    {
      time: "11:05 PM",
      value: 2476,
    },
    {
      time: "5:33 PM",
      value: 458,
    },
    {
      time: "8:25 PM",
      value: 983,
    },
    {
      time: "5:38 PM",
      value: 3597,
    },
    {
      time: "10:42 PM",
      value: 2107,
    },
  ];
  return (
    <LineChart
      width={260}
      height={38}
      data={data}
      margin={{ left: 10, right: 10 }}
    >
      <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
      <XAxis dataKey="time" />
      <YAxis dataKey="value" mirror />
      <Line
        type="monotone"
        dataKey="value"
        stroke="#82ca9d"
        dot={false}
        isAnimationActive={false}
      />
    </LineChart>
  );
};

export default LineGraph;
