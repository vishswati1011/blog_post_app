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
//      <div style={{width:'300px',height:'200px'}}><h1>Google map 2</h1>
     
//      <MyMapComponent
//         isMarkerShown={isMarkerShown}
//         onMarkerClick={handleMarkerClick}
//       />
//      </div>
//     )
//  } 
 
//  export default Map1;