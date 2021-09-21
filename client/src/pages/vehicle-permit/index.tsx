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
        <img src={img} style={{width: '10em', maxWidth: "90vw"}}/>
        <Form admin={false}/>
      </Grid>
    </Layout>
  );
};

export default Client;
