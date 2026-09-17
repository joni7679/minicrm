import { useContext, useState } from "react"
import InputField from "../../components/InputField"
import { AuthConext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const { registerUser, loading, error } = useContext(AuthConext);
    const navigate = useNavigate()
    // handle Submit 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await registerUser({
            name,
            email,
            password
        });
        if (data) {
            toast.success("Register Successfully");
            setEmail("");
            setName("");
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
                        <h1 className="text-slate-900 text-center text-2xl font-bold">Create an account</h1>
                        {error && <div className="sm:col-span-2 mt-5 text-sm  bg-red-50 border border-red-200 rounded-md px-3 py-2">
                            <p className="text-red-600">{error}</p>
                        </div>}
                        <form onSubmit={handleSubmit} className="space-y-6 mt-10">
                            <InputField label="Name" placeholder="enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                            <InputField label="email" placeholder="Enter Your Email id" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <InputField type="password" label="password" placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                            <button type="submit"
                                disabled={loading}
                                className={`w-full py-2 px-3.5 text-sm rounded-md font-semibold cursor-pointer tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}>
                                {
                                    loading ? <>
                                        <p className="flex items-center justify-center">
                                            <Loader className="animate-spin" />
                                            createing...
                                        </p>
                                    </>
                                        :
                                        "  Create an account"
                                }
                            </button>
                        </form>

                        <div className="mt-6 text-slate-900 text-sm text-center">Already have an account? <Link to={"/login"}
                            className="text-blue-700 hover:underline ml-1 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                            Login here</Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Register
