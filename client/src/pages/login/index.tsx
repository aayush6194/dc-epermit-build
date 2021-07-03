import React from "react";
import Layout from "../../layout";
import { Grid, Text } from "platyplex_ui";
import Otp from './otp';

const Login = ({ authenticate }: { authenticate: ()=> void }) => {
  return (
    <Layout sidebar={false} style={{ gridTemplateRows: "1fr auto" }}>
      <Layout.Top>
        <span />
      </Layout.Top>
      <Layout.Bottom>
        <Grid
          placeItems="start stretch"
          padding="1em"
          height="100%"
          gridGap=".5em"
          style={{
            width: 1200,
            maxWidth: "100vw",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Text color="white" bold>
            Error! Unauthorized Access
          </Text>
          <br />
          <br />
          <Text color="white" bold>
            Type in the Code to gain access
          </Text>

          <Otp authenticate={authenticate}/>
        </Grid>
      </Layout.Bottom>
    </Layout>
  );
};

export default Login;
