import { Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
    const { user, authLoader } = useAuth();
    if (authLoader) {
        return <div>Loading...</div>
    }
    if (!user) {
        return <Navigate to="/login" replace />
    }
    return children
}

export default ProtectedRoute