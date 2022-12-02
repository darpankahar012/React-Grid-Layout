import React from "react";
import { useLocation } from "react-router-dom";

const Ticker = () => {

  
  let location = useLocation();
  // console.log("🚀 ~ file: Sidebar.js ~ line 9 ~ Sidebar ~ location", location);

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
                    <li>
                      <span class="eventDate">29.02.2016 - 04.03.2016</span>
                      <span class="eventName">
                        SharePoint Power User Training
                      </span>
                      <span class="eventLocation">Geneva</span>
                    </li>
                    <li>
                      <span class="eventDate">22.02.2016 - 27.02.2016</span>
                      <span class="eventName">Intro to JSOM</span>
                      <span class="eventLocation">Lausanne</span>
                    </li>
                    <li>
                      <span class="eventDate">07.03.2016 - 12.03.2016</span>
                      <span class="eventName">xslt Training</span>
                      <span class="eventLocation">Warsaw</span>
                    </li>
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
