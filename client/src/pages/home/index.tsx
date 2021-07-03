import React from "react";
import { Grid, Text } from "platyplex_ui";
import Layout from "../../layout";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Client } from "../../store/reducer/clients";
import { Permit, RootPermit } from "../../store/reducer/permit";

export const toRoute = (str: string) => str.toLowerCase().replace(/\s+/g, "-");
const Home = () => {
  const history = useHistory();
  const { clients } = useSelector((state: any) => state.clients);
  const { permits } = useSelector((state: any) => state.permits);
  return (
    <Layout sidebar style={{ gridTemplateRows: "1fr auto" }}>
      <Grid style={{ height: "100%" }} customRows="auto 1fr">
        <Text
          className="pointer"
          textAlign="right"
          width="100%"
          padding=".5em 2em"
          color={"red"}
          onClick={() => {
            localStorage.clear();
            history.go(0);
          }}
        >
          <i className="fas fa-sync" /> <span>&nbsp; Refresh</span>
        </Text>

        <Grid padding="0" placeItems={"stretch"} gridGap="0">
        <NavLink to={"/map"}>Map</NavLink>
        <br/>
          Parking Admin
          <NavLink to={"/e-permits"}>E-Permit</NavLink>
          <br />
          Council Member
          {clients.map((c: Client, i) => (
            <NavLink key={c.id} to={`/e-permits/${c.id}`}>
              {i + 1}. E-Permit ({c.name})
            </NavLink>
          ))}
          <br />
          Residents
          {permits.map((c: RootPermit, i) => (
            <>
              <NavLink key={i} to={`/visitor/${i}`}>
                {i + 1}. E-Permit ({c.firstName + " " + c.lastName},{" "}
                {clients[c.employer]?.name})
              </NavLink>

              <div>{c.residential.length <= 0? `${c.firstName}'s Residents: None`: 
              <>
               {c.firstName}'s Residents: 
                {c.residential.map((p: Permit, j: Number) => (
                  <NavLink key={i} to={`visitor/${i}/sub-resident/${j}`}>
                    {" " + p.firstName + " " + p.lastName},
                  </NavLink>
                ))}
              </>}

              </div>
              <div>
              {c.visitor.length <= 0 ?  `${c.firstName}'s Visitors: None`: 
              <>
               {c.firstName}'s Visitors: 
                {c.visitor.map((p: Permit, j: Number) => (
                    <NavLink key={i} to={`visitor/${i}/sub-visitor/${j}`}>
                    {" " + p.firstName + " " + p.lastName},
                    </NavLink>
                ))}
              </>}
              <br/>
              </div>
              <br/>
            </>
          ))}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Home;
