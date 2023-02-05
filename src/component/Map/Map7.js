// Drow polygon on map  

import { compose, withProps ,lifecycle} from "recompose";
import _  from "lodash";

import {
  withScriptjs,
  withGoogleMap,
  InfoWindow,
  GoogleMap,
  Marker
}
from "react-google-maps";
import  { StandaloneSearchBox } from "react-google-maps/lib/components/places/StandaloneSearchBox";

import { DrawingManager } from "react-google-maps/lib/components/drawing/DrawingManager";
import { useState } from "react";
const onLoad = drawingManager => {
    console.log("drawingManager",drawingManager)
  }
  
  const onCircleComplete = polygon => {
    console.log("polygon",polygon)
  }
  const onUnmount = polygon => {
    console.log("unmount",polygon)
  }
  const onPolylineComplete = polygon => {
    console.log("onPolylineComplete",polygon)
    let polygonCoordsArray = [];
    let coords = polygon.getPath().getArray();

    for (let i = 0; i < coords.length; i++) {
      // console.log(coords[i].lat() + "," + coords[i].lng());
      polygonCoordsArray.push(
        coords[i].lat() + "," + coords[i].lng()
      );
    }
    console.log(polygonCoordsArray,"polygonCoordsArray");
  }
  const onPolygonComplete = polygon => {
    console.log("onPolygonComplete",polygon)
    let polygonCoordsArray = [];
    let coords = polygon.getPath().getArray();

    for (let i = 0; i < coords.length; i++) {
      // console.log(coords[i].lat() + "," + coords[i].lng());
      polygonCoordsArray.push(
        coords[i].lat() + "," + coords[i].lng()
      );
    }
    console.log(polygonCoordsArray,"polygonCoordsArray");
  }
  const position = {lat: 22.642200150530257, lng: 75.61468382183699 }

const divStyle = {
  background: `white`,
  border: `1px solid #ccc`,
  padding: 15
}

const onPlacesChanged = (places) => {
  console.log("onPacesChanged",this.searchBox.getPlaces());
  console.log("places",places)
}

const MapWithADrawingManager = compose(
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

          console.log("Places",places)
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
          console.log("marker",nextCenter,nextMarkers)
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
    defaultZoom={8}
    defaultCenter={new window.google.maps.LatLng(22.642200150530257, 75.61468382183699)}
  >
   <InfoWindow
      onLoad={onLoad}
      position={position}
    >
      <div style={divStyle}>
        <h1>InfoWindow</h1>
      </div>
    </InfoWindow>
    <DrawingManager
      // defaultDrawingMode={window.google.maps.drawing.OverlayType.CIRCLE}
      defaultOptions={{
        drawingControl: true,
        drawingControlOptions: {
          
          position: window.google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [
            window.google.maps.drawing.OverlayType.CIRCLE,
            window.google.maps.drawing.OverlayType.POLYGON,
            window.google.maps.drawing.OverlayType.POLYLINE,
            window.google.maps.drawing.OverlayType.RECTANGLE,
          ],
        },
        polygonOptions: { editable: true },
      
        circleOptions: {
          fillColor: `#ffff00`,
          fillOpacity: 1,
          strokeWeight: 5,
          clickable: false,
          editable: true,
          zIndex: 1,
        },
        
      }}
      editable={true}
      onCircleComplete={onCircleComplete}
      onUnmount={onUnmount}
      onPolylineComplete={onPolylineComplete}
      onPolygonComplete={onPolygonComplete}
      
    />

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
          width: `400px`,
          height: `32px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
          position: "absolute",
          // left: "50%",
          // marginLeft: "-120px"
        }}
      />
    </StandaloneSearchBox>
    {props.markers.map((marker, index) =>
      <Marker key={index} position={marker.position} />
    )}
  </GoogleMap>
);

<MapWithADrawingManager />


const Map1 = () =>{

    const [currentLoc,setCurrentLoc]= useState({
      lat:"",
      lng:""
    })
    const [polygon,setPolygon]=useState([]);

    const polygonHandler = (location) => {
      setCurrentLoc(location)
    }
   const currentLocationHandler =(updatePoly) =>{
      setPolygon([...polygon,updatePoly])
    }
    return(
     <div><h1>Google map</h1>
     <MapWithADrawingManager 
     currentLocationHandler={currentLocationHandler}
     polygonHandler={polygonHandler} /></div>
    )
 } 
 
 export default Map1;