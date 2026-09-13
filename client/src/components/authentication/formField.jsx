export const FormField = ({
  label,
  register,
  name,
  type = "text",
  placeholder,
  options,
  required = false,
}) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-sm font-medium text-gray-600 ml-1">{label}</label>

    <input
      type={type}
      placeholder={placeholder}
      {...register(name, {
        required: required ? `${label} is required` : false,
      })}
      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
    />
  </div>
);
