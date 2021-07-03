import React from "react";
import { Grid } from "platyplex_ui";
import Layout from "../../layout";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Client } from "../../store/reducer/clients";

export const toRoute = (str: string) => str.toLowerCase().replace(/\s+/g, "-");
const Home = () => {
  const { clients } = useSelector((state: any) => state.clients);
  return (
    <Layout sidebar style={{ gridTemplateRows: "1fr auto" }}>
      <Grid style={{ height: "100%" }}>
        <Grid padding="0" placeItems={"stretch"} gridGap="0">
          <NavLink to={"/client"}>
            <span>Client</span>
          </NavLink>
          <NavLink to={"/e-permits/davis/emp"}>
            E-Permit (Davis, Employee)
          </NavLink>
          <NavLink to={"/e-permits/davis"}>E-Permit (Davis, Manager)</NavLink>
          <br />

          <NavLink to={"/e-permits/calpoly"}>
            E-Permit (Cal Poly, Parking Manager)
          </NavLink>
          {clients.map((c: Client) => (
            <NavLink key={c.id} to={`/e-permits/calpoly/${c.id}`}>
              E-Permit (Cal Poly, {c.name})
            </NavLink>
          ))}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Home;
