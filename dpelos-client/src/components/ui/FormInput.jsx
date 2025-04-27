import { useField } from "formik";
import Input from "../ui/Input";

const FormInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-4">
      <label
        htmlFor={props.id || field.name}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <Input
        // className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-xs">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default FormInput;
