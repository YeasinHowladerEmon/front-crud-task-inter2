import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="">
            <div className="navbar bg-primary text-primary-content h-[75px]">
                <div className="container-x flex items-center justify-between">
                    <div>
                        <Link to='/' className="text-white font-bold text-4xl">Task</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;