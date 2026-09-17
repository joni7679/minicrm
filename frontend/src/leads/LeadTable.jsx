import { Eye, Pen, Trash2 } from "lucide-react";

export const statusStyle = {
    new: "bg-blue-100 text-blue-700",
    contacted: "bg-yellow-100 text-yellow-700",
    interested: "bg-purple-100 text-purple-700",
    won: "bg-emerald-100 text-emerald-700",
    converted: "bg-green-100 text-green-700",
    lost: "bg-red-100 text-red-700",
};

const LeadTable = ({ leads = [], onView, onEdit, onDelete }) => {
    if (!leads.length) {
        return (
            <div className="w-full bg-white border border-slate-200 rounded-xl shadow-sm p-10 text-center">
                <p className="text-slate-900 font-semibold">No leads found</p>
                <p className="text-sm text-slate-500 mt-1">Create your first lead to get started.</p>
            </div>
        );
    }

    return (
        <div className="w-full bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[750px]">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr className="text-left text-xs sm:text-sm font-semibold text-slate-700 whitespace-nowrap">
                            <th className="px-4 sm:px-5 py-4">Name</th>
                            <th className="px-4 sm:px-5 py-4">Company</th>
                            <th className="px-4 sm:px-5 py-4">Phone</th>
                            <th className="px-4 sm:px-5 py-4">Email</th>
                            <th className="px-4 sm:px-5 py-4">Source</th>
                            <th className="px-4 sm:px-5 py-4">Status</th>
                            <th className="px-4 sm:px-5 py-4">Date</th>
                            <th className="px-4 sm:px-5 py-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {leads.map((lead) => {
                            const id = lead._id || lead.id;
                            const date = lead.createdAt
                                ? new Date(lead.createdAt).toLocaleDateString("en-IN", {
                                    day: "numeric", month: "short", year: "numeric",
                                })
                                : lead.date || "-";
                            return (
                                <tr key={id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-4 sm:px-5 py-4">
                                        <p className="font-medium text-sm text-slate-900 whitespace-nowrap">{lead.name}</p>
                                    </td>
                                    <td className="px-4 sm:px-5 py-4">
                                        <p className="text-sm text-slate-700 whitespace-nowrap">{lead.company}</p>
                                    </td>
                                    <td className="px-4 sm:px-5 py-4">
                                        <p className="text-sm text-slate-600 whitespace-nowrap">{lead.phone}</p>
                                    </td>
                                    <td className="px-4 sm:px-5 py-4">
                                        <p className="text-sm text-slate-600 whitespace-nowrap">{lead.email}</p>
                                    </td>
                                    <td className="px-4 sm:px-5 py-4">
                                        <p className="text-sm text-slate-600 whitespace-nowrap capitalize">{lead.leadSource || lead.source}</p>
                                    </td>
                                    <td className="px-4 sm:px-5 py-4">
                                        <span className={`p-2 rounded-lg text-xs font-semibold capitalize ${statusStyle[lead.status] || "bg-slate-100 text-slate-600"}`}>
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td className="px-4 sm:px-5 py-4">
                                        <p className="text-sm text-slate-500 whitespace-nowrap">{date}</p>
                                    </td>
                                    <td className="px-4 sm:px-5 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => onView?.(lead)}
                                                title="View"
                                                className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => onEdit?.(lead)}
                                                title="Edit"
                                                className="p-2 rounded-lg bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                            >
                                                <Pen size={16} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => onDelete?.(id)}
                                                title="Delete"
                                                className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition focus:outline-none focus:ring-2 focus:ring-red-400"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeadTable;
