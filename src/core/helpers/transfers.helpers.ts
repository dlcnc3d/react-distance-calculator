export const getTransfers = (routes: google.maps.DirectionsResult): number => {
  var count = 0;
  for (let i = 0; i < routes.routes[0].legs[0].steps.length; i++)
    if (routes.routes[0].legs[0].steps[i].travel_mode === "TRANSIT") count++;

  console.log(count);
  return count;
};
