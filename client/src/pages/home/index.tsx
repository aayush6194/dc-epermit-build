import React from "react";
import { Card, Grid, Text, List } from "platyplex_ui";
import Layout from "../../layout";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Permit, RootPermit } from "../../store/reducer/permit";
import api from "../../api";
import { getPermits } from "../../store/actions/permits";
import { disabledTxtColor } from "../../config";
import logo from "../../assets/logo.png";
export const toRoute = (str: string) => str.toLowerCase().replace(/\s+/g, "-");
const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { clients } = useSelector((state: any) => state.clients);
  const { permits, loading } = useSelector((state: any) => state.permits);
  return (
    <Layout sidebar style={{ gridTemplateRows: "1fr auto" }}>
      <Grid
        style={{ height: "100%", width: 800, maxWidth: "90vw", margin: "auto" }}
        customRows="auto 1fr"
      >
        <Grid
          customCols="1fr auto auto"
          placeItems="stretch"
          width="100%"
          padding=".75em 0"
        >
          <span />
          <Text
            className="pointer"
            color={loading ? disabledTxtColor : "dodgerblue"}
            onClick={async () => {
              dispatch(getPermits());
            }}
          >
            <i className="fas fa-sync" /> <span>&nbsp;Reload</span>
          </Text>
          <Text
            className="pointer"
            color={loading ? disabledTxtColor : "red"}
            onClick={async () => {
              await api.resetEpermit();
              setTimeout(() => dispatch(getPermits()), 500);
            }}
          >
            <i className="fas fa-undo" /> <span>&nbsp;Reset</span>
          </Text>
        </Grid>
        <Grid
          padding="0"
          placeItems={"stretch"}
          gridGap="0"
          placeSelf="start stretch"
        >
          <Text bold textAlign="left" size="1.25em">
            {" "}
            Parking Admin
            <img src={logo} style={{ width: "1.5em", margin: ".5em" }} />
          </Text>
          <Card>
            <div style={{ textAlign: "left", padding: "0 0 1em 1em" }}>
              <NavLink to={"/e-permits"} target="_">
                <div>E-Permit</div>
              </NavLink>
              <NavLink to={"/map"} target="_">
                Map
              </NavLink>
              <NavLink to={"/e-permits/vehicle"} target="_">
                <div>Client Vehicle E-Permit Form</div>
              </NavLink>
            </div>
          </Card>
          <br />
          <Text bold textAlign="left" size="1.25em">
            Premits
          </Text>
          <List
            list={permits}
            loading={loading}
            map={(c: RootPermit, i) => {
              const idenity = c.firstName || c.email || c.phone;
              const isCompleted = c.firstName ? true : false;
              return (
                <Card style={{ textAlign: "left" }}>
                  {i + 1}. &nbsp;
                  <NavLink key={i} to={`/visitor/${i}`} target="_">
                    E-Permit ({idenity}, {clients[c.employer]?.name})
                  </NavLink>
                  {!isCompleted && (
                    <>
                      &nbsp; &nbsp;{" "}
                      <i
                        className="fas fa-exclamation-circle"
                        style={{ color: "coral" }}
                      ></i>
                      &nbsp;Incomplete
                    </>
                  )}
                  <div style={{ paddingLeft: "1em", paddingTop: ".5em" }}>
                    <Text bold textAlign="left">
                      {idenity}'s Residents:
                    </Text>
                    {c.residential?.length === 0 && " None"}
                    {c.residential?.map((p: Permit, j: number) =>
                      generateUsers(p, j, i)
                    ) || "None"}
                  </div>
                  <div style={{ paddingLeft: "1em", paddingTop: "1em" }}>
                    <Text bold textAlign="left">
                      {idenity}'s Visitors:{" "}
                    </Text>
                    {c.visitor?.length === 0 && " None"}
                    {c.visitor?.map((p: Permit, j: number) =>
                      generateUsers(p, j, i)
                    )}
                  </div>
                  <br />
                </Card>
              );
            }}
          />
        </Grid>
      </Grid>
    </Layout>
  );
};

const generateUsers = (p: Permit, j: number, i: number) => {
  const isCompleted = p.firstName ? true : false;
  return (
    <div>
      {j + 1}.&nbsp;
      <NavLink key={i} target="_" to={`visitor/${i}/sub-resident/${j}`}>
        {isCompleted ? ` ${p.firstName} ${p.lastName}` : p.email || p.phone}
      </NavLink>
      {!isCompleted && (
        <>
          &nbsp; &nbsp;{" "}
          <i
            className="fas fa-exclamation-circle"
            style={{ color: "coral" }}
          ></i>
          &nbsp;Incomplete
        </>
      )}
    </div>
  );
};
export default Home;
