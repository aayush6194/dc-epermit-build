import ReactDOM from "react-dom";
import { Coords } from "google-map-react";
import location from "../../../assets/share_icon.png";
import {
  GoogleApiWrapper,
  InfoWindow,
  Map,
  Marker,
  Polygon,
} from "google-maps-react";
import { Grid, Text } from "platyplex_ui";
import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import LocationSearcher from "./location-searcher";
import { setAddressData } from "../../../store/actions/search";
import Layout from "../../../layout";

export class MapContainer extends React.Component<any, any> {
  state = {
    showingInfoWindow: true,
    name: "",
    revenue: 0,
    id: 1,
    zoom: 9.5,
    citation: false,
    transaction: 0,
    activeMarker: {},
    markPosition: { lat: -1, lng: -1 },
    selectedPlace: {},
  };

  link = React.createRef();

  render() {

    const onMarkerClick = (props: any, marker: any, e: any) => {
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true,
      });
    };

    return (
      <Layout sidebar style={{ gridTemplateRows: "1fr auto" }}>
        <Layout.Top>
          <Grid margin=".75em" cols="2" gridGap=".25em">
            {this.props.children}
          </Grid>
        </Layout.Top>
        <Layout.Bottom
          style={{
            width: "calc(100% - 5em)",
            marginLeft: "5em",
            height: "100%",
          }}
        >
          <Grid
            placeSelf="stretch"
            style={{ width: "95%", height: "100%", position: "relative" }}
          >
            <div
              onClick={() => window.location.reload()}
              style={{ display: "none" }}
              ref={this.link as any}
            ></div>
            <div
              style={{
                placeSelf: "start stretch",
                zIndex: 10,
                gridColumnStart: 1,
              }}
            >
              <LocationSearcher />
            </div>
            <Map
              style={{ gridColumnStart: "1" }}
              google={this.props.google as any}
              center={{lat:  39.50892, lng: -76.82}}
              initialCenter={{lat:  39.50892, lng: -76.82}}
              zoom={9}
              onZoomChanged={(_: any, { zoom }: any) => this.setState({ zoom })}
              onClick={(mapProps, map, clickEvent) =>
                console.log({
                  lat: clickEvent.latLng.lat(),
                  lng: clickEvent.latLng.lng(),
                })
              }
            >
                 <Marker
                   onMouseover={onMarkerClick}
                  position={{lat:  39.50892, lng: -76.75164}}
                />

                  <Marker
                   onMouseover={onMarkerClick}
                  position={{lat: 38.9090061, lng: -76.8447549}}
                />

              <InfoWindowEx
                google={this.props.google}
                map={this.props.map}
                marker={this.state.activeMarker as any}
                visible={this.state.showingInfoWindow}
              >
                <div
                  className="cursor"
                  onClick={() => {
                    const curr = this.link?.current as any;
                    curr?.click();
                  }}
                >
                  
                  <h2>Location: {"Largo Town Center, Largo, MD 20774"}</h2>
                  <div># of Chargers: 12</div>
                  <div>Occupancy: 50 %</div>
                </div>
              </InfoWindowEx>
            </Map>
          </Grid>
        </Layout.Bottom>
      </Layout>
    );
  }
}

function InfoWindowEx(props) {
  const infoWindowRef = React.createRef() as any;
  const contentElement = document.createElement(`div`);
  useEffect(() => {
    ReactDOM.render(React.Children.only(props.children), contentElement);
    infoWindowRef?.current?.infowindow?.setContent(contentElement);
  }, [props.children]);
  return <InfoWindow ref={infoWindowRef} {...props} />;
}

interface LayerProps {
  strokeColor: string;
  coord?: Coords[];
  setActive: (props: any) => void;
  name: string;
  revenue: number;
  locations?: string[];
}

const Layer = (props: LayerProps) => {
  const { strokeColor, coord, locations, revenue, setActive, name } = props;
  console.log(props);
  return (
    <Polygon
      paths={coord}
      strokeColor={"red"}
      strokeOpacity={0.8}
      strokeWeight={2}
      fillColor={"red"}
      fillOpacity={0.35}
    />
  );
};

const mapStateToProps = (state: any) => {
  const { search } = state;
  return { search };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setAddressData: ({ lat, lng }: any) => {
      dispatch(
        setAddressData({
          geo: { lat, lng },
        })
      );
    },
  };
};

const ConnectedMap = connect(mapStateToProps, mapDispatchToProps)(MapContainer);

export default GoogleApiWrapper({
  apiKey: "AIzaSyCXprycu2n1TOaoO0wDiZkH8HavZbUDFFU",
})(ConnectedMap);
