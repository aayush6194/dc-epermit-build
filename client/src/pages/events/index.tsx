import React, { useState } from "react";
import { Grid, Text } from "platyplex_ui";
import Analytics from "./analytics";
import { Link } from "react-router-dom";

enum Pages {
  "ANALYTICS" = "ANALYTICS",
}

const Events = () => {
  const [activePage, setActivePage] = useState<Pages>(Pages.ANALYTICS);
  const switches = (
    <Grid margin=".75em" cols='2' gridGap='.25em'>
      <Link to="/citations/1">
        <Text color="white" bold size='1.25em' style={{textDecoration:  'underline'}}>
         Analytics
        </Text>
      </Link>
      <Link to="/map">
        <Text color="white" bold size='1.25em'>
          Map
        </Text>
      </Link>
    </Grid>
  );

  return <Analytics switches={switches} />;
};

export default Events;
