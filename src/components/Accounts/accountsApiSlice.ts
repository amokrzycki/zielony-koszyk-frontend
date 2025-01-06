import { baseApi } from "../../api/api.ts";
import { CreateUser } from "../../types/CreateUser.ts";
import { ILoginFormValues } from "./LoginForm.tsx";
import { UpdatePasswordBody } from "../../types/UpdatePasswordBody.ts";
import { UpdateDetailsBody } from "../../types/updateDetailsBody.ts";
import User from "../../types/User.ts";

export const accountsApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body: CreateUser) => ({
        url: "users/register",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation({
      query: (body: ILoginFormValues) => ({
        url: "auth/login",
        method: "POST",
        body: {
          email: body.email,
          password: body.password,
        },
      }),
    }),
    getAccountInfo: builder.query({
      query: (body: string) => ({
        url: "users/" + body,
        method: "GET",
      }),
    }),
    getUsers: builder.query<User[], void>({
      query: () => ({
        url: "users",
        method: "GET",
      }),
    }),
    deleteUsers: builder.mutation<void, string>({
      query: (body: string) => ({
        url: "users/" + body,
        method: "DELETE",
      }),
    }),
    changePassword: builder.mutation({
      query: (body: UpdatePasswordBody) => ({
        url: "users/password-change/" + body.user_id,
        method: "PUT",
        body,
      }),
    }),
    changeEmail: builder.mutation({
      query: (body: { user_id: string; email: string }) => ({
        url: "users/" + body.user_id,
        method: "PUT",
        body,
      }),
    }),
    changeUserAddress: builder.mutation({
      query: (body: UpdateDetailsBody) => ({
        url: `users/change-address/${body.user_id}/address/${body.address_id}`,
        method: "PUT",
        body,
      }),
    }),
    changeUserDetails: builder.mutation<void, Partial<User>>({
      query: (body: Partial<User>) => ({
        url: `users/change-details/${body.user_id}`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetAccountInfoQuery,
  useGetUsersQuery,
  useDeleteUsersMutation,
  useChangePasswordMutation,
  useChangeEmailMutation,
  useChangeUserAddressMutation,
  useChangeUserDetailsMutation,
} = accountsApiSlice;
