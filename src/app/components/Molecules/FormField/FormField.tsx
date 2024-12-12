import React from "react";
import styles from "./FormField.module.scss";
import Input from "../../Atoms/Input/Input";
interface FormFieldProps {
  label?: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}
const FormField = ({ label, name, type, placeholder, value, onChange, error }: FormFieldProps) => {
  return (
    <div className={styles.formField}>
      <Input label={label} name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default FormField;
