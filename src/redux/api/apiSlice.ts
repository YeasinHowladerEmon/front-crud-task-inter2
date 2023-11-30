import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "task",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1"
  }),
  tagTypes: ["task"],
  endpoints: () => ({})
});
