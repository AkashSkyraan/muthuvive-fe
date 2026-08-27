const Input = ({
  type = "text",
  name,
  id,
  value,
  defaultValue,
  placeholder,
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  readOnly = false,
  required = false,
  autoComplete,
  inputMode,
  className = "",
  ...props
}) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      autoComplete={autoComplete}
      inputMode={inputMode}
      className={className}
      {...props}
    />
  );
};

export default Input;
