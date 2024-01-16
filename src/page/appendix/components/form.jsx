import { DatePicker, Divider, Input, Modal } from 'antd'
import React from 'react'
import { CustomSelect } from '../../../components'
import moment from 'moment'

const Form = ({ title, visible, onOk, onCancel, data, setData }) => {
  return (
    <Modal
      title={<h2 className='text-xl font-semibold'>{title}</h2>}
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      width={800}
      style={{ top: 60 }}
    >
      <Divider orientation="left" >Thông tin vị trí</Divider>
      <div className="md:flex gap-2 w-full">
        <CustomSelect
          className='md:w-[33%]'
          selectTitle='Đài'
          value={data.dai}
          onChange={e => setData(prev => ({ ...prev, dai: e.target.value }))}
        />
        <CustomSelect
          className='md:w-[33%]'
          selectTitle='Cung đoạn'
          value={data.cungdoan}
          onChange={e => setData(prev => ({ ...prev, cungdoan: e.target.value }))}
        />
        <CustomSelect
          className='md:w-[33%]'
          selectTitle='Hệ thống'
          value={data.hethong}
          onChange={e => setData(prev => ({ ...prev, hethong: e.target.value }))}
        />
      </div>
      <Divider orientation="left" >Thông tin cáp</Divider>
      <div className="flex gap-2">
        <div className='flex gap-2 items-center w-1/2'>
          <CustomSelect
            selectTitle='Cáp QH'
            className='w-full'
            placeholder=''
            value={data.capqh}
            onChange={e => setData(prev => ({ ...prev, capqh: e.target.value }))}
          />
        </div>
        <div className='flex gap-2 items-center w-1/2'>
          <CustomSelect
            selectTitle='Cáp ƯC'
            className='w-full'
            placeholder=''
            value={data.capuc}
            onChange={e => setData(prev => ({ ...prev, capuc: e.target.value }))}
          />
        </div>
      </div>
      <div className="flex gap-2 w-full mr-4 mt-6">
        <div className="flex flex-col w-1/2 gap-2">
          <span className='ml-1'>Thời gian chuyển đi</span>
          <DatePicker
            className=" w-full px-[9px] py-[7px] border rounded-md"
            showTime={{ format: 'HH:mm' }}
            format="HH:mm (DD/MM/YYYY)"
            placeholder="Thời gian chuyển đi"
            value={
              data && data.tgchuyendi
                ? moment(data.tgchuyendi, 'HH:mm (DD/MM/YYYY)')
                : null
            }
            onChange={date => setData(prev => ({ ...prev, tgchuyendi: date ? date.format('HH:mm (DD/MM/YYYY)') : null }))}
          />
        </div>
        <div className="flex flex-col w-1/2 gap-2">
          <span className='ml-1'>Thời gian chuyển trả</span>
          <DatePicker
            className=" w-full px-[9px] py-[7px] border rounded-md"
            showTime={{ format: 'HH:mm' }}
            format="HH:mm (DD/MM/YYYY)"
            placeholder="Thời gian chuyển trả"
            value={
              data && data.tgchuyentra
                ? moment(data.tgchuyentra, 'HH:mm (DD/MM/YYYY)')
                : null
            }
            onChange={date => setData(prev => ({ ...prev, tgchuyentra: date ? date.format('HH:mm (DD/MM/YYYY)') : null }))}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <span className='ml-1'>Lý do chuyển</span>
        <Input.TextArea
          className='w-full'
          rows={3}
          value={data.lydochuyen}
          onChange={e => setData(prev => ({ ...prev, lydochuyen: e.target.value }))}
        />
      </div>
      <div className="flex flex-col gap-2 my-4">
        <span className='ml-1'>Ghi chú</span>
        <Input.TextArea
          className='w-full'
          rows={3}
          value={data.ghichu}
          onChange={e => setData(prev => ({ ...prev, ghichu: e.target.value }))}
        />
      </div>
    </Modal>
  )
}

export default Form