import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

export const SuspenseFallbackLoader = () => {
    return (
        <div style={{ marginTop: "18%", marginLeft: "45%", position: "fixed" }}>
            <PulseLoader
                color={"#36d7b7"}
                loading={true}
                size={15}
            />
        </div>
    );
};