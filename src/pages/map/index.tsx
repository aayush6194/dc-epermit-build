import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { defaultLocation, primaryColor } from "../../config";
import garage from "../../assets/user.svg";

const Garage = ({ className = "" }: any) => (
  <div style={{ color: primaryColor }}>
    <img
      src={garage}
      style={{
        width: "50px",
        height: "50px",
        position: "relative",
        top: "-25px",
        left: "-25px",
      }}
      className={"" + className}
      alt="marker"
    />
  </div>
);

const SimpleMap = () => {
  const [state, setter] = useState({
    location: defaultLocation,
    pointerLocation: defaultLocation,
    zoom: 17,
    pointerMoved: true,
  });
  const setState = (obj: any) => setter({ ...state, ...obj });
  const handleApiLoaded = (map: any, maps: any) => {
    const triangleCoords = [
      {lat: 37.73558154936106, lng: -122.50597270962676},
      {lat: 37.73779905834969, lng: -122.50638956073531},
      {lat: 37.73782922509667, lng: -122.50541681304172},
      {lat: 37.735611890091654, lng: -122.50524515166477},
    ];
  
     let bermudaTriangle = new maps.Polygon({
      paths: triangleCoords,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35
    });
    bermudaTriangle.setMap(map);
  }
  return (
    <div
      style={{
        display: "grid",
        width: "100vw",
        height: '100vh',
        gridTemplateColumns: "1fr",
      }}
    >
      <GoogleMapReact
        onClick={(e)=>console.log(e)}
        bootstrapURLKeys={{ key: "AIzaSyB4z2lv6jvxicb7dsQ-K8fFxRcjt07YxQI" }}
        center={state.location}
        defaultZoom={state.zoom}
        onChange={({ zoom, center: location }: any) =>
          setState({ zoom, location })
        }
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        distanceToMouse={() => 0}
      >
        <Garage lat={defaultLocation.lat} lng={defaultLocation.lng} />
      </GoogleMapReact>
    </div>
  );
};

export default SimpleMap;
