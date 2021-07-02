import React, { useState } from "react";
import Layout from "../../../layout";
import { Grid, Switch, Card, Text } from "platyplex_ui";
import { primaryColor, primaryTxtColor, url } from "../../../config";
import Analytics from "./analytics";
import Rules from "./rules";
import History from "./history";
import img from "../../../assets/CalPolyLogo.png";
import user from "../../../assets/user.svg";
import { Client } from "../../../store/reducer/clients";
import Form from "../../client/form";
import TowNotification from "./tow";
import TowRegistration from "./tow-registration";
import TowRegistrationHistory from "./tow-registration-history";
import { useSelector } from "react-redux";
interface Body {
  firstName: string;
  lastName: string;
  email: string;
  liscensePlate: string;
  phone: string;
  vaccine: string;
  date: string;
  location: string;
  space: number;
}

enum User {
  GENERATE = "GENERATE",
  HISTORY = "HISTORY",
}

enum Admin {
  GENERATE = "GENERATE",
  HISTORY = "HISTORY",
  REGISTRATION = "REGISTRATION",
  ANALYTICS = "ANALYTICS",
  RULES = "RULES",
  TOW_REGISTRATION = "TOW_REGISTRATION",
  TOW_NOTIFICATION = "TOW_NOTIFICATION",
}

const Permits = ({ client }: { client?: Client }) => {
  const [state, setter] = useState<any>({
    as: User.GENERATE,
  });

  const { permits } = useSelector((state: any) => state.permits);
  const admin = !client;
  const setState = (props: any) => setter({ ...state, ...props });
  return (
    <Layout
      sidebar
      style={{ gridTemplateRows: "1fr auto" }}
      avatarImg={admin ? img : user}
    >
      <Layout.Top noBackground>
        <span />
      </Layout.Top>
      <Layout.Bottom>
        <Grid
          placeItems="start stretch"
          padding="1em"
          height="100%"
          gridGap=".5em"
          style={{
            width: 1400,
            maxWidth: "100vw",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Card grid placeItems="end start" width="100%">
            <Switch.underlined
              style={{ padding: 0, textTransform: "capitalize" }}
              onClick={(as) => setState({ as })}
              color={primaryTxtColor}
              border={"4px solid " + primaryColor}
              items={Object.keys(admin ? Admin : User)}
              active={state.as}
            />
          </Card>

          {state.as === User.HISTORY ? (
            <History client={client} />
          ) : state.as === User.GENERATE ? (
            <Card grid>
              <Form admin link={`${url}/visitor/${permits.length}`} />
            </Card>
          ) : state.as === Admin.RULES ? (
            <Rules />
          ) : state.as === Admin.ANALYTICS ? (
            <Analytics />
          ) : state.as === Admin.TOW_NOTIFICATION ? (
           
              <TowRegistration />
          ) : state.as === Admin.TOW_REGISTRATION ? (
            <Card grid>
              <TowNotification />
            </Card>
          ) : (
            <Card grid>
              <TowRegistrationHistory />
            </Card>
          )}
        </Grid>
      </Layout.Bottom>
    </Layout>
  );
};

export default Permits;
