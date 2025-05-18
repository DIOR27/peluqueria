import { useField, useFormikContext } from "formik";
import { memo } from "react";
import Select from "./Select";

const FormSelect = memo(({ name, ...props }) => {
  const [field, meta] = useField(name);
  const { setFieldValue, setTouched } = useFormikContext();

  return (
    <div>
      <Select
        {...field}
        {...props}
        name={name}
        value={field.value || null}
        onChange={(option) => {
            if (typeof props.onValueChange === 'function') {
              props.onValueChange(selectedOption);
            }
          setFieldValue(name, option || null); 
        }}
        onBlur={() => {
          helpers.setTouched(true);
        }}
      />
      {meta.touched && meta.error && (
        <div className="error text-red-500 text-xs">{meta.error}</div>
      )}
    </div>
  );
});

FormSelect.displayName = "FormSelect";

export default FormSelect;