import { z } from "zod";
import api from "..";

export const getSearchedFlight = async (body: any) => {
  const { data } = await api.get(
    `/api/flight?from=${body.from}&where=${body.where}&adult=${body.adult}&child=${body.child}&price=${body.price}&departureDate=${body?.departureDate}`
  );
  return data;
};

export const getSingleFlight = async (body: any) => {
  const { data } = await api.get(
    `/api/flight/${body?.id}?from=${body.from}&where=${body.where}&adult=${body.adult}&child=${body.child}&price=${body.price}&departureDate=${body?.departureDate}`
  );
  return data;
};
