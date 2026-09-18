import { User2 } from "lucide-react";
import React, { useContext } from "react";
import {
    RiTeamLine,
    RiUserAddLine,
    RiPhoneLine,
    RiStarLine,
    RiCheckboxCircleLine,
    RiCloseCircleLine,
    RiArrowUpLine,
    RiArrowDownLine,
} from "react-icons/ri";
import { useLeads } from "../../../context/LeadsContext";

const stats = [
    {
        title: "TOTAL LEADS",
        value: 120,
        icon: RiTeamLine,
        iconStyle: "bg-blue-50 text-blue-600",
        change: "+12% vs last month",
        changeStyle: "text-emerald-600",
        direction: "up",
    },
    {
        title: "NEW LEADS",
        value: 35,
        icon: RiUserAddLine,
        iconStyle: "bg-blue-50 text-blue-600",
        change: "+8% this week",
        changeStyle: "text-emerald-600",
        direction: "up",
    },
    {
        title: "CONTACTED",
        value: 28,
        icon: RiPhoneLine,
        iconStyle: "bg-purple-50 text-purple-600",
        change: "+5% vs target",
        changeStyle: "text-purple-600",
        direction: "up",
    },
    {
        title: "INTERESTED",
        value: 22,
        icon: RiStarLine,
        iconStyle: "bg-amber-50 text-amber-600",
        change: "+14% rate",
        changeStyle: "text-orange-500",
        direction: "up",
    },
    {
        title: "CONVERTED",
        value: 20,
        icon: RiCheckboxCircleLine,
        iconStyle: "bg-emerald-50 text-emerald-600",
        change: "+18% won",
        changeStyle: "text-emerald-600",
        direction: "up",
    },
    {
        title: "LOST",
        value: 15,
        icon: RiCloseCircleLine,
        iconStyle: "bg-red-50 text-red-500",
        change: "-2% churn",
        changeStyle: "text-red-500",
        direction: "down",
    },
];

const LeadStats = () => {
    const { leads = [] } = useLeads()

    const totalLeads = leads.length;
    const newLeads = leads.filter((lead) => lead.status === "new").length;
    const conTactLeads = leads.filter((lead) => lead.status === "contacted").length
    const interesledLeads = leads.filter((lead) => lead.status === "interested").length
    const wonledLeads = leads.filter((lead) => lead.status === "won").length
    const converledLeads = leads.filter((lead) => lead.status === "converted").length
    const lostledLeads = leads.filter((lead) => lead.status === "converted").length

    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <StatusCard title="total leads" value={totalLeads} icon={<User2 />} />
            <StatusCard title="contact leads" value={conTactLeads} icon={<User2 />} />
            <StatusCard title="new leads" value={newLeads} icon={<User2 />} />
            <StatusCard title="interested leads" value={interesledLeads} icon={<User2 />} />
            <StatusCard title="won leads" value={wonledLeads} icon={<User2 />} />
            <StatusCard title="conver leads" value={converledLeads} icon={<User2 />} />
            <StatusCard title="lost leads" value={lostledLeads} icon={<lostledLeads />} />
        </div>
    );
};

export default LeadStats;

const StatusCard = ({ title, value }) => {
    return (
        <div
            className="
              rounded-xl
              border border-slate-200
              bg-white
              p-3
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:shadow-md
            "
        >

            <div className="flex items-start justify-between">

                <span className="text-[10px] font-medium tracking-wide text-slate-500">
                    {title}
                </span>

                <div
                    className={`
                  flex h-7 w-7 shrink-0
                  items-center justify-center
                  rounded-lg
                  
                `}
                >
                </div>
            </div>
            {/* Number */}
            <h2 className="mt-1 text-[28px] font-semibold leading-none text-slate-900">
                <span>{value}</span>
            </h2>
            <div
                className={`
                mt-2 flex items-center gap-0.5
                text-[9px] font-medium
               
              `}
            >
            </div>
        </div>
    )
}