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
    zoom: 12,
    citation: false,
    transaction: 0,
    activeMarker: {},
    markPosition: { lat: -1, lng: -1 },
    selectedPlace: {},
  };

  link = React.createRef();

  render() {
    const stokes = ["red", "blue", "green", "coral", "purple"];
    const data = [
      {
        id: 1,
        coord: [
          {
            lat: 39.02223,
            lng: -76.95807,
            address: "10308 TULSA DRIVE, Adelphi, MD 20783",
          },
          {
            lat: 39.02419,
            lng: -76.95898,
            address: "10412 TULSA DRIVE, Adelphi, MD 20783",
          },
          {
            lat: 39.02448,
            lng: -76.95843,
            address: "10416 TRUXTON ROAD, Adelphi, MD 20783",
          },
        ],
        revenue: 18200,
        transaction: 830,
        name: "Thomas E. Dernoga",
      },

      {
        id: 1,
        coord: [
          {
            lat: 39.03768,
            lng: -76.94938,
            address: "10700 Cherry Tree Ct, Adelphi, MD 20783",
          },
          {
            lat: 39.03771,
            lng: -76.94871,
            address: "10701 Cherry Tree Ct, Adelphi, MD 20783",
          },
          {
            lat: 39.03733,
            lng: -76.94876,
            address: "3229 Cherry Mill Drive , Adelphi, MD 20783",
          },
          {
            lat: 39.03736,
            lng: -76.95051,
            address: "3217  Cherry Mill Drive, Adelphi, MD 20783",
          },
          {
            lat: 39.03768,
            lng: -76.95013,
            address: "10801 Cherry Blossom Court , Adelphi, MD 20783",
          },
        ],
        revenue: 18200,
        transaction: 830,
        name: "Thomas E. Dernoga",
      },

      {
        id: 3,
        coord: [
          {
            lat: 39.06866,
            lng: -76.84537,
            address: "9300 Montpelier Drive, Laurel, MD 20707",
          },
          {
            lat: 39.06995,
            lng: -76.84352,
            address: "9314 Montpelier Drive, Laurel, MD 20707",
          },
        ],
        revenue: 14300,
        transaction: 1122,
        name: "Deni L. Taveras",
      },
      {
        id: 2,
        coord: [
          {
            lat: 39.0103099,
            lng: -76.975656,
            address: "2002 Evansdale Dr, Hyattsville, MD 20783, USA",
          },
          {
            lat: 39.0107624,
            lng: -76.9728488,
            address: "2024 Evansdale Dr, Hyattsville, MD 20783, USA",
          },
          {
            lat: 39.01139,
            lng: -76.974312,
            address: "8801 Royal Crest Dr, Hyattsville, MD 20783, USA",
          },
        ],
        revenue: 11878,
        transaction: 943,
        name: "Todd M. Turner, Chair",
      },
      {
        id: 2,
        coord: [
          {
            lat: 38.9912064,
            lng: -76.8426131,
            address: "9401 Copernicus Dr, Lanham, MD 20706, USA",
          },
          {
            lat: 38.9912458,
            lng: -76.840856,
            address: "9414 Copernicus Dr, Lanham, MD 20706, USA",
          },
          {
            lat: 38.9902376,
            lng: -76.84184719999999,
            address: "7300 Galileo Ct, Lanham, MD 20706, USA",
          },
          {
            lat: 38.9908361,
            lng: -76.8411263,
            address: "7307 Galileo Ct, Lanham, MD 20706, USA",
          },
          {
            lat: 38.990958,
            lng: -76.8400901,
            address: "7407 Vandenberg Ct, Lanham, MD 20706, USA",
          },
          {
            lat: 38.9903286,
            lng: -76.8405406,
            address: "7400 Vandenberg Ct, Lanham, MD 20706, USA",
          },
        ],
        revenue: 11878,
        transaction: 943,
        name: "Todd M. Turner, Chair",
      },

      {
        id: 2,
        coord: [
          {
            lat: 38.972629,
            lng: -76.977105,
            address: "2000 Van Buren St, Hyattsville, MD 20782, USA",
          },
          {
            lat: 38.9752606,
            lng: -76.97740250000001,
            address: "7003 20th Ave, Hyattsville, MD 20783, USA",
          },
          {
            lat: 38.9725482,
            lng: -76.977695,
            address: "6700 20th Ave, Hyattsville, MD 20783, USA",
          },
        ],
        revenue: 11878,
        transaction: 943,
        name: "Todd M. Turner, Chair",
      },
    ];

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
              center={{lat: 38.87885269413422, lng:-76.8724140863908}}
              initialCenter={this.props.search.addressData.geo}
              zoom={this.state.zoom}
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
                  onClick={()=>alert()}
                  position={{lat: 38.87885269413422, lng:-76.8724140863908}}
                />
              {/* {data.map(({ coord, name, revenue, transaction, id }, i) =>
                this.state.zoom > 14 ? (
                  <Polygon
                    paths={coord}
                    strokeOpacity={0.8}
                    strokeColor={stokes[i]}
                    strokeWeight={2}
                    onMouseover={(_: any, __: any, e: any) =>
                      this.setState({
                        name,
                        revenue,
                        id,
                        transaction,
                        markPosition: {
                          lat: e.latLng.lat(),
                          lng: e.latLng.lng(),
                        },
                      })
                    }
                    onClick={(mapProps: any, map: any, clickEvent: any) => {}}
                    fillColor={stokes[i]}
                    fillOpacity={0.35}
                  />
                ) : (
                  <Marker
                    onClick={() => {
                      this.props.setAddressData({
                        lat: coord[0].lat,
                        lng: coord[0].lng,
                      });
                      this.setState({ zoom: 15 });
                    }}
                    position={coord[0]}
                  />
                )
              )}

              {this.state.zoom > 14 && (
                <Marker
                  opacity={0}
                  onMouseover={onMarkerClick}
                  position={this.state.markPosition}
                />
              )}

              {!this.state.citation && (
                <Marker position={this.props.search.addressData.geo} />
              )} */}

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
                  
                  <h2>Location: {"7925 Central Avenue Capitol Heights, MD 20743"}</h2>
                  
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
