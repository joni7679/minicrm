
const InputField = ({ type = "text", name, value, onChange, label, placeholder, Icon, onClick }) => {
    return (
        <>
            <div className="realtive">
                <label for={name}
                    className="mb-2 text-slate-900 font-medium text-sm inline-block capitalize">{label}</label>
                <input
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600" />
            </div>
        </>
    )
}

export default InputField
