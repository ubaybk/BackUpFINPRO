import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
    const token = localStorage.getItem("token");

    if (token) {
        return <Navigate to="/dashboard" />; // Arahkan ke halaman dashboard atau halaman utama
    }

    return <Outlet />;
};

export default PublicRoute;
