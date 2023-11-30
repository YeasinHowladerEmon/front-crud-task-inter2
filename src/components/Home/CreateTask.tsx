import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useCreateTaskMutation } from "../../redux/features/Task/taskApi";
import swal from "sweetalert";
import { TaskSchema, TaskSchemaType } from "../../schemas/zodSchema";






const CreateTask = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TaskSchemaType>({
        resolver: zodResolver(TaskSchema)
    });
    const [createTask] = useCreateTaskMutation()

    const onSubmit = async (data: TaskSchemaType) => {
        console.log(data);
        const options = {
            data: {
                title: data.title,
                description: data.description,
                status: data.status,
            }
        }
        const result = await createTask(options)
        if ('data' in result) {
            const message = (result as { data: { messages: string } })?.data.messages;
            swal(`Done! ${message}`, {
                icon: "success",
            })
        }
        reset()
    }
    return (
        <div className=" mt-10">
            <div className='grid grid-cols-1 justify-items-center'>
                <form onSubmit={handleSubmit(onSubmit)} className="lg:w-[60%] md:w-[43%] w-[100%]">
                    <div >
                        <label className='label'>Title</label>
                        <input type="text" className="input input-bordered input-primary w-full max-w-xs" placeholder="Title"   {...register('title')} />
                        {errors.title && <p>{errors.title.message}</p>}
                    </div>
                    <div className="mt-4">
                        <label className='label'>Description</label>
                        <textarea className="textarea textarea-bordered textarea-secondary textarea-md w-full max-w-xs" placeholder="Description"   {...register('description')} ></textarea>
                        {errors.description && <p>{errors.description.message}</p>}
                    </div>

                    <div className="mt-4">
                        <label className='label'>Status</label>
                        <select className="input input-bordered input-primary w-full max-w-xs"  {...register("status")}>
                            <option value="On Going">On Going</option>
                            <option value="Pending">Pending</option>
                            <option value="Complete">Complete</option>
                        </select>
                        {errors.status && <p>{errors.status.message}</p>}
                    </div>
                    <button className='mt-8 btn btn-primary' type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default CreateTask;