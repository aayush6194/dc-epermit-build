import React from "react";
import { disabledTxtColor2 } from "../../config";

const Bar = ({ style }: any) => {
  return (
    <div
      style={{
       width: '100%',
       borderBottom: '2px solid '+ disabledTxtColor2,
      }}
    >
    </div>
  );
};

export default Bar;
