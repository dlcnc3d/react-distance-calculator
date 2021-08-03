import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import useStyles from "./SidePanel.styles";
import MapWrapper from "../Gmap/MapWrapper/MapWrapper";
import { CalculateDistanceForm } from "../CalculateDistanceForm/CalculateDistanceForm";
import { MarkerData } from "../../definitions/types";
import { MarkerType } from "../../definitions/enums";
import { useMapData } from "../../context/map.context";
import { getAddressByLatLngHelper } from "../../core/helpers/geocode.helpers";
import { Loader } from "../Loader/Loader";
import uniqid from "uniqid";

export const SidePanel: React.FC = () => {
  const onMapClickHandle = (e: MarkerData) => {
    selectHandler(e as MarkerData, MarkerType.Start, MarkerType.Finish);
  };

  const classes = useStyles();
  const { points, setPoints } = useMapData();
  const [loading, SetLoading] = useState(true);

  const selectHandler = (
    marker: MarkerData,
    typeCheck: MarkerType,
    labeltype: MarkerType
  ) => {
    getAddressByLatLngHelper(marker).then((result) => {
      if (points.findIndex((x) => x.type === labeltype) !== -1) {
        setPoints(
          points.map((item) =>
            item.type === labeltype
              ? { ...item, lat: marker.lat, lng: marker.lng, address: result }
              : item
          )
        );
      } else {
        setPoints([
          ...points,
          {
            id: uniqid(),
            lat: marker.lat,
            lng: marker.lng,
            time: Date.now(),
            address: result,
            type:
              points.findIndex((x) => x.type === typeCheck) === -1
                ? typeCheck
                : labeltype,
          },
        ]);
      }
    });
  };

  return (
    <div className={classes.root}>
      <div>
        <Grid container spacing={0}>
          <Grid item xs={3}>
            <Paper className={classes.LeftPanel}>
              <CalculateDistanceForm selectHandler={selectHandler} />
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Paper className={classes.mainForm}>
              {loading && <Loader />}
              <MapWrapper onMapClick={onMapClickHandle}></MapWrapper>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
