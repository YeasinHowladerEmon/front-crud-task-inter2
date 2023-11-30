import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
const Layout = () => {
    return (
        <div className="">
            <Navbar />
            <div className="pt-16">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;