import React from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TickerService } from "../../services";

const Ticker = () => {
  let location = useLocation();
  const dispatch = useDispatch();

  // console.log("🚀 ~ file: Sidebar.js ~ line 9 ~ Sidebar ~ location", location);
  const { data, errorMsg, loading } = useSelector((state) => state.ticker);
  const { data: userData } = useSelector((state) => state.login);

  const [tickerData, setTickerData] = React.useState([]);

  React.useEffect(() => {
    if (userData) {
      dispatch(TickerService.TickerList());
    }
  }, [userData]);

  React.useEffect(() => {
    const id = setInterval(() => {
      console.log("benefits");
      dispatch(TickerService.TickerList());
    }, 300000);

    return () => clearInterval(id);
  }, []);

  React.useEffect(() => {
    if (data.results) {
      setTickerData(data.results);
    }
  }, [data]);

  React.useEffect(() => {
    if (data.results) {
      setTickerData(data.results);
    }
  }, [data]);

  const TickerELement = () => {
    if (location.pathname !== "/login") {
      return (
        <>
          <div id="flyoutContainer">
            <div id="tickerContainer">
              <div id="ticker">
                <h1>Upcomming events</h1>
                <div class="ticker-content">
                  <ul
                    style={{
                      animationDuration: "20s",
                      animationIterationCount: "infinite",
                      animationTimingFunction: "linear",
                      animationName: "ticker",
                    }}
                  >
                    {tickerData &&
                      tickerData.length > 0 &&
                      tickerData.map((el) => {
                        return (
                          <li>
                            <span class="eventDate">{el.label}</span>
                            <span class="eventName">{el.value}</span>
                            {/* <span class="eventLocation">Geneva</span> */}
                          </li>
                        );
                      })}
                    {/* <li>
                      <span class="eventDate">29.02.2016 - 04.03.2016</span>
                      <span class="eventName">
                        SharePoint Power User Training
                      </span>
                      <span class="eventLocation">Geneva</span>
                    </li> */}
                    {/* <li>
                      <span class="eventDate">22.02.2016 - 27.02.2016</span>
                      <span class="eventName">Intro to JSOM</span>
                      <span class="eventLocation">Lausanne</span>
                    </li>
                    <li>
                      <span class="eventDate">07.03.2016 - 12.03.2016</span>
                      <span class="eventName">xslt Training</span>
                      <span class="eventLocation">Warsaw</span>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return null;
    }
  };

  return TickerELement();
};

export default Ticker;
