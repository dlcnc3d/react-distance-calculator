import React from "react";
import { Box, Paper, Typography } from "@material-ui/core";

import { useMapData } from "../../context/map.context";
import { RouteData } from "../../definitions/types";
import { useEffect } from "react";

import useStyles from "./RouteDataResult.styles";
import { getTransfers } from "../../core/helpers/transfers.helpers";

export const RouteDataResult = () => {
  const classes = useStyles();
  const { routes } = useMapData();
  const [routeData, setRouteData] = React.useState<RouteData>();
  const { routesEnabled } = useMapData();

  useEffect(() => {
    if (
      routes !== null &&
      routes.routes[0].fare !== undefined &&
      typeof routes.routes[0].fare !== "undefined"
    ) {
      setRouteData({
        fare: routes.routes[0].fare.value,
        duration: (
          Math.round(routes.routes[0].legs[0].duration.value) / 60
        ).toFixed(0),
        distance: (
          Math.round(routes.routes[0].legs[0].distance.value) / 1000
        ).toFixed(0),
        transfers: getTransfers(routes),
      });
    }
  }, [routes]);

  return (
    <div>
      {routeData && routesEnabled && (
        <Paper className={classes.infoWindow}>
          <Box p={1}>
            <Typography align="center"> ROUTE INFORMATION: </Typography>
            <Box p={1}></Box>
            <Typography> COST - {routeData.fare} UAH </Typography>
            <Typography> DURATION - {routeData.fare} min </Typography>
            <Typography> DISTANSE - {routeData.fare} km </Typography>
            <Typography>TRANSFERS - {routeData.transfers}</Typography>
          </Box>
        </Paper>
      )}
    </div>
  );
};
