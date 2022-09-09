import React from 'react';

interface InputFieldProps {
  value: string;
  label: string;
  name: string;
  placeholder: string;
  type: string;
  onChange: (e: any) => void;
}

const InputField = ({ value, label, name, placeholder, type, onChange }: InputFieldProps) => (
  <div className="form-group">
    {label && <label htmlFor="input-field">{label}</label>}
    <input
      type={type}
      value={value}
      name={name}
      className="form-control"
      placeholder={placeholder}
      onChange={onChange}
    />
  </div>
);

export default InputField;
