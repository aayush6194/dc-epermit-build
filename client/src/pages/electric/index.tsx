import React, { useState } from "react";
import { Grid, Text } from "platyplex_ui";
import Analytics from "./analytics";
import { Link } from "react-router-dom";
import Map from "./map/index_v1";

enum Pages {
  "ANALYTICS" = "ANALYTICS",
  "MAP" = "MAP",
}

const Electric = () => {
  const [activePage, setActivePage] = useState<Pages>(Pages.ANALYTICS);
  const switches = (
    <Grid margin=".75em" cols="2" gridGap=".25em">
      <Text
        color="white"
        bold
        className="pointer"
        onClick={() => setActivePage(Pages.ANALYTICS)}
        size="1.25em"
        style={{
          textDecoration: activePage === Pages.ANALYTICS ? "underline" : "",
        }}
      >
        Analytics
      </Text>

      <Text
        color="white"
        bold
        size="1.25em"
        className="pointer"
        onClick={() => setActivePage(Pages.MAP)}
        style={{ textDecoration: activePage === Pages.MAP ? "underline" : "" }}
      >
        Map
      </Text>
    </Grid>
  );

  return activePage === Pages.ANALYTICS ? (
    <Analytics switches={switches} />
  ) : (
    <Map>{switches}</Map>
  );
};

export default Electric;
