import InputField from "../../components/InputField"

const Login = () => {
    return (
        <>
            <main className="px-4 md:px-8 min-h-screen flex flex-col items-center justify-center">
                <div className="max-w-md w-full">
                    <div
                        className="p-6 rounded-lg bg-white border border-slate-300 shadow-xs md:p-6">
                        <h1 className="text-slate-900 text-center text-2xl font-bold capitalize">Wellcome back</h1>
                        <form className="space-y-6 mt-10">
                            <InputField label="email" placeholder="Enter Your Email id" />
                            <InputField label="password" placeholder="Enter Your Password" />
                            <button type="submit"
                                className="w-full py-2 px-3.5 text-sm rounded-md font-semibold cursor-pointer tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                                Login</button>
                        </form>
                        <div className="mt-6 text-slate-900 text-sm text-center">Don't have an account? <a href="#"
                            className="text-blue-700 hover:underline ml-1 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                            Register here</a>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Login
