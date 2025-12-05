import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const decoded = jwtDecode(token);
            return { isAuthenticated: true, role: decoded.role };
        } catch (e) {
            localStorage.removeItem("token");
            return { isAuthenticated: false, role: null };
        }
    }
    return { isAuthenticated: false, role: null };
};

const RequireAuth = ({ adminOnly = false }) => {
    const { isAuthenticated, role } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />;
    }

    if (adminOnly && role !== "ADMIN") {
        return <Navigate to="/home" replace />;
    }

    return <Outlet />;
};

export default RequireAuth;