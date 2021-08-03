import { MarkerData } from "../../definitions/types";

export const getAddressByLatLngHelper = function (
  point: MarkerData
): Promise<string> {
  return new Promise((resolve, reject) => {
    const latlng = {
      lat: point.lat,
      lng: point.lng,
    };
    const geocoder: google.maps.Geocoder = new google.maps.Geocoder();

    geocoder.geocode({ location: latlng }).then((response) => {
      if (response.results[0] !== null) {
        resolve(response.results[0].formatted_address);
      } else {
        reject("");
      }
    });
  });
};
