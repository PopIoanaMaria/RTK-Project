import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Plant } from "../interfaces";

export const plantApi = createApi({
  reducerPath: "plantApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9000/" }),
  tagTypes: ["AllPlants", "OnePlant"],
  endpoints: (builder) => ({
    getAllPlants: builder.query<Plant[], void>({
      query: () => "plants",
      providesTags: ["AllPlants"],
    }),
    getPlantById: builder.query<Plant, string>({
      query: (id) => `plants/${id}`,
      providesTags: ["OnePlant"],
    }),
    deletePlant: builder.mutation<Plant, string>({
      query: (id) => ({
        url: `plants/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AllPlants"],
    }),
    addPlant: builder.mutation<Plant, Partial<Plant>>({
      query: (newPlant) => ({
        url: "plants",
        method: "POST",
        body: newPlant,
      }),
      invalidatesTags: ["AllPlants"],
    }),
    editPlant: builder.mutation<
      Plant,
      { id: string; editPlant: Partial<Plant> }
    >({
      query: ({ id, editPlant }) => ({
        url: `plants/${id}`,
        method: "PATCH",
        body: editPlant,
      }),
      invalidatesTags: ["OnePlant", "AllPlants"],
    }),
  }),
});

export const {
  useGetAllPlantsQuery,
  useGetPlantByIdQuery,
  useDeletePlantMutation,
  useAddPlantMutation,
  useEditPlantMutation,
} = plantApi;
