import { Select } from 'antd';
// eslint-disable-next-line react/prop-types
const CustomSelect = ({ name, className = '', value, onChange, selectTitle = '', defaultValue = '', options = [] }) => {
  return (
    <div className={`${className} flex-col justify-start items-center`}>
      <span className="text-sm ml-1">{selectTitle}</span>

      <Select
        name={name}
        className="w-full h-9 mt-2"
        value={value}
        defaultValue={defaultValue}
        options={options}
        onChange={onChange}
      />
    </div>
  );
};

export default CustomSelect;
