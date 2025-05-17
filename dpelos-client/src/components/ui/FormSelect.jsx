import { useField, useFormikContext } from "formik";
import { memo } from "react";
import Select from "./Select";

const FormSelect = memo(({ name, ...props }) => {
  const [field, meta] = useField(name);
  const { setFieldValue, setTouched } = useFormikContext();

  return (
    <div>
      <Select
        {...props}
        name={name}
        value={field.value || null}
        onChange={(option) => {
          setFieldValue(name, option || null); // Asegura que se pase null si se borra
        }}
        onBlur={() => setTouched({ [name]: true })}
      />
      {meta.touched && meta.error && (
        <div className="error text-red-500 text-xs">{meta.error}</div>
      )}
    </div>
  );
});

FormSelect.displayName = "FormSelect";

export default FormSelect;


