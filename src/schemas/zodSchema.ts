import { ZodType, z } from "zod";
type IUserInputs = {
  title: string;
  description: string;
  status: string;
};

export const TaskSchema: ZodType<IUserInputs> = z
  .object({
    title: z
      .string()
      .nonempty({ message: "Title is required" })
      .min(3, { message: "Title must be at least 3 characters" })
      .max(20, { message: "Title must not exceed 20 characters" }),
    description: z
      .string()
      .nonempty({ message: "Description is required" })
      .min(5, { message: "Description must be at least 5 characters" })
      .max(60, { message: "Description must not exceed 20 characters" }),
    status: z.string()
  })
  .required();

export type TaskSchemaType = z.infer<typeof TaskSchema>;
