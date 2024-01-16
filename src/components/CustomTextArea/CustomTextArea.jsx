import { Input } from 'antd';
import React from 'react'

const CustomTextArea = ({
  name,
  className = '',
  value,
  onChange,
  placeholder = 'Nhập N/A nếu không muốn viết nội dung',
  rows = 4,
  textAreaTitle = '',
}) => {
  return (
    <div className={`${className} flex-col justify-start items-center w-full`}>
      <span className='text-sm ml-1'>{textAreaTitle}</span>
      <Input.TextArea
        name={name}
        className='w-full h-9 mt-2'
        value={value}
        placeholder={placeholder}
        rows={rows}
        onChange={onChange}
      />
    </div>
  )
}

export default CustomTextArea