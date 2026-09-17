import axios from "axios";
import { createContext, useContext, useState } from "react";
axios.defaults.withCredentials = true

export const LeadContext = createContext(null);

const LeadContextProvider = ({ children }) => {
    const backendApi = import.meta.env.VITE_BACKEND_URL;
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [leads, setLeads] = useState([]);
    const [leadSingleData, setLeadSingleData] = useState(null)

    const showError = (message) => {
        setError(message);
        setTimeout(() => {
            setError(null)
        }, 2000);
    };

    // add lead logic here
    const addLeads = async ({ name, phone, email, company, leadSource, status, notes }) => {
        setLoading(true);
        try {
            const res = await axios.post(`${backendApi}/leads`, { name, phone, email, company, leadSource, status, notes });
            const finalRes = res.data.data;
            setLeads((prev) => [finalRes, ...prev]);
            return finalRes;
        } catch (error) {
            const message = error.response?.data?.message || "Failed to add lead";
            showError(message)
            return null;
        } finally {
            setLoading(false);
        }
    }
    // leads list logic here
    const fetchLeads = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${backendApi}/leads`);
            const finalRes = res.data.data || [];
            setLeads(finalRes)
            return finalRes;
        } catch (error) {
            const message = error.response?.data?.message || "Failed to fetch leads";
            showError(message)
            return [];
        } finally {
            setLoading(false);
        }
    }
    // update lead logic here
    const updateLeads = async (id, data) => {
        setLoading(true);
        try {
            const res = await axios.patch(`${backendApi}/leads/${id}`, data);
            const finalRes = res.data.data;
            setLeads((prev) => prev.map((l) => ((l._id || l.id) === id ? finalRes : l)));
            return finalRes
        } catch (error) {
            const message = error.response?.data?.message || "Failed to update lead";
            showError(message)
            return null;
        } finally {
            setLoading(false);
        }
    }

    // delete lead logic here
    const deleteLeads = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`${backendApi}/leads/${id}`);
            setLeads((prev) => prev.filter((l) => (l._id || l.id) !== id));
            return true;
        } catch (error) {
            const message = error.response?.data?.message || "Failed to delete lead";
            showError(message)
            return false;
        } finally {
            setLoading(false);
        }
    };

    // single by leads
    const singleByIdLeads = async (id) => {
        setLoading(true);
        try {
            const res = await axios.get(`${backendApi}/leads/${id}`);
            const finalRes = res.data.data;
            setLeadSingleData(finalRes);
            return finalRes
        } catch (error) {
            const message = error.response?.data?.message || "Failed to fetch lead";
            showError(message)
            return null;
        } finally {
            setLoading(false);
        }
    }

    return <LeadContext.Provider value={{ addLeads, loading, leads, error, fetchLeads, updateLeads, deleteLeads, singleByIdLeads, leadSingleData }}>
        {children}
    </LeadContext.Provider>

}

export const useLeads = () => {
    const ctx = useContext(LeadContext);
    if (!ctx) throw new Error("useLeads must be used within LeadContextProvider");
    return ctx;
};

export default LeadContextProvider
