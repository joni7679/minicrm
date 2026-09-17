import { useContext, useState } from "react";
import InputField from "../../components/InputField"
import { AuthConext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const { LoginUser, loading, error } = useContext(AuthConext);
    const navigate = useNavigate()
    // handelLogin
    const handelLogin = async (e) => {
        e.preventDefault();
        const data = await LoginUser({
            email,
            password
        });
        if (data) {
            toast.success("Login Successfully");
            setEmail("");
            setPassword("");
            navigate("/dashboard");
        }
    };
    return (
        <>
            <main className="px-4 md:px-8 min-h-screen flex flex-col items-center justify-center">
                <div className="max-w-md w-full">
                    <div
                        className="p-6 rounded-lg bg-white border border-slate-300 shadow-xs md:p-6">
                        <h1 className="text-slate-900 text-center text-2xl font-bold capitalize">Wellcome back</h1>
                        {error && <div className="sm:col-span-2 mt-5 text-sm  bg-red-50 border border-red-200 rounded-md px-3 py-2">
                            <p className="text-red-600">{error}</p>
                        </div>}
                        <form onSubmit={handelLogin} className="space-y-6 mt-10">
                            <InputField type="text" label="email" placeholder="Enter Your Email id" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <InputField type="password" label="password" placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button type="submit"
                                disabled={loading}
                                className={`w-full py-2 px-3.5 text-sm rounded-md font-semibold cursor-pointer tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}>

                                {
                                    loading ? <>
                                        <p className="flex items-center justify-center">
                                            <Loader className="animate-spin" />
                                            Login...
                                        </p>
                                    </>
                                        :
                                        "  Login"
                                }
                            </button>
                        </form>
                        <div className="mt-6 text-slate-900 text-sm text-center">Don't have an account? <Link to={"/"}
                            className="text-blue-700 hover:underline ml-1 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                            Register here</Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Login
