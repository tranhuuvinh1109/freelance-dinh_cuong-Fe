/* eslint-disable react/prop-types */
import './InputField.css';

const InputField = ({
  name,
  type = 'text',
  value,
  onChange,
  error = '',
  className = '',
  placeholder,
  readOnly = false,
}) => {
  return (
    <div className={`${className} field_wrapper`}>
      <input
        readOnly={readOnly}
        name={name}
        onChange={onChange}
        value={value}
        type={type}
        // eslint-disable-next-line react/prop-types
        placeholder={placeholder}
        className={`border rounded-md input_field ${error ? 'field_error' : ''}`}
      />
      {error && <span className="message_error">{error}</span>}
    </div>
  );
};

export default InputField;
