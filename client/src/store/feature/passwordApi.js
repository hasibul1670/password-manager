import { api } from "../api/apiSlice";

const passwordApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPassword: builder.query({
      query: () => `/password/all-password`,
      providesTags: ["password"],
    }),

    singlePassword: builder.query({
      query: (id) => `/password/${id}`,
      providesTags: ["password"],
    }),

    createPassword: builder.mutation({
      query: ({ data }) => ({
        url: `/password/create-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["password"],
    }),
    updatePassword: builder.mutation({
      query: ({ data, id }) => ({
        url: `/password/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["password"],
    }),
    deletePassword: builder.mutation({
      query: ({ id }) => ({
        url: `/password/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["password"],
    }),
  }),
});

export const {
    useGetPasswordQuery,
    useSinglePasswordQuery,
    useCreatePasswordMutation,
    useUpdatePasswordMutation,
    useDeletePasswordMutation,
    
} = passwordApi;
