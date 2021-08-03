import React, { useEffect } from "react";
import { useContext } from "react";
import { MarkerData } from "../definitions/types";

type State = {
  error: string;

  markerType: string;

  routes: google.maps.DirectionsResult;

  routesEnabled: boolean;

  authReset: boolean;

  buttonColor: string;

  points: MarkerData[];

  setMarkerType: React.Dispatch<string>;

  setRoutes: React.Dispatch<google.maps.DirectionsResult>;

  setRoutesEnabled: React.Dispatch<boolean>;

  setAuthReset: React.Dispatch<boolean>;

  setButtonColor: React.Dispatch<string>;

  setCurrentUser: React.Dispatch<any>;

  setPoints: React.Dispatch<MarkerData[]>;

  setError: React.Dispatch<string>;
};

const MapContext = React.createContext<Partial<State>>({} as State);

export const MapProvider: React.FC = (props) => {
  const [points, setPoints] = React.useState([]);
  const [routes, setRoutes] = React.useState(null);
  const [error, setError] = React.useState("");
  const [authReset, setAuthReset] = React.useState(false);
  const [routesEnabled, setRoutesEnabled] = React.useState(false);
  const { children } = props;

  useEffect(() => {
    console.log(points);
  }, [points]);

  return (
    <MapContext.Provider
      value={{
        error,
        points,
        setPoints,
        routes,
        setRoutes,
        routesEnabled,
        setRoutesEnabled,
        setError,
        setAuthReset,
        authReset,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMapData = () => useContext(MapContext);
