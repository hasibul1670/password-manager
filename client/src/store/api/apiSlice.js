/* eslint-disable no-undef */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const getBaseUrl = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://passwordappserver.vercel.app/api/v1";
  } else {
    return "http://localhost:5000/api/v1";
    // return "https://passwordappserver.vercel.app/api/v1";
  }
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),
  }),

  tagTypes: [
    "auth",
    "password",
  ],

  endpoints: () => ({}),
});
