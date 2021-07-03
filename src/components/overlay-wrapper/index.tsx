import React from "react";
import { Header, Grid } from "platyplex_ui";
import { primaryTxtColor } from "../../config";

const Wrapper = ({ back, children, rightNav, header, style }: any) => {
  return (
    <Grid
      height="100vh"
      customRows={header ? "auto auto 1fr" : "auto 1fr"}
      gridGap="1em"
      background="white"
      style={{ overflowY: "auto", ...style }}
    >
      <Grid
        style={{ gridColumn: "-1/1", padding: "2% 2% 0 2%" }}
        width="100%"
        customCols="auto auto 1fr auto"
      >
        {back && (
          <Header
            color={primaryTxtColor}
            placeSelf="start"
            onClick={back}
            size={3.5}
            className="pointer med noselect"
          >
            <i className="fa fa-chevron-left"></i> Back
          </Header>
        )}
        <div></div>
        {rightNav}
      </Grid>
      {header}

      {children}
    </Grid>
  );
};

export default Wrapper;
