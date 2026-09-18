import { Menu } from "lucide-react"
import useAuth from "../hooks/useAuth"
import { useContext } from "react";
import { AuthConext } from "../context/AuthContext";
import toast from "react-hot-toast";

const Header = () => {
    const { user } = useAuth();
    const { LogOutuser } = useContext(AuthConext);
    // handle logout user
    const handleLogOut = async () => {
        await LogOutuser();
        toast.success("user logout successfully")
    }
    return (
        <>
            <header
                className="flex py-2 sticky top-0 w-full bg-white border-b border-slate-300 px-6 min-h-[68px] z-20"
                aria-label="header">
                <div className="flex flex-wrap items-center gap-4 w-full">
                    <Menu />
                    <h1 className="text-xl text-slate-900 font-bold">Dashboard</h1>
                    <div className="flex items-center flex-wrap gap-5 ml-auto">
                        {user?.name || "Guest"}
                        <button onClick={handleLogOut} className="px-3 py-2 bg-red-500 text-white rounded-2xl cursor-pointer">Logout </button>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header
