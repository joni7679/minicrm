import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import LeadTable from "../../../leads/LeadTable";
import LeadSearch from "../../../leads/LeadSearch";
import LeadFilter from "../../../leads/LeadFilter";
import { LeadContext } from "../../../context/LeadsContext";

const LeadsPage = () => {
    const { leads, loading, fetchLeads, deleteLeads, singleByIdLeads } = useContext(LeadContext);
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [source, setSource] = useState("");

    useEffect(() => {
        fetchLeads();
    }, []);

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        return leads.filter((l) => {
            const matchSearch =
                !q ||
                l.name?.toLowerCase().includes(q) ||
                l.email?.toLowerCase().includes(q) ||
                l.company?.toLowerCase().includes(q) ||
                l.phone?.includes(q);
            const matchStatus = !status || l.status === status;
            const matchSource = !source || l.leadSource === source;
            return matchSearch && matchStatus && matchSource;
        });
    }, [leads, search, status, source]);

    const handleView = async (lead) => {
        const id = lead._id || lead.id;
        await singleByIdLeads(id);
        console.log("View:", lead);
    };

    const handleEdit = (lead) => {
        const id = lead._id || lead.id;
        navigate(`/dashboard/leads/edit/${id}`, { state: lead });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this lead?")) return;
        await deleteLeads(id);
    };

    return (
        <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
            <div className="w-full max-w-7xl mx-auto">
                <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Leads</h2>
                        <p className="mt-1 text-xs sm:text-sm text-slate-500">
                            Manage and track all your leads ({filtered.length})
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => navigate("/dashboard/addleads")}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
                    >
                        <Plus size={16} /> Add Lead
                    </button>
                </div>

                <div className="mb-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
                    <LeadSearch value={search} onChange={setSearch} />
                    <LeadFilter status={status} setStatus={setStatus} source={source} setSource={setSource} />
                </div>

                {loading && leads.length === 0 ? (
                    <div className="w-full bg-white border border-slate-200 rounded-xl shadow-sm p-10 text-center">
                        <p className="text-sm text-slate-500">Loading leads...</p>
                    </div>
                ) : (
                    <LeadTable
                        leads={filtered}
                        onView={handleView}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
            </div>
        </div>
    );
};

export default LeadsPage;
