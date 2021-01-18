import React from "react";
import LinearProgress from "material-ui/LinearProgress";
import CircularProgress from "material-ui/CircularProgress";

const Loading = () => {
  return (
    <div className="Loading__box">
      <CircularProgress size={80} thickness={10} color="#BD70B3" />
    </div>
  );
};

export default Loading;
