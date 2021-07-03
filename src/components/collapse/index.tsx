import { Grid, Text } from "platyplex_ui";
import React, { useState } from "react";

interface CollapseProps {
  children: React.ReactElement | React.ReactElement[] | string;
  heading: React.ReactElement | string | any;
  collapse?: boolean;
  pad?: string | number;
}

const Collapse = ({ children, heading, collapse: defaultState, pad }: CollapseProps) => {
  const [collapse, setCollapse] = useState(
    defaultState === false ? false : true
  );
  return (
    <Grid placeSelf="stretch" placeItems="stretch" gridGap=".5em">
      <Grid
        placeItems="center stretch"
        customCols="1fr auto"
        onClick={() => setCollapse(!collapse)}
        className="pointer noselect"
        gridGap=".5em"
      >
        <Text textAlign="left">{heading}</Text>
        <i className={collapse ? "fas fa-plus" : "fas fa-minus"} />
      </Grid>
      {!collapse && (
        <Grid
          placeItems="stretch"
          className="slide-up"
          gridGap=".5em"
          style={{ paddingLeft: pad || 0 }}
        >
          {children}
        </Grid>
      )}
    </Grid>
  );
};

export default Collapse;
