import { sidebardata } from "../data/sidebardata"
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <>
            <aside className="w-[264px] min-w-[264px] z-50 overflow-hidden opacity-100 transition-all duration-300 ease-in-out"
                id="sidebar" aria-label="Sidebar navigation">
                <div id="sidebar-inner"
                    className="fixed top-0 left-0 w-[264px] h-full flex flex-col overflow-auto py-6 px-4 bg-white border-r border-slate-300">
                    <p className="uppercase">Mini crm</p>
                    <nav>
                        <ul className="space-y-2 text-sm text-slate-800 font-medium mt-5">
                            {sidebardata.map((data, index) => {
                                const { label, link, icon } = data;
                                const Icon = icon
                                return (
                                    <Link to={link} key={index} className="flex items-center gap-2.5 hover:text-slate-900 hover:bg-slate-100 rounded-md px-3 py-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 capitalize">
                                        <Icon />
                                        <p>
                                            <span>{label}</span>
                                        </p>
                                    </Link>
                                )
                            })}
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    )
}

export default Sidebar
