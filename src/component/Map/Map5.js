
import React from "react";
import {
    GoogleMap,
    Polygon,
    withScriptjs,
    withGoogleMap,
    TrafficLayer,
} from "react-google-maps";
import MarkerWithLabel from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import compose from "recompose/compose";
import withProps from "recompose/withProps";

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

const GoogleMapComponent = function Map() {
    return (compose(
        withProps({           
            googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}.&v=3.exp&libraries=geometry,drawing,places`,  
            loadingElement: <div style={{ height: `100%` }} />,
            containerElement: <div style={{ height: `400px` }} />,
            mapElement: <div style={{ height: `100%` }} />,
          }),
        withScriptjs,
        withGoogleMap
    )((props) => (

        <GoogleMap
            mapTypeId={props.mapType}
            defaultCenter={{
                lat: props.defaultCentre ? Number(props.defaultCentre.lat) :22.642200150530257,
                lng: props.defaultCentre ? Number(props.defaultCentre.lng) : 75.61468382183699,
            }}
            //note different spellings of centre and center.
            {...props.centre && { center: props.centre }}
            defaultZoom={10}
            zoomControl={false}
            tilt={props.tilt}
        >
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

    )));
}()

export default GoogleMapComponent;
// view rawspa-react-google-maps-with-polygons-component.jsx hosted with ❤ by GitHub