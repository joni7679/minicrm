import { statusStyle } from "./LeadTable";

const LeadCard = ({ lead, onView }) => {
    if (!lead) return null;
    return (
        <div
            onClick={() => onView?.(lead)}
            className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 cursor-pointer hover:shadow-md transition"
        >
            <div className="flex items-start justify-between gap-2">
                <div>
                    <p className="font-semibold text-slate-900">{lead.name}</p>
                    <p className="text-xs text-slate-500">{lead.company} • {lead.email}</p>
                </div>
                <span className={`px-2 py-1 rounded-lg text-xs font-semibold capitalize ${statusStyle[lead.status] || "bg-slate-100 text-slate-600"}`}>
                    {lead.status}
                </span>
            </div>
            <p className="text-xs text-slate-600 mt-2 capitalize">
                {lead.phone} • {lead.leadSource}
            </p>
            {lead.notes && <p className="text-xs text-slate-500 mt-1 line-clamp-2">{lead.notes}</p>}
        </div>
    );
};

export default LeadCard;
