import _  from "lodash";
import { compose, withProps, lifecycle } from "recompose";
import {
  GoogleMap,
  Polygon,
  withScriptjs,
  withGoogleMap,
  TrafficLayer,
} from "react-google-maps";
import MarkerWithLabel from 'react-google-maps/lib/components/addons/MarkerWithLabel';

import {
LoadScript
} from "@react-google-maps/api";
import { useState,useRef,useCallback } from "react";
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox";
import  { StandaloneSearchBox } from "react-google-maps/lib/components/places/StandaloneSearchBox";

const parseCoordinates = (coordinates) => {
  var result = [];
  for (var index = 0; index < coordinates.length - 1; index++) {
      result.push({
          lat: Number(coordinates[index].lat),
          lng: Number(coordinates[index].lng),
      });
  }
  return result;
};


const Map1 = () =>{

    // Store Polygon path in state
    const [path, setPath] = useState([
      { lat: 52.52549080781086, lng: 13.398118538856465 },
      { lat: 52.48578559055679, lng: 13.36653284549709 },
      { lat: 52.48871246221608, lng: 13.44618372440334 }
    ]);
  
    // Define refs for Polygon instance and listeners
    const polygonRef = useRef(null);
    const listenersRef = useRef([]);
  
    // Call setPath with new edited path
    const onEdit = useCallback(() => {
      if (polygonRef.current) {
        const nextPath = polygonRef.current
          .getPath()
          .getArray()
          .map(latLng => {
            return { lat: latLng.lat(), lng: latLng.lng() };
          });
        setPath(nextPath);
      }
    }, [setPath]);
  
    // Bind refs to current Polygon and listeners
    const onLoad = useCallback(
      polygon => {
        polygonRef.current = polygon;
        const path = polygon.getPath();
        listenersRef.current.push(
          path.addListener("set_at", onEdit),
          path.addListener("insert_at", onEdit),
          path.addListener("remove_at", onEdit)
        );
      },
      [onEdit]
    );
  
    // Clean up refs
    const onUnmount = useCallback(() => {
      listenersRef.current.forEach(lis => lis.remove());
      polygonRef.current = null;
    }, []);
  
    console.log("The path state is", path);


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
            mapTypeId={props.mapType}
            defaultCenter={{
                lat: props.defaultCentre ? Number(props.defaultCentre.lat) :22.642200150530257,
                lng: props.defaultCentre ? Number(props.defaultCentre.lng) : 75.61468382183699,
            }}
            //note different spellings of centre and center.
            {...props.center && { center: props.center }}
            defaultZoom={5}
            zoomControl={false}
            tilt={props.tilt}
        >
   { console.warn("warn=====",props)}

            {props.isMarkerShown && (
                props.polygons &&
                props.polygons.map((poly, i) => {
                    const onClick = props.onClick.bind(this, poly);
                    return (
                        <MarkerWithLabel
                            position={{
                                lat: poly.suburbCentre.lat,
                                lng: poly.suburbCentre.lng,
                            }}
                            onClick={onClick}
                            labelAnchor={new window.google.maps.Point(0, 0)}
                            labelStyle={{
                                backgroundColor: "white",
                                fontSize: "12px",
                                padding: "8px",
                                borderRadius: "5px"
                            }}
                        >
                            <div>{poly.metaData.name}</div>
                        </MarkerWithLabel>

                    );
                }
                ))
            }

            {props.individualGeoCode &&
                <MarkerWithLabel
                    position={{
                        lat: props.individualGeoCode.lat,
                        lng: props.individualGeoCode.lng,
                    }}
                    labelAnchor={new window.google.maps.Point(0, 0)}
                    labelStyle={{
                        backgroundColor: "white",
                        fontSize: "12px",
                        padding: "8px",
                        borderRadius: "5px"
                    }}
                >
                    <div>{props.markerTag}</div>
                </MarkerWithLabel>
            }

            {props.showTrafficLayer && <TrafficLayer autoUpdate />}

            {(props.isSuburbHighlighted && props.polygons) && (
                props.polygons.map((poly, i) => {
                    const onClick = props.onClick.bind(this, poly)

                    return (
                        <Polygon
                            path={parseCoordinates(poly.boundaries)}
                            key={i}
                            options={{
                                fillColor: "yellow",
                                fillOpacity: 0.4,
                                strokeColor: "#d35400",
                                strokeOpacity: 0.8,
                                strokeWeight: 3
                            }}
                            onClick={() => { onClick(poly); }}
                        />
                    );
                })
            )}

        </GoogleMap>

   
 
  //     <LoadScript
  //     id="script-loader"
  //     googleMapsApiKey="https://maps.googleapis.com/maps/api/js?key=AIzaSyDGDYnqIJRFIKhCgLgPZPMFxAkpQNAGa9M&v=3.exp&libraries=geometry,drawing,places"
  //     // googleMapsApiKey="AIzaSyDGDYnqIJRFIKhCgLgPZPMFxAkpQNAGa9M"
     
  //     language="en"
  //     region="us"
  //   >
  //     <GoogleMap
  //       ref={props.onMapMounted}
  //       defaultZoom={15}
  //       center={props.center}
  //       onBoundsChanged={props.onBoundsChanged}
  //     >
  //        <Polygon
  //               // Make the Polygon editable / draggable
  //               editable
  //               draggable
  //               path={path}
  //               // Event used when manipulating and adding points
  //               onMouseUp={onEdit}
  //               // Event used when dragging the whole Polygon
  //               onDragEnd={onEdit}
  //               onLoad={onLoad}
  //               onUnmount={onUnmount}
  //             />
  //       <StandaloneSearchBox
  //         ref={props.onSearchBoxMounted}
  //         bounds={props.bounds}
  //         controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
  //         onPlacesChanged={props.onPlacesChanged}
  //       >
  //         <input
  //           type="text"
  //           placeholder="Customized your placeholder"
  //           style={{
  //             boxSizing: `border-box`,
  //             border: `1px solid transparent`,
  //             width: `450px`,
  //             height: `32px`,
  //             marginTop: `27px`,
  //             padding: `0 12px`,
  //             borderRadius: `3px`,
  //             boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  //             fontSize: `14px`,
  //             outline: `none`,
  //             textOverflow: `ellipses`,
  //           }}
  //         />
  //       </StandaloneSearchBox>
  //       {props.markers.map((marker, index) =>
  //         <Marker key={index} position={marker.position} />
  //       )}
  //     </GoogleMap>
  //  </LoadScript>
    );
    
    <MapWithASearchBox />
   return(
    // 
    <div><h1>Google map</h1>
    <MapWithASearchBox /></div>
   )
} 

export default Map1;