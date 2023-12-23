import './InputField.css';

// eslint-disable-next-line react/prop-types
const InputField = ({ name, type = 'text', value, onChange, error = '', className = '', placeholder }) => {
  return (
    <div className={`${className} field_wrapper`}>
      <input
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
