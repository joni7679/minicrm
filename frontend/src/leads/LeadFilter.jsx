const LeadFilter = ({ status, setStatus, source, setSource }) => {
    const selectCls =
        "px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 capitalize";
    return (
        <div className="flex flex-col sm:flex-row gap-2">
            <select value={status} onChange={(e) => setStatus(e.target.value)} className={selectCls}>
                <option value="">All Status</option>
                <option value="new">new</option>
                <option value="contacted">contacted</option>
                <option value="interested">interested</option>
                <option value="won">won</option>
                <option value="converted">converted</option>
                <option value="lost">lost</option>
            </select>
            <select value={source} onChange={(e) => setSource(e.target.value)} className={selectCls}>
                <option value="">All Sources</option>
                <option value="facebook">facebook</option>
                <option value="google">google</option>
                <option value="website">website</option>
                <option value="whatsApp">whatsApp</option>
                <option value="referral">referral</option>
                <option value="other">other</option>
            </select>
        </div>
    );
};

export default LeadFilter;
