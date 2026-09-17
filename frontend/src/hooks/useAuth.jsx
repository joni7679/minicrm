import { useContext, } from "react";
import { AuthConext } from "../context/AuthContext";

function useAuth() {
    const { user, authLoader } = useContext(AuthConext);

    return {
        user,
        authLoader
    }
}
export default useAuth