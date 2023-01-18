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
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDGDYnqIJRFIKhCgLgPZPMFxAkpQNAGa9M&libraries=geometry,drawing,places",
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

const enhance = _.identity;

const ReactGoogleMaps = () => [
//   <Header key="header" />,
//   <GitHubForkRibbon
//     key="ribbon"
//     href="https://github.com/tomchentw/react-google-maps"
//     target="_blank"
//     rel="noopener noreferrer"
//     position="right"
//   >
//     Fork me on GitHub
//   </GitHubForkRibbon>,
  <MyMapComponent key="map" 
  containerElement={<div style={{ height: `400px`,width:'1000px' }} />}
  mapElement={<div style={{ height: `100%` }} />}
  />
];

export default enhance(ReactGoogleMaps);

// const Map1 = () =>{

//         const [isMarkerShown,setMarkerShown]=useState(false);
    
//         useEffect(()=>{
//             delayedShowMarker()
    
//             console.log("map called")
//         },[])
//         const handleMarkerClick = () => {
//             setMarkerShown(false)
//             console.log(isMarkerShown)
//             this.delayedShowMarker()
//         }
//         const delayedShowMarker = () => {
//             setTimeout(() => {
//              setMarkerShown(true)
//             }, 3000)
//           }
    
//         return(
//          // 
//          <div style={{width:'300px',height:'200px'}}><h1>Google map 2</h1>
         
//          <MyMapComponent
//             isMarkerShown={isMarkerShown}
//             onMarkerClick={handleMarkerClick}
//           />
//          </div>
//         )
//      } 
     
//      export default Map1;