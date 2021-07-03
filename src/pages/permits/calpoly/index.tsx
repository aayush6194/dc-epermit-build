import React, { useState } from "react";
import Layout from "../../../layout";
import { Grid, Switch, Card, Text } from "platyplex_ui";
import { primaryColor, primaryTxtColor } from "../../../config";
import Generate from "./generate";
import Analytics from "./analytics";
import Rules from "./rules";
import History from "./history";
import img from '../../../assets/CalPolyLogo.png';
import user from "../../../assets/user.svg";
import { Client } from "../../../store/reducer/clients";
enum User {
  GENERATE = "GENERATE",
  HISTORY = "HISTORY",
}

enum Admin {
  GENERATE = "GENERATE",
  HISTORY = "HISTORY",
  ANALYTICS = "ANALYTICS",
  RULES = "RULES",
}

const Permits = ({ client }: { client?: Client }) => {
  const [state, setter] = useState<any>({
    as: User.GENERATE,
  });
  const admin = !client;
  const setState = (props: any) => setter({ ...state, ...props });
  return (
    <Layout sidebar style={{ gridTemplateRows: "1fr auto" }} avatarImg={admin ? img : user}>
      <Layout.Top>
        <span />
      </Layout.Top>
      <Layout.Bottom>
        <Grid placeItems="start stretch" height="100%">
          <Card grid placeItems="end start" width="100%">
            <Switch.underlined
              style={{ padding: 0 }}
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
            <>
              {client && <Card style={{ marginTop: 0, marginBottom: 0 }}>
                <Text bold textAlign='left'>Hello, {client.name}</Text>
              </Card>}
              <Card grid>
                <Generate client={client} />
              </Card>
            </>
          ) : state.as === Admin.RULES ? (
            <Rules />
          ) : (
                  <Analytics />
                )}
        </Grid>
      </Layout.Bottom>
    </Layout>
  );
};

export default Permits;
