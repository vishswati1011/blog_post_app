//serch with google map
import _  from "lodash";
import { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,

  LoadScript, GoogleMap, Polygon,
  Marker,
} from "react-google-maps";
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox";
import  { StandaloneSearchBox } from "react-google-maps/lib/components/places/StandaloneSearchBox";

const MapWithASearchBox = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}.&v=3.exp&libraries=geometry,drawing,places`,  
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        bounds: null,
        center: {
          lat: 22.642200150530257, lng: 75.61468382183699
        },
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new window.google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          });
          // refs.map.fitBounds(bounds);
        },
      })
    },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
  >
    <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Customized your placeholder"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `450px`,
          height: `32px`,
          marginTop: `27px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </StandaloneSearchBox>
    {props.markers.map((marker, index) =>
      <Marker key={index} position={marker.position} />
    )}
  </GoogleMap>
);

<MapWithASearchBox />


const Map1 = () =>{

   return(
    // 
    <div><h1>Google map</h1>
    <MapWithASearchBox /></div>
   )
} 

export default Map1;

// import React, { useEffect, useState } from "react"
// import { compose, withProps } from "recompose"
// import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

// const MyMapComponent = compose(
//   withProps({
//     googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDGDYnqIJRFIKhCgLgPZPMFxAkpQNAGa9M&v=3.exp&libraries=geometry,drawing,places",
//     loadingElement: <div style={{ height: `50%` }} />,
//     containerElement: <div style={{ height: `400px` }} />,
//     mapElement: <div style={{ height: `50%` }} />,
//   }),
//   withScriptjs,
//   withGoogleMap
// )((props) =>

//   <GoogleMap
//     defaultZoom={10}
//     defaultCenter={{  lat: 22.642200150530257, lng: 75.61468382183699 }}
//   >
//   {console.log("map",props.isMarkerShown)}
//     {props.isMarkerShown && <Marker position={{  lat: 22.642200150530257, lng: 75.61468382183699 }} onClick={props.onMarkerClick} />}
//   </GoogleMap>
// )
// const Map1 = () =>{

//     const [isMarkerShown,setMarkerShown]=useState(false);

//     useEffect(()=>{
//         delayedShowMarker()

//         console.log("map called")
//     },[])
//     const handleMarkerClick = () => {
//         setMarkerShown(false)
//         console.log(isMarkerShown)
//         this.delayedShowMarker()
//     }
//     const delayedShowMarker = () => {
//         setTimeout(() => {
//          setMarkerShown(true)
//         }, 3000)
//       }

//     return(
//      // 
//      <div ><h1>Google map 2</h1>
     
//      <MyMapComponent
//         isMarkerShown={isMarkerShown}
//         onMarkerClick={handleMarkerClick}
//         onClick={handleMarkerClick}
//       />
//      </div>
//     )
//  } 
 
//  export default Map1;