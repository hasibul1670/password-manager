import { api } from "../api/apiSlice";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    sendOtp: builder.mutation({
      query: ({ data }) => ({
        url: `/auth/send-otp`,
        method: "POST",
        body: data,
      }),
    }),
    verifyOtp: builder.mutation({
      query: ({ data }) => ({
        url: `/auth/verify-otp`,
        method: "POST",
        body: data,
      }),
    }),
    logOut: builder.mutation({
        query: () => ({
            url: `/auth/logout`,
            method: "POST",
        }),
    })
  }),
});

export const {
    useSendOtpMutation,
    useVerifyOtpMutation,
    useLogOutMutation,
} = authApi;
