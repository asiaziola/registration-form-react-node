import React from 'react';
import './InputField.css';
interface InputFieldProps {
  onChange: (e: any) => void;
  type: string;
  name: string;
  label: string;
  disabled: boolean;
  placeholder?: string;
  errors: any;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, name, placeholder, type, onChange, errors, disabled }: InputFieldProps, ref) => (
    <>
      <div className="input-group">
        {label && <label>{label}</label>}
        <input
          ref={ref}
          type={type}
          name={name}
          className="input-field"
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
      <div className="errors-container">{errors}</div>
    </>
  )
);

export default InputField;
