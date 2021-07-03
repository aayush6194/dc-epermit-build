import React from "react";
import Layout from "../../layout";
import { Grid, Header } from "platyplex_ui";
import img from "../../assets/logo.png";
import Form from "./form";

const Client = () => {
  return (
    <Layout style={{ gridTemplateRows: "1fr auto", background: 'white' }}>
      <Grid
        placeItems="stretch center"
        customRows="auto 1fr"
        height="100%"
        style={{ maxWidth: "1300px", margin: "2em auto" }}
      >
        <Header>City of Los Gatos</Header>
        <Form />
      </Grid>
    </Layout>
  );
};

export default Client;
