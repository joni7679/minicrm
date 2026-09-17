import React from "react";
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
    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">

            {stats.map((item, index) => {
                const Icon = item.icon;
                const Arrow =
                    item.direction === "up"
                        ? RiArrowUpLine
                        : RiArrowDownLine;

                return (
                    <div
                        key={index}
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
                        {/* Top */}
                        <div className="flex items-start justify-between">

                            <span className="text-[10px] font-medium tracking-wide text-slate-500">
                                {item.title}
                            </span>

                            <div
                                className={`
                  flex h-7 w-7 shrink-0
                  items-center justify-center
                  rounded-lg
                  ${item.iconStyle}
                `}
                            >
                                <Icon className="text-[16px]" />
                            </div>

                        </div>

                        {/* Number */}
                        <h2 className="mt-1 text-[28px] font-semibold leading-none text-slate-900">
                            {item.value}
                        </h2>

                        {/* Change */}
                        <div
                            className={`
                mt-2 flex items-center gap-0.5
                text-[9px] font-medium
                ${item.changeStyle}
              `}
                        >
                            <Arrow className="text-[11px]" />

                            <span>{item.change}</span>
                        </div>

                    </div>
                );
            })}

        </div>
    );
};

export default LeadStats;