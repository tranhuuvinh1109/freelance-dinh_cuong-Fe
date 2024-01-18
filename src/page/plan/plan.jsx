import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TbPackageExport } from 'react-icons/tb';
import { DatePicker, Divider, Input } from 'antd';
import location from '../../constant/location.json';
import staffs from '../../constant/staffs.json';
import jobs from '../../constant/planTomorrow.json';
import { CustomSelect, CustomTextArea } from '../../components';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
import planAPI from '../../api/planAPI';
import Loading from '../loading/Loading';
const todayDate = format(new Date(), 'dd/MM/yyyy');
const initialState = {
  location: '',
  date: todayDate,
  address: 'aaa',
  cable_line: '111',
  name_staff: '',
  phone_staff: '',
  result: '',
  plan: '',
  description: '',
  construction_unit_information: '',
  affect: '',
};
const MakePlanPage = () => {
  const [data, setData] = useState(initialState);
  const [filteredStaffs, setFilteredStaffs] = useState(staffs);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectChange = (name) => (value) => {
    if (name === 'location') {
      const filtered = staffs.filter((staff) => staff.branch === value);
      setFilteredStaffs(filtered);
      setData((prevData) => ({
        ...prevData,
        [name]: value,
        name_staff: '',
        phone_staff: '',
      }));
      return;
    }
    if (name === 'name_staff') {
      const filteredStaff = staffs.filter((staff) => staff.id === value);
      if (filteredStaff.length > 0) {
        setData((prevData) => ({
          ...prevData,
          [name]: value,
          phone_staff: filteredStaff[0].phone,
        }));
      } else {
        setData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    }
    setData((prevData) => ({
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
    setData(initialState);
  };
  const handleTestSubmit = async () => {
    console.log(data);
    try {
      setIsLoading(true);
      const res = await planAPI.createPlan(data);
      if (res.status === 201) {
        toast.success('Tạo kế hoạch thành công !');
        setData(initialState);
      }
    } catch (e) {
      console.log(e);
      toast.error('Tạo kế hoạch thất bại, Vui lòng liên hệ với quản lý sau!');
    }
    setIsLoading(false);
  };
  return (
    <>
      {isLoading && <Loading />}
      <div className="md:flex md:justify-center mt-24 overflow-hidden">
        <div className="w-full md:w-3/5 md:border p-6 rounded-md bg-white md:shadow-xl">
          <button className="mb-10 my-2 border px-4 py-2 rounded-md">
            <Link to="/plan/view">
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
                  className="md:w-[25%] mt-4"
                  name="location"
                  defaultValue={location[0].value}
                  onChange={handleSelectChange('location')}
                  options={location}
                  value={data.location}
                  selectTitle="Trạm"
                />
                <div className="flex-col justify-start items-center md:w-[33%] mt-4">
                  <span className="text-sm ml-1">Thời gian</span>
                  <DatePicker
                    placeholder="Ngày"
                    onChange={handleChangeDate}
                    name="date"
                    className=" w-full px-[9px] py-[7px] mt-2 border rounded-md font-semibold"
                  />
                </div>
                <CustomSelect
                  className="md:w-[21%] mt-4"
                  name="address"
                  onChange={handleSelectChange('address')}
                  value={data.address}
                  selectTitle="Cung đoạn"
                />
                <CustomSelect
                  className="md:w-[21%] mt-4"
                  name="cable_line"
                  onChange={handleSelectChange('cable_line')}
                  value={data.cable_line}
                  selectTitle="Tuyến cáp"
                />
              </div>
              <Divider orientation="left">Thông tin tuần tra</Divider>
              <div className="flex-col my-4">
                <div className="flex justify-start items-center gap-8 my-4">
                  <CustomSelect
                    className="w-[50%] md:w-[30%]"
                    name="name_staff"
                    onChange={handleSelectChange('name_staff')}
                    options={filteredStaffs.map((staff) => ({
                      value: staff.id,
                      label: staff.name,
                    }))}
                    value={data.name_staff}
                    selectTitle="Tên nhân viên"
                  />
                  <div className="flex-col justify-start items-center w-[50%] md:w-[30%] ml-2">
                    <span className="text-sm ml-1">Số điện thoại</span>
                    <Input name="phone_staff" className="w-full h-9 mt-2" readOnly={true} value={data.phone_staff} />
                  </div>
                </div>
                <CustomTextArea
                  name="result"
                  onChange={handleChangeData}
                  value={data.result}
                  textAreaTitle="Kết quả công việc"
                />
              </div>
              <Divider orientation="left">Kế hoạch công việc ngày mai</Divider>
              <div className="flex-col my-4">
                <div className="flex justify-start items-center gap-8 my-2">
                  <CustomSelect
                    className="w-full md:w-[30%]"
                    name="plan"
                    options={jobs.map((job) => ({
                      value: job.name,
                      label: job.name,
                    }))}
                    onChange={handleSelectChange('plan')}
                    value={data.plan}
                    selectTitle="Kế hoạch công việc ngày mai"
                  />
                </div>
                <CustomTextArea
                  className="mt-4"
                  name="description"
                  onChange={handleChangeData}
                  value={data.description}
                  textAreaTitle="Chi tiết công việc"
                />
                <CustomTextArea
                  className="mt-4"
                  name="construction_unit_information"
                  onChange={handleChangeData}
                  value={data.construction_unit_information}
                  textAreaTitle="Thông tin đơn vị thi công"
                />
                <CustomTextArea
                  className="mt-4"
                  name="affect"
                  onChange={handleChangeData}
                  value={data.affect}
                  textAreaTitle="Ảnh hưởng"
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
        </div>
      </div>
    </>
  );
};

export default MakePlanPage;
