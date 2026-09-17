import { Search } from "lucide-react";

const LeadSearch = ({ value, onChange }) => {
    return (
        <div className="relative w-full sm:max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search name, email, company..."
                className="w-full pl-9 pr-3 py-2.5 text-sm text-slate-900 rounded-md bg-white outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
            />
        </div>
    );
};

export default LeadSearch;
