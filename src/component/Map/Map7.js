// Drow polygon on map  

import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,}
from "react-google-maps";
import { DrawingManager } from "react-google-maps/lib/components/drawing/DrawingManager";
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
const MapWithADrawingManager = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}.&v=3.exp&libraries=geometry,drawing,places`,  
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={new window.google.maps.LatLng(-34.397, 150.644)}
  >
    <DrawingManager
      defaultDrawingMode={window.google.maps.drawing.OverlayType.CIRCLE}
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
      editable
    //   onLoad={onLoad}
      onCircleComplete={onCircleComplete}
      onUnmount={onUnmount}
      onPolylineComplete={onPolylineComplete}
      onPolygonComplete={onPolygonComplete}

    />
  </GoogleMap>
);

<MapWithADrawingManager />


const Map1 = () =>{

    return(
     // 
     <div><h1>Google map</h1>
     <MapWithADrawingManager /></div>
    )
 } 
 
 export default Map1;