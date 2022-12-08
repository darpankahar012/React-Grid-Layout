import React from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./sidebar.module.css";
import { widgetService } from "../../services";
import { errorToaster, successToaster } from "../../common/toaster";
import { getWidgetErrorReSet } from "../../store/actions";

const Sidebar = () => {
  const dispatch = useDispatch();
  let location = useLocation();
  const history = useHistory();

  const {
    mainWidgetTypeArray,
    subWidgetTypeArray,
    loginData,
    loading,
    widgetData,
    widgetLoading,
    widgetError,
  } = useSelector((state) => ({
    mainWidgetTypeArray: state.login?.data.mainWidgetTypeArray,
    subWidgetTypeArray: state.login?.data.subWidgetTypeArray,
    loginData: state.login?.data,
    loading: state.login?.loading,
    widgetData: state.widget?.data,
    widgetLoading: state.widget?.loading,
    widgetError: state.widget?.error,
  }));

  const [productArrayList, setProductArrayList] = React.useState([]);
  const [leadTypeArrayList, setLeadTypeArrayList] = React.useState([]);
  const [qualityTypeArrayList, setQualityTypeArrayList] = React.useState([]);
  const [buyersArrayList, setBuyersArrayList] = React.useState([]);
  const [vendorsArrayList, setVendorsArrayList] = React.useState([]);
  const [stateArrayArrayList, setStateArrayArrayList] = React.useState([]);
  const [positionArrayList, setPositionArrayList] = React.useState([]);

  const [showSideMenu, setShowSideMenu] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [mainWidgetOption, setMainWidgetOption] = React.useState([]);
  const [mainWidgeSubtOption, setMainWidgetSubOption] = React.useState([]);

  const [widgetType, setWidgetType] = React.useState("");
  const [widgetSubType, setWidgetSubType] = React.useState({
    label: "",
    key: "",
    type: "",
  });
  const [filterKey, setFilterKey] = React.useState([
    { id: 1, value: "Product" },
    { id: 2, value: "LOB" },
    { id: 3, value: "Media Channel" },
    { id: 4, value: "Client" },
    { id: 5, value: "Buyer Campaingn" },
    { id: 6, value: "Publisher" },
    { id: 7, value: "State" },
    { id: 8, value: "Position" },
    { id: 9, value: "Date" },
  ]);

  const [selectedFilter, setSelectedFilter] = React.useState(1);

  const [interval, setInterval] = React.useState([1000, 2000, 5000, 10000]);
  const [intervalValue, setIntervalValue] = React.useState(0);
  const [applyedFiltered, setApplyedFiltered] = React.useState([]);
  const [searched, setSearched] = React.useState("");

  // console.log(
  //   "🚀 ~ file: Sidebar.js:61 ~ Sidebar ~ applyedFiltered",
  //   applyedFiltered
  // );

  const defaultArrayFunc = () => {
    setProductArrayList(loginData?.productArray);
    setLeadTypeArrayList(loginData?.leadType);
    setQualityTypeArrayList(loginData?.qualityType);
    setBuyersArrayList(loginData?.buyers);
    setVendorsArrayList(loginData?.vendors);
    setStateArrayArrayList(loginData?.stateArray);
    setPositionArrayList(loginData?.position);
  };

  React.useEffect(() => {
    if (loginData) {
      defaultArrayFunc();
    }
  }, [loginData]);

  React.useEffect(() => {
    setSearched("");
    defaultArrayFunc();
  }, [selectedFilter]);

  React.useEffect(() => {
    if (showSideMenu) {
      setSelectedFilter(1);
      setApplyedFiltered([]);
      setSearched("");
      defaultArrayFunc();
    }
  }, [showSideMenu]);

  const handleChange = (e) => {
    setSearched(e.target.value);
    let item = e.target.value;
    let updateArray = [];
    if (selectedFilter === 1) {
      updateArray = loginData?.productArray.filter((val) =>
        val.toLowerCase().includes(item.toLowerCase())
      );
      return setProductArrayList(updateArray);
    } else if (selectedFilter === 2) {
      updateArray = loginData?.leadType.filter((val) =>
        val.lead_type_name.toLowerCase().includes(item.toLowerCase())
      );
      return setLeadTypeArrayList(updateArray);
    } else if (selectedFilter === 3) {
      updateArray = loginData?.qualityType.find(
        (val) => val.name === item
      ).name;
    } else if (selectedFilter === 4) {
      updateArray = loginData?.buyers.find(
        (val) => val.buyer_name === item
      ).buyer_name;
    } else if (selectedFilter === 5) {
    } else if (selectedFilter === 6) {
      updateArray = loginData?.vendors.find(
        (val) => val.first_name === item
      ).first_name;
    } else if (selectedFilter === 7) {
      updateArray = loginData?.stateArray.find(
        (val) => val.State === item
      ).State;
    } else {
      updateArray = parseInt(item);
    }

    console.log(
      "🚀 ~ file: Sidebar.js:79 ~ handleChange ~ updateArray",
      updateArray
    );
  };

  const checked = (event, val) => {
    let oldValue = applyedFiltered;
    var item = event.target.name;
    let selectVal = 1;
    if (val === 1) {
      selectVal = loginData?.productArray.find((val) => val === item);
    } else if (val === 2) {
      selectVal = loginData?.leadType.find(
        (val) => val.lead_type_name === item
      ).lead_type_name;
    } else if (val === 3) {
      selectVal = loginData?.qualityType.find((val) => val.name === item).name;
    } else if (val === 4) {
      selectVal = loginData?.buyers.find(
        (val) => val.buyer_name === item
      ).buyer_name;
    } else if (val === 5) {
    } else if (val === 6) {
      selectVal = loginData?.vendors.find(
        (val) => val.first_name === item
      ).first_name;
    } else if (val === 7) {
      selectVal = loginData?.stateArray.find((val) => val.State === item).State;
    } else {
      selectVal = parseInt(item);
    }
    loginData?.productArray.find((val) => val === item);
    let selectFilterKey = filterKey.find((vala) => vala.id === val).id;
    let add = { key: selectFilterKey, value: selectVal };

    if (oldValue.length > 0) {
      let check = oldValue.filter((el) => el.key !== selectFilterKey);
      if (
        applyedFiltered.some(
          (obj) => obj.key === selectedFilter && obj.value === item
        )
      ) {
        setApplyedFiltered(check);
      } else {
        check.push(add);
        setApplyedFiltered(check);
      }
    } else {
      // oldValue.push(add);
      setApplyedFiltered([add]);
    }
  };

  React.useEffect(() => {
    if (mainWidgetTypeArray && mainWidgetTypeArray.length > 0) {
      setMainWidgetOption(mainWidgetTypeArray);
    } else {
      setMainWidgetOption([]);
    }
  }, [mainWidgetTypeArray]);

  React.useEffect(() => {
    if (subWidgetTypeArray && subWidgetTypeArray.length > 0) {
      setWidgetType(mainWidgetTypeArray[0]);

      let filterdData = subWidgetTypeArray.find((check) => {
        return check.type === mainWidgetTypeArray[0];
      });
      setMainWidgetSubOption(filterdData);

      let findData = subWidgetTypeArray.find((check) => {
        return check.type === mainWidgetTypeArray[0];
      });
      setWidgetSubType(findData);
    } else {
      setMainWidgetSubOption([]);
    }
  }, [subWidgetTypeArray, mainWidgetTypeArray]);

  React.useEffect(() => {
    if (subWidgetTypeArray && subWidgetTypeArray.length > 0) {
      let filterdValue = subWidgetTypeArray.filter(
        (check) => check.type === widgetType
      );
      setMainWidgetSubOption(filterdValue);
    }
  }, [widgetType, subWidgetTypeArray, mainWidgetTypeArray]);

  React.useEffect(() => {
    if (!widgetLoading && openModal) {
      setOpenModal((oldState) => !oldState);
      successToaster(widgetData?.message);
    }
  }, [widgetLoading]);
















  // React.useEffect(() => {
  //   let token = global.localStorage.getItem("access_token");
  //   if (!token) {
  //     history.push("/login");
  //   }
  // }, []);

















  React.useEffect(() => {
    if (widgetError) {
      errorToaster(widgetError);
      dispatch(getWidgetErrorReSet());
    }
  }, [widgetError]);







  React.useEffect(() => {
    if (!mainWidgetTypeArray && openModal) {
      history.push("/login");
      global.localStorage.clear()
    }
  }, [mainWidgetTypeArray, openModal]);









  
  const handleMainWidgetOptionChange = (value) => {
    setWidgetType(value);
    let filterdValue = subWidgetTypeArray.filter(
      (check) => check.type === value
    )[0];
    setWidgetSubType(filterdValue);
  };

  const handleMainSubWidgetOptionChange = (value) => {
    let filterdData = subWidgetTypeArray.find((check) => {
      return check.label === value;
    });
    setWidgetSubType(filterdData);
  };

  const handleIntervalValueChange = (value) => {
    setIntervalValue(value);
  };

  const getWidgetfunc = () => {
    dispatch(widgetService.getWidget(widgetSubType));
  };

  function Modal({ children, shown, close }) {
    return shown ? (
      <div
        className={styles.modalBackdrop}
        onClick={() => {
          // close modal when outside of modal is clicked
          close();
        }}
      >
        <div
          className={styles.sidebar_add_widget_form__1TGwy}
          onClick={(e) => {
            // do not close modal if anything inside modal content is clicked
            e.stopPropagation();
          }}
        >
          {/* <button onClick={close}>Close</button> */}
          {children}
        </div>
      </div>
    ) : null;
  }
  const SidebarELement = () => {
    if (location.pathname !== "/login") {
      return (
        <>
          <div class={showSideMenu ? "sidebar show" : "sidebar"}>
            <i
              onClick={() => setShowSideMenu(!showSideMenu)}
              class="far fa-times closebtn"
            ></i>
            <div class="filtermenu">
              <div class="tabmenu">
                <div
                  class="nav flex-column nav-pills"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  {filterKey.map((el) => (
                    <button
                      class={
                        el.id === selectedFilter
                          ? "nav-link active"
                          : "nav-link"
                      }
                      // class="nav-link active"
                      id="tab1"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-tab1"
                      type="button"
                      role="tab"
                      aria-controls=""
                      aria-selected="true"
                      onClick={() => setSelectedFilter(el.id)}
                    >
                      {el.value}
                    </button>
                  ))}
                </div>
              </div>
              <div class="tab-content" id="v-pills-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="v-pills-tab1"
                  role="tabpanel"
                  aria-labelledby=""
                >
                  <div class="innerdiv">
                    <input
                      type="text"
                      placeholder="Search here.."
                      class="proserch"
                      onChange={(e) => handleChange(e)}
                      value={searched}
                    />
                    <div class="checklist">
                      {/* filter Option */}
                      {selectedFilter === 1 &&
                        loginData &&
                        productArrayList.map((el) => (
                          <div class="custom_checkbox">
                            <input
                              type="checkbox"
                              id={el}
                              name={el}
                              checked={applyedFiltered.some(
                                (obj) =>
                                  obj.key === selectedFilter && obj.value === el
                              )}
                              onChange={(e) => checked(e, selectedFilter)}
                            />
                            <label for={el}>{el}</label>
                          </div>
                        ))}
                      {selectedFilter === 2 &&
                        loginData &&
                        leadTypeArrayList.map((el) => (
                          <div class="custom_checkbox">
                            <input
                              type="checkbox"
                              id={el.lead_type_name}
                              name={el.lead_type_name}
                              checked={applyedFiltered.some(
                                (obj) =>
                                  obj.key === selectedFilter &&
                                  obj.value === el.lead_type_name
                              )}
                              onChange={(e) => checked(e, selectedFilter)}
                            />
                            <label for={el.lead_type_name}>
                              {el.lead_type_name}
                            </label>
                          </div>
                        ))}
                      {selectedFilter === 3 &&
                        loginData &&
                        qualityTypeArrayList.map((el) => (
                          <div class="custom_checkbox">
                            <input
                              type="checkbox"
                              id={el.name}
                              name={el.name}
                              checked={applyedFiltered.some(
                                (obj) =>
                                  obj.key === selectedFilter &&
                                  obj.value === el.name
                              )}
                              onChange={(e) => checked(e, selectedFilter)}
                            />
                            <label for={el.name}>{el.name}</label>
                          </div>
                        ))}
                      {selectedFilter === 4 &&
                        loginData &&
                        buyersArrayList.map((el) => (
                          <div class="custom_checkbox">
                            <input
                              type="checkbox"
                              id={el.buyer_name}
                              name={el.buyer_name}
                              checked={applyedFiltered.some(
                                (obj) =>
                                  obj.key === selectedFilter &&
                                  obj.value === el.buyer_name
                              )}
                              onChange={(e) => checked(e, selectedFilter)}
                            />
                            <label for={el.buyer_name}>{el.buyer_name}</label>
                          </div>
                        ))}
                      {selectedFilter === 5 && (
                        // &&
                        // loginData &&
                        // loginData?.position.map((el) => (
                        <div class="custom_checkbox">
                          <input type="checkbox" id={"Client1"} />
                          <label for="Client1">asd</label>
                        </div>
                        // ))}
                      )}
                      {selectedFilter === 6 &&
                        loginData &&
                        vendorsArrayList.map((el) => (
                          <div class="custom_checkbox">
                            <input
                              type="checkbox"
                              id={el.first_name}
                              name={el.first_name}
                              checked={applyedFiltered.some(
                                (obj) =>
                                  obj.key === selectedFilter &&
                                  obj.value === el.first_name
                              )}
                              onChange={(e) => checked(e, selectedFilter)}
                            />
                            <label for={el.first_name}>{el.first_name}</label>
                          </div>
                        ))}
                      {selectedFilter === 7 &&
                        loginData &&
                        stateArrayArrayList.map((el) => (
                          <div class="custom_checkbox">
                            <input
                              type="checkbox"
                              id={el.State}
                              name={el.State}
                              checked={applyedFiltered.some(
                                (obj) =>
                                  obj.key === selectedFilter &&
                                  obj.value === el.State
                              )}
                              onChange={(e) => checked(e, selectedFilter)}
                            />
                            <label for={el.State}>{el.State}</label>
                          </div>
                        ))}
                      {selectedFilter === 8 &&
                        loginData &&
                        positionArrayList.map((el) => (
                          <div class="custom_checkbox">
                            <input
                              type="checkbox"
                              id={el}
                              name={el}
                              checked={applyedFiltered.some(
                                (obj) =>
                                  obj.key === selectedFilter && obj.value === el
                              )}
                              onChange={(e) => checked(e, selectedFilter)}
                            />
                            <label for={el}>{el}</label>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="sidebtndiv">
              <button
                class="btn btn-outline-info"
                onClick={() => setApplyedFiltered([])}
              >
                Clear
              </button>
              <button class="btn btn-primary">Apply</button>
            </div>
          </div>

          {/* <div class={showSideMenu ? "sidebar show" : "sidebar"}>
            <i
              onClick={() => setShowSideMenu(!showSideMenu)}
              class="far fa-times closebtn"
            ></i>
            <ul>
              <li class="dropmenu current">
                <a href="javascript:void">Product</a>
                <div class="innerdiv">
                  <div class="custom_checkbox">
                    <input type="checkbox" id="Product1" />
                    <label for="Product1">Product 1</label>
                  </div>
                  <div class="custom_checkbox">
                    <input type="checkbox" id="Product2" />
                    <label for="Product2">Product 2</label>
                  </div>
                  <div class="custom_checkbox">
                    <input type="checkbox" id="Product3" />
                    <label for="Product3">Product 3</label>
                  </div>
                </div>
              </li>

              <li>
                <a href="javascript:void">L.O.B</a>
              </li>

              <li>
                <a href="javascript:void">Media Channel</a>
              </li>

              <li class="dropmenu">
                <a href="javascript:void">Client</a>
                <div class="innerdiv">
                  <input
                    type="text"
                    placeholder="Search here.."
                    class="proserch"
                  />
                  <div class="custom_checkbox">
                    <input type="checkbox" id="Client1" />
                    <label for="Client1">Client 1</label>
                  </div>
                  <div class="custom_checkbox">
                    <input type="checkbox" id="Client2" />
                    <label for="Client2">Client 2</label>
                  </div>
                  <div class="custom_checkbox">
                    <input type="checkbox" id="Client3" />
                    <label for="Client3">Client 3</label>
                  </div>
                </div>
              </li>

              <li>
                <a href="javascript:void">Buyer Campaign</a>
              </li>

              <li>
                <a href="javascript:void">Publisher</a>
              </li>
              <li>
                <a href="javascript:void">Publisher Campaign</a>
              </li>

              <li>
                <a href="javascript:void">State</a>
              </li>

              <li>
                <a href="javascript:void">Position</a>
              </li>

              <li>
                <a href="javascript:void">Date</a>
              </li>
            </ul>
            <div class="sidebtndiv">
              <button class="btn btn-outline-info">Clear</button>
              <button class="btn btn-primary">Apply</button>
            </div>
          </div> */}

          <div class="side_fixed_icon">
            <a
              href="javascript:void"
              title="Filter"
              class="fal fa-filter filterbtn"
              onClick={() => setShowSideMenu((oldState) => !oldState)}
              // ref={menuRef}
            ></a>
            <a
              href="javascript:void"
              title="Add widget"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              class="fal fa-th-large"
              onClick={() => setOpenModal((oldState) => !oldState)}
              // ref={modalRef}
            ></a>
            <a href="javascript:void" title="Save" class="fal fa-bookmark"></a>
          </div>
          <Modal
            shown={openModal}
            close={() => {
              setOpenModal(false);
            }}
          >
            {/* <h1>Look! I'm inside the modal!</h1> */}
            {/* <div
              class={openModal ? "modal fade show" : "modal fade"}
              style={openModal ? { display: "block" } : { display: "none" }}
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            > */}
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content add_widget_form">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Add widget
                  </h5>
                  <button
                    type="button"
                    // class="far fa-times closebtn"
                    className={"far fa-times " + styles.closebtn}
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setOpenModal(!openModal)}
                  ></button>
                </div>
                <div class="modal-body">
                  <form>
                    <div class="mb-3">
                      <select
                        onChange={(e) =>
                          handleMainWidgetOptionChange(e.target.value)
                        }
                        value={widgetType}
                      >
                        {mainWidgetOption.map((el) => (
                          <option value={el}>{el}</option>
                        ))}
                        {/* <option value="">Leads</option>
                            <option value="">Calls</option>
                            <option value="">General</option> */}
                        {/* })} */}
                      </select>
                    </div>
                    <div class="mb-3">
                      <select
                        onChange={(e) =>
                          handleMainSubWidgetOptionChange(e.target.value)
                        }
                        value={widgetSubType?.label}
                      >
                        {mainWidgeSubtOption.map((el) => (
                          <option value={el.label}>{el.label}</option>
                        ))}
                        {/* <option value="">Select widget</option>
                        <option value="">widget 1</option>
                        <option value="">widget 2</option>
                        <option value="">widget 3</option> */}
                      </select>
                    </div>
                    <div class="mb-3">
                      <select
                        onChange={(e) =>
                          handleIntervalValueChange(e.target.value)
                        }
                        value={intervalValue}
                      >
                        {interval.map((el) => (
                          <option value={el}>{el}</option>
                        ))}
                        {/* <option value="">Refresh interval</option>
                        <option value="">Refresh interval</option>
                        <option value="">Refresh interval</option> */}
                      </select>
                    </div>
                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={() => getWidgetfunc()}
                    >
                      {widgetLoading && <i class="fas fa-spinner fa-pulse"></i>}
                      {widgetLoading ? ` Save` : `Save`}
                      {/* Save */}
                    </button>
                  </form>
                </div>
              </div>
            </div>
            {/* </div> */}
          </Modal>
        </>
      );
    } else {
      return null;
    }
  };

  return SidebarELement();
};

export default Sidebar;
