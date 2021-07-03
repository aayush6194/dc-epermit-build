import React from "react";
import { primaryColor } from "../../config";

const CloseBtn = ({ close, right }: { close: () => void; right?: boolean }) => (
  <div
    className="pointer hoverr grid shadow"
    style={{
      color: primaryColor,
      background: "white",
      position: "absolute",
      borderRadius: "50%",
      top: "1em",
      width: "auto",
      padding: ".5em .75em",
      zIndex: 1000,
      ...(right
        ? {
            right: "1em",
          }
        : { left: "1em" }),
    }}
    onClick={close}
  >
    <i className="fa fa-times txt-md" />
  </div>
);

export default CloseBtn;
