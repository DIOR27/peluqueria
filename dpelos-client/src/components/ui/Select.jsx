import ReactSelect  from "react-select";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? '#000000' : '#d1d5db',
    boxShadow: state.isFocused ? '0 0 0 1px #000000' : 'none',
    '&:hover': {
      borderColor: state.isFocused ? '#000000' : '#9ca3af',
    },
  }),
};

export default function Select({
  options,
  onChange,
  value,
  placeholder,
  isSearchable,
  isClearable,
  isMulti,
  label,
  helperText,
}) {
  return (
    <div className="w-full">
      {label ? <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label> : null}
      <ReactSelect
        options={options}
        onChange={onChange}
        value={value} // {value: string, label: string}
        placeholder={placeholder}
        isSearchable={isSearchable}
        isMulti={isMulti}
        styles={customStyles}
        isClearable={isClearable}
      />
      {helperText ? <p className="text-sm text-gray-500">{helperText}</p> : null}
    </div>
  );
}