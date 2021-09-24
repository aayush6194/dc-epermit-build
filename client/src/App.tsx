import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import ErrorBoundary from "antd/lib/alert/ErrorBoundary";
import { Loader } from "platyplex_ui";
import { Home, Epermits, Map, Events, Electric, VehiclePermit } from "./pages";
import logo from "./assets/parkstash_logo.png";
import { useSelector } from "react-redux";
import { Client as ClientType } from "./store/reducer/clients";
import Help from "./pages/help";
import Legal from "./pages/legal";
import SubVisitor from "./pages/sub-visitor";
import Visitor from "./pages/visitor/calpoly";
import { Permit, RootPermit } from "./store/reducer/permit";
import Login from "./pages/login";

export const toRoute = (str: string) => str.toLowerCase().replace(/\s+/g, "-");

function App() {
  const [state, setState] = useState({
    loading: true,
    auth: false,
  });
  const { clients } = useSelector((s: any) => s.clients);
  const { permits }: { permits: RootPermit[] } = useSelector(
    (s: any) => s.permits
  );
  useEffect(() => {
    const auth = Boolean(localStorage.getItem("AUTH"));
    setTimeout(() => setState({ ...state, loading: false, auth }), 2000);
  }, []);

  return !state.loading ? (
    <ErrorBoundary>
      {!state.auth ? (
        <Switch>
          {permits.map((p: RootPermit, i) =>
            p.residential?.map((per: Permit, j) => (
              <Route
                exact
                key={i + "" + j}
                path={`/visitor/${i}/sub-resident/${j}`}
                render={() => (
                  <Visitor
                    index={i}
                    permit={per}
                    rootPermit={p}
                    name={per.firstName}
                  />
                )}
              />
            ))
          )}

          {permits.map((p: RootPermit, i) =>
            p.visitor?.map((per: Permit, j) => (
              <Route
                key={i + "" + j}
                exact
                path={`/visitor/${i}/sub-visitor/${j}`}
                render={() => (
                  <SubVisitor
                    rootPermit={p}
                    permit={per}
                    name={per.firstName}
                  />
                )}
              />
            ))
          )}

          <Route
            path="/"
            render={() => (
              <Login authenticate={() => setState({ ...state, auth: true })} />
            )}
          />
        </Switch>
      ) : (
        <Switch>
          <Route
            exact
            path={`/e-permits/vehicle`}
            render={() => <VehiclePermit />}
          />
          {clients.map((c: ClientType) => (
            <Route
              exact
              path={`/e-permits/:id`}
              render={() => <Epermits isAdmin={false} client={c} />}
            />
          ))}

          {permits.map((p: any, i) => (
            <Route
              exact
              path={"/visitor/" + i}
              render={() => (
                <Visitor permit={p as any} rootPermit={p} index={i} />
              )}
            />
          ))}

          {permits.map((p: RootPermit, i) =>
            p.residential?.map((per: Permit, j) => (
              <Route
                exact
                key={i + "" + j}
                path={`/visitor/${i}/sub-resident/${j}`}
                render={() => (
                  <Visitor
                    index={i}
                    name={per.firstName}
                    permit={per}
                    rootPermit={p}
                  />
                )}
              />
            ))
          )}

          {permits.map((p: RootPermit, i) =>
            p.visitor?.map((per: Permit, j) => (
              <Route
                key={i + "" + j}
                exact
                path={`/visitor/${i}/sub-visitor/${j}`}
                render={() => (
                  <SubVisitor
                    rootPermit={p}
                    permit={per}
                    name={per.firstName}
                  />
                )}
              />
            ))
          )}

          <Route exact path="/citations/:id" render={() => <Events />} />
          <Route exact path="/e-permits" render={() => <Epermits />} />
          <Route exact path="/map" render={() => <Map />} />
          <Route exact path="/legal" render={() => <Legal />} />
          <Route
            exact
            path="/enforment-electric-vehicles-dashboard"
            render={() => <Electric />}
          />
          <Route exact path="/help" render={() => <Help />} />
          <Route path="/" render={() => <Home />} />
        </Switch>
      )}
    </ErrorBoundary>
  ) : (
    <Loader.Custom logo={logo} />
  );
}

export default App;
