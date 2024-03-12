import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Plant } from "../interfaces";

export const plantApi = createApi({
  reducerPath: "plantApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9000/" }),
  tagTypes: ["AllPlants", "OnePlant"],
  endpoints: (builder) => ({
    getAllPlants: builder.query<Plant[], void>({
      query: () => "plants",
      // providesTags: ["AllPlants"],
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "AllPlants" as const, id })),
              { type: "AllPlants", id: "LIST" },
            ]
          : [{ type: "AllPlants", id: "LIST" }],
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
      // invalidatesTags: ["AllPlants"],
      //Optimistic Updates
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(
          plantApi.util.updateQueryData("getPlantById", id, (draft) => {
            Object.assign(draft, data);
          })
        );
        //dispatch(plantApi.util.invalidateTags(["AllPlants"]));
        dispatch(
          plantApi.util.invalidateTags([{ type: "AllPlants", id: "LIST" }])
        );
      },
    }),
    addPlant: builder.mutation<Plant, Partial<Plant>>({
      query: (newPlant) => ({
        url: "plants",
        method: "POST",
        body: newPlant,
      }),
      // invalidatesTags: ["AllPlants"],
      invalidatesTags: (result, error, arg) => [
        { type: "AllPlants", id: arg.id },
      ],
    }),
    editPlant: builder.mutation<
      void,
      { id: string; editPlant: Partial<Plant> }
    >({
      query: ({ id, editPlant }) => ({
        url: `plants/${id}`,
        method: "PATCH",
        body: editPlant,
      }),
      // Pessimistic Update
      async onQueryStarted({ id, ...editPlant }, { dispatch, queryFulfilled }) {
        try {
          const { data: editPlantData } = await queryFulfilled;
          const editResult = dispatch(
            plantApi.util.updateQueryData("getPlantById", id, (draft) => {
              Object.assign(draft, editPlantData);
            })
          );
        } catch {}
      },
      // invalidatesTags: ["OnePlant", "AllPlants"],
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
