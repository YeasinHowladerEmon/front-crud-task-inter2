import { ITask } from "../../../interface/interface";
import { api } from "../../api/apiSlice";

export interface GetUserResponse {
  data: ITask[];
}

export const TaskApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTask: builder.query<GetUserResponse, void>({
      query: () => `/task/`,
      providesTags: ["task"]
    }),
    taskUpdate: builder.mutation({
      query: ({ id, data }) => ({
        url: `/task/taskUpdate/${id}`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ["task"]
    }),
    taskDelete: builder.mutation({
      query: ({ id }) => ({
        url: `/task/taskDelete/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["task"]
    }),
    createTask: builder.mutation({
      query: ({ data }) => ({
        url: `/task/create-task`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ["task"]
    })
  })
});

export const {
  useGetTaskQuery,
  useTaskUpdateMutation,
  useTaskDeleteMutation,
  useCreateTaskMutation
} = TaskApi;
