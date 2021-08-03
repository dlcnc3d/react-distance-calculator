/*global google*/
import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import { useMapData } from "../../../context/map.context";
import { useAuthData } from "../../../context/auth.context";
import { MarkerData } from "../../../definitions/types";
import { MapRoutes } from "../../MapRoutes/MapRoutes";
import { MarkerType } from "../../../definitions/enums";
import uniqid from "uniqid";

type Props = {
  onMapClick: (data: MarkerData) => void;
  children?: React.ReactNode;
};

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 49.23,
  lng: 28.47,
};

const MapWrapper = (props: Props) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const { points, routesEnabled } = useMapData();
  const { setError } = useMapData();
  const { currentUser } = useAuthData();

  const MapClickHandle = (e: any) => {
    if (currentUser !== null) {
      props.onMapClick({
        id: uniqid(),
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: Date.now(),
      });
      setError("");
    } else {
      setError("Please sing up or log in");
      setTimeout(() => setError(""), 1000);
    }
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={MapClickHandle}
    >
      {points.map((p) => (
        <Marker
          key={p.id}
          position={{ lat: p.lat, lng: p.lng }}
          animation={google.maps.Animation.DROP}
          label={MarkerType[p.type]}
        >
          <InfoWindow position={{ lat: p.lat, lng: p.lng }}>
            <div>{p.address}</div>
          </InfoWindow>
        </Marker>
      ))}

      <MapRoutes
        startPoint={
          points[points.findIndex((x) => x.type === MarkerType.Start)]
        }
        finishPoint={
          points[points.findIndex((x) => x.type === MarkerType.Finish)]
        }
        enabled={routesEnabled}
      ></MapRoutes>
    </GoogleMap>
  ) : (
    <></>
  );
};

export default MapWrapper;
