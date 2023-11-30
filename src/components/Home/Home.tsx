import CreateTask from "./CreateTask";
import Task from "./Task";


const Home = () => {
    return (
        <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 ">
            <CreateTask />
            <Task />
        </div>
    );
};

export default Home;