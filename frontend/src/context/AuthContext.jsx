import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
axios.defaults.withCredentials = true
export const AuthConext = createContext();
function AuthConextProvider({ children }) {
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false)
    const [authLoader, setAuthLoader] = useState(true);
    const backendApi = import.meta.env.VITE_BACKEND_URL;
    const registerUser = async ({ name, email, password }) => {
        setLoading(true);
        try {
            const res = await axios.post(`${backendApi}/auth/register`, { name, email, password });
            const finalRes = res.data.data;
            console.log("res", finalRes)
            setUser(finalRes);
            return finalRes;
        } catch (error) {
            const message = error.response?.data.message
            setError(message);
            console.log(error.response?.data.message);
            toast.error(message);
            return null;
        } finally {
            setLoading(false);
            setTimeout(() => {
                setError(null)
            }, 2000);
        }
    };
    const LoginUser = async ({ email, password }) => {
        setLoading(true);
        try {
            const res = await axios.post(`${backendApi}/auth/login`, { email, password });
            const finalRes = res.data.data;
            console.log("res", finalRes)
            setUser(finalRes)
            return finalRes;
        } catch (error) {
            setError(error.response?.data.message)
            return null;
        } finally {
            setTimeout(() => {
                setError(null)
            }, 2000);
            setLoading(false)
        }
    };
    const userProfile = async () => {
        try {
            setAuthLoader(true);
            const res = await axios.get(`${backendApi}/auth/profile`);
            const finalRes = res.data.data;
            console.log(finalRes)
            setUser(finalRes);
            return finalRes
        } catch (error) {
            console.warn(error.response?.data?.message)
            setUser(null);
        } finally {
            setAuthLoader(false)
        }
    }
    const LogOutuser = async () => {
        setLoading(true);
        try {
            await axios.post(`${backendApi}/auth/logout`, {},);
            console.log("logout successfully");
            setUser(null)
        } catch (error) {
            setError(error.response?.data?.message)
            return null;
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        userProfile()
    }, []);

    return <AuthConext.Provider value={{ registerUser, authLoader, loading, error, LoginUser, userProfile, user, LogOutuser, }}>
        {children}
    </AuthConext.Provider>
}

export default AuthConextProvider