import _ from "lodash";
import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
// import GitHubForkRibbon from "react-github-fork-ribbon";
// import Header from "../../Header";
import { useEffect,useState } from "react";
const MyMapComponent = compose(
  withProps({
 
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}.&v=3.exp&libraries=geometry,drawing,places`,  
    loadingElement: <div style={{ height: `100%` }} />,
    // containerElement: <div style={{ height: `400px` }} />,
    // mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (

  <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
    <Marker position={{ lat: -34.397, lng: 150.644 }} />
  </GoogleMap>
));


const ReactGoogleMaps = () => [
 


  <MyMapComponent key="map" 
  containerElement={<div style={{ height: `400px`,width:'1000px' }} />}
  mapElement={<div style={{ height: `100%` }} />}
  />
  
];

export default ReactGoogleMaps;
