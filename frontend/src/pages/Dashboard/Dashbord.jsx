import { Outlet } from "react-router-dom"
import Header from "../../layout/Header"
import Sidebar from "../../layout/Sidebar"

const Dashbord = () => {
    return (
        <>
            <main className='w-full min-h-screen bg-gray-100'>
                <Header />
                <div className="flex w-full h-screen  overflow-y-auto">
                    <div className={` shrink-0 overflow-hidden transition-all duration-300  mt-5 `}>
                        <Sidebar />
                    </div>
                    <section className={` w-[80%] transition-all     duration-300  p-5`}>
                        <Outlet />
                    </section>
                </div>
            </main>
        </>
    )
}

export default Dashbord
