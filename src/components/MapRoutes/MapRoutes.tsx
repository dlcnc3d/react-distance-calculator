import React, { useEffect } from "react";
import { MarkerData } from "../../definitions/types";
import { getRouteHelpers } from "../../core/helpers/route.helpers";
import { DirectionsRenderer } from "@react-google-maps/api";
import { useMapData } from "../../context/map.context";

type Props = {
  startPoint: MarkerData;
  finishPoint: MarkerData;
  enabled: boolean;
};

export const MapRoutes: React.FC<Props> = (props) => {
  const { startPoint, finishPoint, enabled } = props;

  const { routes, setRoutes } = useMapData();

  useEffect(() => {
    if (enabled && startPoint !== null && finishPoint !== null) {
      getRouteHelpers(startPoint, finishPoint).then((result) => {
        setRoutes(result);
      });
    }
  }, [enabled, startPoint, finishPoint]);

  return (
    <div>{enabled && routes && <DirectionsRenderer directions={routes} />}</div>
  );
};
