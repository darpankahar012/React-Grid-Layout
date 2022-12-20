import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { widgetService } from "../../services";

const Table = ({ arrayData, el, loaderArray, addLoaderKey }) => {
  // const dispatch = useDispatch();

  // console.log(" el.i", el.i);
  // console.log("arrayData", arrayData);
  const [tableData, setTableData] = React.useState([]);
  // console.log("tableData", tableData);
  const [tableDeatils, setTableDetails] = React.useState({});
  //   console.log("🚀 ~ file: Table.js:9 ~ Table ~ tableDeatils", tableDeatils)

  // const widget = useSelector((state) => state.widget);

  React.useEffect(() => {
    if (el.i) {
      if (arrayData.length > 0) {
        let filterData = arrayData.find((obj) => obj.id === el.i);
        if (filterData) {
          setTableDetails(filterData);
          setTableData(filterData.value);
        }
        // console.log(
        //   "🚀 ~ file: Table.js:12 ~ React.useEffect ~ filterData",
        //   filterData
        // );
      }
    }
  }, [arrayData, el]);

  const updateTable = () => {
    addLoaderKey(el.i);
    // if (el.intervalValue && widget && widget.loading === false) {
    //   dispatch(
    //     widgetService.autoRefreshGetWidget({
    //       label: el.label,
    //       key: el.key,
    //       type: el.type,
    //       intervalValue: el.intervalValue,
    //       index: el.i,
    //     })
    //   );
    // }
  };

  React.useEffect(() => {
    updateTable();

    const id = setInterval(() => {
      updateTable();
    }, el.intervalValue);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="chartContainer">
      <h6>
        {el.i} - {el.label}
      </h6>
      {loaderArray &&
        loaderArray.length > 0 &&
        loaderArray.includes(el.i) ? (
        <i class="fas fa-spinner fa-pulse"></i>
      ) : (
        <div class="col-xl-12">
          <div class="">
            <table className="table table-bordered">
              <tr>
                <th>Date</th>
                <th>{el.label}</th>
              </tr>
              {el &&
                arrayData &&
                arrayData.length > 0 &&
                arrayData
                  .find((obj) => obj.id === el.i)
                  && arrayData.find((obj) => obj.id === el.i).value.map((obj) => {
                    return (
                      <>
                        <tr>
                          <td>{obj.Date}</td>
                          <td>{obj.y}</td>
                        </tr>
                      </>
                    );
                  })}
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// export default memo(Table);
export default Table;
