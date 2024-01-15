import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { TbPackageExport } from 'react-icons/tb';
import { DatePicker, Divider, Input } from 'antd';
import { location, staffs } from '../../constant';
import { CustomSelect, CustomTextArea } from '../../components';
import { format } from 'date-fns';

const MakeInspectionPage = () => {
  const todayDate = format(new Date(), 'dd/MM/yyyy');
  const [data, setData] = useState({
    location: '',
    date: todayDate,
    cungdoan: '',
    tuyencap: '',
    staff_name: '',
    staff_phone: '',
    report: '',
    unknown: '', // remain unknown ???
    detail: '',
    work_unit_info: '',
    effect: '',
  });
  const [filteredStaffs, setFilteredStaffs] = useState(staffs);
  const handleSelectChange = (name) => (value) => {
    if (name === "location") {
      const filtered = staffs.filter((staff) => staff.branch === value);
      setFilteredStaffs(filtered);
      setData(prevData => ({
        ...prevData,
        [name]: value,
        staff_name: '',
        staff_phone: '',
      }));
      return;
    }
    if (name === "staff_name") {
      const filteredStaff = staffs.filter((staff) => staff.id === value);
      if (filteredStaff.length > 0) {
        setData(prevData => ({
          ...prevData,
          [name]: value,
          staff_phone: filteredStaff[0].phone,
        }));
      } else {
        setData(prevData => ({
          ...prevData,
          [name]: value,
        }));
      }
    }
    setData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleChangeDate = (_, dateString) => {
    setData({ ...data, date: dateString });
  };
  const handleChangeData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleClearData = () => {
    setData({
      ...data,
      location: '',
      date: todayDate,
      cungdoan: '',
      tuyencap: '',
      staff_name: '',
      staff_phone: '',
      report: '',
      unknown: '',
      detail: '',
      work_unit_info: '',
      effect: '',
    });
  };
  const handleTestSubmit = () => {
    console.log(data);
  }
  return (
    <div className="md:flex md:justify-center mt-24 bg-[var(--background-color)] overflow-hidden">
      <div className="w-full md:w-3/5 md:border p-6 rounded-md bg-white md:shadow-xl">
        <button className="mb-10 my-2 border px-4 py-2 rounded-md">
          <Link to="/media/view">
            <span className="flex items-center font-semibold hover:text-[var(--main-theme-color)]">
              <TbPackageExport className="mt-1" />
              View
            </span>
          </Link>
        </button>
        <div className="flex justify-center">
          <img
            className="h-[80px] md:h-[100px]"
            src="https://brademar.com/wp-content/uploads/2022/09/VNPT-Logo-PNG-1.png"
            alt="VNPT"
          />
        </div>
        <form className="mt-4">
          <h4 className="text-center font-semibold text-xl">KẾ HOẠCH TUẦN TRA</h4>
          <div className="mt-4">
            <div className="mt-8 mb-4 md:flex md:items-center md:justify-between md:gap-4">
              <CustomSelect
                className='md:w-[25%] mt-4'
                name="location"
                defaultValue={location[0].value}
                onChange={handleSelectChange('location')}
                options={location}
                value={data.location}
                selectTitle='Trạm'
              />
              <div className="flex-col justify-start items-center md:w-[33%] ml-2 mt-4">
                <span className='text-sm ml-1'>Thời gian</span>
                <DatePicker
                  placeholder='Ngày'
                  onChange={handleChangeDate}
                  name="date"
                  className=" w-full px-[9px] py-[7px] mt-2 border rounded-md font-semibold"
                />
              </div>
              <CustomSelect
                className='md:w-[21%] mt-4'
                name="cungdoan"
                onChange={handleSelectChange('cungdoan')}
                value={data.cungdoan}
                selectTitle='Cung đoạn'
              />
              <CustomSelect
                className='md:w-[21%] mt-4'
                name="tuyencap"
                onChange={handleSelectChange('tuyencap')}
                value={data.tuyencap}
                selectTitle='Tuyến cáp'
              />
            </div>
            <Divider orientation="left" >Thông tin tuần tra</Divider>
            <div className="flex-col my-4">
              <div className="flex justify-start items-center gap-8 my-4">
                <CustomSelect
                  className='w-[50%] md:w-[30%]'
                  name="staff_name"
                  onChange={handleSelectChange('staff_name')}
                  options={filteredStaffs.map((staff) => ({
                    value: staff.id,
                    label: staff.name,
                  }))}
                  value={data.staff_name}
                  selectTitle='Tên nhân viên'
                />
                <div className="flex-col justify-start items-center w-[50%] md:w-[30%] ml-2">
                  <span className='text-sm ml-1'>Số điện thoại</span>
                  <Input
                    name="staff_phone"
                    className='w-full h-9 mt-2'
                    readOnly={true}
                    value={data.staff_phone}
                  />
                </div>
              </div>
              <CustomTextArea
                name="report"
                onChange={handleChangeData}
                value={data.report}
                textAreaTitle='Kết quả công việc'
              />
            </div>
            <Divider orientation="left" >Kế hoạch công việc ngày mai</Divider>
            <div className="flex-col my-4">
              <div className="flex justify-start items-center gap-8 my-2">
                <CustomSelect
                  className='w-full md:w-[30%]'
                  name="unknown"
                  onChange={handleSelectChange('unknown')}
                  value={data.unknown}
                  selectTitle='Unknown'
                />
              </div>
              <CustomTextArea
                className='mt-4'
                name="detail"
                onChange={handleChangeData}
                value={data.detail}
                textAreaTitle='Chi tiết công việc'
              />
              <CustomTextArea
                className='mt-4'
                name="work_unit_info"
                onChange={handleChangeData}
                value={data.work_unit_info}
                textAreaTitle='Thông tin đơn vị thi công'
              />
              <CustomTextArea
                className='mt-4'
                name="effect"
                onChange={handleChangeData}
                value={data.effect}
                textAreaTitle='Ảnh hưởng'
              />
            </div>
          </div>
          <div className="flex justify-end gap-6 items-center mt-12">
            <button
              className="bg-orange-400 font-semibold text-white px-14 py-2 rounded-md hover:bg-orange-600"
              onClick={handleClearData}
            >
              Clear
            </button>
            <div
              type="submit"
              className="bg-[var(--main-theme-color)] font-semibold text-white px-14 py-2 rounded-md hover:bg-[var(--main-theme-color-hover)]"
              onClick={handleTestSubmit}
            >
              Submit
            </div>
          </div>
        </form>
      </div >
    </div >
  )
}

export default MakeInspectionPage