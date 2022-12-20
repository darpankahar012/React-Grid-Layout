import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import GridItem from "./GridItem";

const GridItemContainer = ({ item, children, ...props }) => {
  console.log(
    "🚀 ~ file: GridItemContainer.js:8 ~ GridItemContainer ~ item",
    item
  );
  const onRemoveItem = () => {
    console.log("onRemoveItem");
  };
  const handleClick = () => {
    console.log("handleClick");
  };
  return (
    <GridItem
      el={item}
      onRemoveItem={onRemoveItem}
      handleClick={handleClick}
      {...props}
    >
      {children}
    </GridItem>
    // <h3>asd</h3>
  );
};

GridItemContainer.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  children: PropTypes.array,
};

// const mapStateToProps = (state, { item }) => state.data[item];

export default GridItemContainer;
