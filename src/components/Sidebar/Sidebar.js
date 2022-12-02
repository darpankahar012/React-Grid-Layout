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
    loading,
    widgetData,
    widgetLoading,
    widgetError,
  } = useSelector((state) => ({
    mainWidgetTypeArray: state.login?.data.mainWidgetTypeArray,
    subWidgetTypeArray: state.login?.data.subWidgetTypeArray,
    loading: state.login?.loading,
    widgetData: state.widget?.data,
    widgetLoading: state.widget?.loading,
    widgetError: state.widget?.error,
  }));

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

  const [interval, setInterval] = React.useState([1000, 2000, 5000, 10000]);
  const [intervalValue, setIntervalValue] = React.useState(0);

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

  React.useEffect(() => {
    if (widgetError) {
      errorToaster(widgetError);
      dispatch(getWidgetErrorReSet());
    }
  }, [widgetError]);

  React.useEffect(() => {
    if (!mainWidgetTypeArray && openModal) {
      history.push("/login");
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
          // className={styles.modalContent}
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
          </div>

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
                    class="far fa-times closebtn"
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
                      Save
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
