import React from "react";
import Layout from "../../layout";
import { Grid, Header } from "platyplex_ui";
import img from "../../assets/UCDavisHealth-color.png";
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
      <img src={img} alt="icon" style={{ width: 250 }} />
        <Form />
      </Grid>
    </Layout>
  );
};

export default Client;
