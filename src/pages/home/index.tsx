import React from "react";
import { Grid, Text } from "platyplex_ui";
import Layout from "../../layout";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Client } from "../../store/reducer/clients";

export const toRoute = (str: string) => str.toLowerCase().replace(/\s+/g, "-");
const Home = () => {
  const history = useHistory();
  const { clients } = useSelector((state: any) => state.clients);
  return (
    <Layout sidebar style={{ gridTemplateRows: "1fr auto" }}>
      <Grid style={{ height: "100%" }} customRows='auto 1fr'>
      <Text
            className="pointer"
            textAlign="right"
            width='100%'
            padding='.5em 2em'
            color={"red"}
            onClick={() => {
              localStorage.clear();
              history.go(0);
            }}
          >
            <i className="fas fa-sync" /> <span>&nbsp; Refresh</span>
          </Text>
        <Grid padding="0" placeItems={"stretch"} gridGap="0">
          <NavLink to={"/client"}>
            <span>Client</span>
          </NavLink>
          <br/>
          <NavLink to={"/e-permits"}>
            E-Permit (UC Davis, Parking Manager)
          </NavLink>
          <br/>
          {clients.map((c: Client) => (
            <NavLink key={c.id} to={`/e-permits/${c.id}`}>
              E-Permit (UC Davis, Employee - {c.name})
            </NavLink>
          ))}

      
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Home;
