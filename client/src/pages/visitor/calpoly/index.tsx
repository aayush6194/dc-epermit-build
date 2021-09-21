import React, { useState } from "react";
import Layout from "../../../layout";
import { Grid, Switch, Card, Text } from "platyplex_ui";
import { primaryColor, primaryTxtColor, url } from "../../../config";
import History from "./history";
import user from "../../../assets/user.svg";
import Form from "../../client/form";
import { Permit, RootPermit } from "../../../store/reducer/permit";
import { useDispatch } from "react-redux";
import { addResidence } from "../../../store/actions/permits";
import {PermitCard } from "../../sub-visitor";

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
  PERMIT  = "PERMIT",
  GENERATE = "GENERATE",
  HISTORY = "HISTORY",
}

const Visitor = ({ rootPermit, name, index, permit }: { permit: Permit, rootPermit: RootPermit,  name?: string, index: number}) => {
  const [state, setter] = useState<any>({
    as: User.PERMIT,
  });
  const dispatch = useDispatch();
  const setState = (props: any) => setter({ ...state, ...props });
  return (
    <Layout  style={{ gridTemplateRows: "1fr auto" }} avatarImg={user}>
      <Layout.Top noBackground>
   
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

      <Card   grid placeItems="end start" >
          <Text bold size={'1.2em'}>Hello, {name || permit.firstName}!</Text>
        </Card>
          <Card grid placeItems="end start" width="100%">
            <Switch.underlined
              style={{ padding: 0 }}
              onClick={(as) => setState({ as })}
              color={primaryTxtColor}
              border={"4px solid " + primaryColor}
              items={Object.keys(User)}
              active={state.as}
            />
          </Card>

          {state.as === User.PERMIT? <PermitCard permit={permit} rootPermit={rootPermit} />:
          
          state.as === User.HISTORY ? (
            <History permit={rootPermit} />
          ) : (
            <Card grid>
              <Form
                admin
                partial
                link={`${url}/visitor/${index}`}
                length={[rootPermit.residential.length, [rootPermit.visitor.length]]}
                
                onSubmit={(e: Permit)=>{
                  dispatch(addResidence(e, rootPermit._id, e.type))
                }}
                header={
                  <div>
                    <Text bold textAlign="right" color={primaryColor}>
                      ({3- rootPermit.residential.length}/3) Residents Permit Remaining
                    </Text>
                    <Text bold textAlign="right" color={primaryColor}>
                      ({2 - rootPermit.visitor.length}/2) Visitors Remaining
                    </Text>
                  </div>
                }
              />
            </Card>
          )}
        </Grid>
      </Layout.Bottom>
    </Layout>
  );
};

export default Visitor;
