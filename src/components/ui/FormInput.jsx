const FormInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  className = "",
  icon,
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="text-sm font-black text-gray-700 uppercase ml-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={`w-full p-4 ${
            icon ? "pl-12" : "pl-4"
          } bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none transition-all font-medium placeholder:text-gray-400 shadow-sm`}
        />
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl pointer-events-none">
            {icon}
          </span>
        )}
      </div>
    </div>
  );
};

export default FormInput;
