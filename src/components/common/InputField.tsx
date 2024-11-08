import React from 'react';
import styles from '../../Styles.module.css';

const InputField = ({
  label,
  value,
  placeholder = "",
  helperText = "",
  min,
  max,
  type = "text",
  required = true,
  onChange,
}: {
  label: string;
  value: string;
  placeholder?: string;
  helperText?: string;
  min?: number;
  max?: number;
  type?: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className={styles.inputField}>
    <label>{label}</label>
    <input type={type} min={min} max={max} placeholder={placeholder} value={value} required={required} onChange={onChange} />
    <small>{helperText}</small>
  </div>
);

export default InputField;