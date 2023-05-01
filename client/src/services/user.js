import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const registerapi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/users",
  prepareHeaders:(headers)=>{
    headers.set('Content-Type', 'application/json');
    return headers;
  } }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/signup",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});
