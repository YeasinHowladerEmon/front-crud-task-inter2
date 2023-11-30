import { useEffect } from "react";
import { useGetTaskQuery, useTaskDeleteMutation, useTaskUpdateMutation } from "../../redux/features/Task/taskApi";
import { ITask } from "../../interface/interface";
import toast, { Toaster } from "react-hot-toast";
import swal from "sweetalert";

const Task = () => {

    const [taskDelete] = useTaskDeleteMutation()
    const [taskUpdate] = useTaskUpdateMutation()

    const { data, isLoading, isError, refetch } = useGetTaskQuery()
    if (isError) {
        toast.error("Something went wrong")
    }
    if (!isLoading) {
        toast.success('successful');
    }



    //Delete
    const handleDelete = async (id: string) => {

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this User!",
            icon: "warning",
            buttons: ["Cancel", "Delete"],
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                const options = {
                    id: id
                }
                const result = await taskDelete(options)
                if ('data' in result) {
                    swal("Done! Your User has been deleted!", {
                        icon: "success",
                    })
                }
            } else {
                swal("Your Task is Safe1")
            }
        }
        )
    }
    //status update
    const handleStatusUpdate = async (id: string, status: string) => {

        const options = {
            id: id,
            data: {
                status: status
            }
        }
        const result = await taskUpdate(options)
        if ('data' in result) {
            const message = (result as { data: { messages: string } })?.data.messages;
            swal(`Done! Your imaginary ${message}!`, {
                icon: "success",
            })
        }
    }



    useEffect(() => {
        refetch() // refetch the data from redux toolkit
    }, [refetch])
    console.log(data?.data)

    return (
        <div className="mt-20">
            <div className="grid grid-cols-1 justify-items-center">
                {
                    isLoading ?
                        (<Toaster
                            position="top-center"
                            reverseOrder={false}
                        />)
                        : isError ? (
                            <Toaster
                                position="top-center"
                                reverseOrder={false}
                            />) : (
                            data?.data?.map((task: ITask) => (
                                <div className="mt-4 card w-86 bg-neutral text-neutral-content" key={task._id}>
                                    <div className="card-body items-center text-center">
                                        <h2 className="card-title">{task.title}</h2>
                                        <p className="w-50">{task.description}</p>
                                        <div className="card-actions justify-end mt-4">
                                            <button className="btn btn-primary mr-20" onClick={() => handleDelete(task._id)}>Delete</button>
                                            <select className="input input-bordered input-primary " defaultValue={task.status} onChange={(e) => handleStatusUpdate(task._id, e.target.value)}>
                                                <option value="On Going">On Going</option>
                                                <option value="Pending">Pending</option>
                                                <option value="Complete">Complete</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
            </div>
        </div>
    );
};

export default Task;