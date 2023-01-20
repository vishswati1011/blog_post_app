//show polygon on map dont draw
import React from 'react'
import { GoogleMap, LoadScript,Polygon } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
    lat: 22.642200150530257, lng: 75.61468382183699
};

const paths = [
    { lat: 22.774, lng: 75.19 },
    { lat: 22.466, lng: 75.29},
    { lat: 22.566, lng: 75.39 },
    { lat: 22.666, lng: 75.49 }
  ]
  
  const options = {
    fillColor: "lightblue",
    fillOpacity: 1,
    strokeColor: "red",
    strokeOpacity: 1,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    geodesic: false,
    zIndex: 1
  }
  
  const onLoad = polygon => {
    console.log("polygon: ", polygon);
  }

  const onDrag = polygon => {
    console.log("polygon: ", polygon);
  }
  const onDragStart = polygon => {
    console.log("polygon: ", polygon);
  }
  const onDragEnd = polygon => {
    console.log("polygon: ", polygon);
  }
  const editable = polygon => {
    console.log("polygon: ", polygon);
  }
function MyComponent() {
  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <>
        <Polygon
        editable
        draggable
      onDrag={onDrag}
      onLoad={onLoad}
      onDragEnd={onDragEnd}
      onDragStart={onDragEnd}
      paths={paths}
      options={options}
    />
        </>
        
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MyComponent)