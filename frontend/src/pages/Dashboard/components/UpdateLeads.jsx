import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { PencilLine } from "lucide-react";
import { useLeads } from "../../../context/LeadsContext";
import InputField from "../../../components/InputField";

const LEAD_SOURCES = ["facebook", "google", "website", "whatsApp", "referral", "other"];
const STATUSES = ["new", "contacted", "interested", "won", "converted", "lost"];

const UpdateLeads = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { singleByIdLeads, updateLeads, loading } = useLeads();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    leadSource: "website",
    status: "new",
    notes: "",
  });
  const [formError, setFormError] = useState("");
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const load = async () => {
      // prefer row data passed via navigate state, fallback to API
      const stateLead = location.state;
      if (stateLead && (stateLead._id || stateLead.id)) {
        setForm({
          name: stateLead.name || "",
          phone: stateLead.phone || "",
          email: stateLead.email || "",
          company: stateLead.company || "",
          leadSource: stateLead.leadSource || "website",
          status: stateLead.status || "new",
          notes: stateLead.notes || "",
        });
        setFetching(false);
        return;
      }
      const data = await singleByIdLeads(id);
      if (data) {
        setForm({
          name: data.name || "",
          phone: data.phone || "",
          email: data.email || "",
          company: data.company || "",
          leadSource: data.leadSource || "website",
          status: data.status || "new",
          notes: data.notes || "",
        });
      }
      setFetching(false);
    };
    load();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.name?.trim() || !form.phone?.trim() || !form.leadSource) {
      return "Name, phone and lead source are required";
    }
    if (form.name.trim().length < 3) return "Name must be at least 3 characters";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Please enter a valid email";
    if (!/^[6-9]\d{9}$/.test(form.phone)) return "Please enter a valid 10-digit mobile number";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const msg = validate();
    if (msg) {
      setFormError(msg);
      return;
    }
    setFormError("");
    const updated = await updateLeads(id, form);
    if (updated) navigate("/dashboard/leads");
  };

  const selectCls =
    "px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 capitalize";

  if (fetching) {
    return (
      <div className="w-full bg-white border border-slate-200 rounded-xl shadow-sm p-10 text-center">
        <p className="text-sm text-slate-500">Loading lead...</p>
      </div>
    );
  }

  return (
    <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="p-2 rounded-lg bg-yellow-100 text-yellow-600">
              <PencilLine size={20} />
            </span>
            Edit Lead
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">Update the lead details below</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <InputField label="Full Name" name="name" value={form.name} onChange={handleChange} placeholder="e.g. John Doe" />
          <InputField label="Phone" name="phone" value={form.phone} onChange={handleChange} placeholder="10-digit mobile number" />
          <InputField label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="e.g. john@example.com" />
          <InputField label="Company" name="company" value={form.company} onChange={handleChange} placeholder="e.g. XYZ Company" />

          <div>
            <label htmlFor="leadSource" className="mb-2 text-slate-900 font-medium text-sm inline-block capitalize">
              Lead Source
            </label>
            <select id="leadSource" name="leadSource" value={form.leadSource} onChange={handleChange} className={selectCls}>
              {LEAD_SOURCES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="status" className="mb-2 text-slate-900 font-medium text-sm inline-block capitalize">
              Status
            </label>
            <select id="status" name="status" value={form.status} onChange={handleChange} className={selectCls}>
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="notes" className="mb-2 text-slate-900 font-medium text-sm inline-block capitalize">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={4}
              placeholder="Write a note about this lead..."
              className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 resize-none"
            />
          </div>

          {formError && (
            <p className="sm:col-span-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
              {formError}
            </p>
          )}

          <div className="sm:col-span-2 flex gap-3 pt-1">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 sm:flex-none sm:px-8 py-2.5 rounded-md bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {loading ? "Saving..." : "Update Lead"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard/leads")}
              className="px-6 py-2.5 rounded-md bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateLeads;
