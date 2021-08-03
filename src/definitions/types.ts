import { MarkerType } from "../definitions/enums";

export type MarkerData = {
  id: string;
  lat: number;
  lng: number;
  time?: number;
  type?: MarkerType;
  address?: string;
};

export type RouteData = {
  fare: number;
  distance: string;
  duration: string;
  transfers: number;
};
