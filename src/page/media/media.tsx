import React, { useState } from 'react';
import mediaAPI from '../../api/mediaAPI';
import { InputField } from '../../components';
import { IoDownloadOutline } from 'react-icons/io5';
import { createPortal } from 'react-dom';
import { LoadingPage } from '..';
import { location } from '../../constant';
import { Divider, DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { TbPackageExport } from 'react-icons/tb';
import * as yup from 'yup';

const MediaPage = () => {
  const [data, setData] = useState({
    location: 'QNN/LKN',
    name_ttcq: '',
    phone_staff: '',
    km: '',
    name: '',
    phone: '',
    date: '',
    note: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = yup.object().shape({
    location: yup.string().required('Vui lòng chọn địa điểm.'),
    name_ttcq: yup.string().required('Vui lòng nhập tên TTCQ.'),
    phone_staff: yup.string().required('Vui lòng nhập số điện thoại.'),
    km: yup.string().required('Vui lòng nhập km đường bộ.'),
    name: yup.string().required('Vui lòng nhập tên.'),
    phone: yup.string().required('Vui lòng nhập số điện thoại.'),
    date: yup.string().required('Vui lòng chọn ngày.'),
    note: yup.string(),
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await validationSchema.validate(data, { abortEarly: false });

      const res = await mediaAPI.createMedia(data);

      if (res.status === 201) {
        setData({
          location: 'QNN/LKN',
          name_ttcq: '',
          phone_staff: '',
          km: '',
          name: '',
          phone: '',
          date: '',
          note: '',
        });
        toast.success('Tạo bản ghi mới thành công !');
      }
    } catch (err) {
      const validationErrors = {};
      if (err instanceof yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors['' + error.path] = error.message;
        });
      }
      const messageKey = Object.keys(validationErrors)[0];
      toast.error(validationErrors[messageKey]);
    }
    setIsLoading(false);
  };

  const handleChangeDate = (_, dateString) => {
    setData({ ...data, date: dateString });
  };

  return (
    <>
      {isLoading && createPortal(<LoadingPage />, document.body)}
      <div className="md:flex md:justify-center mt-24 overflow-hidden">
        <div className="w-full md:w-3/5 md:border p-6 rounded-md md:shadow-xl">
          <button className="mb-10 my-2 border px-4 py-2 rounded-md">
            <Link to="/media/view">
              <span className="flex items-center font-semibold hover:text-orange-400">
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
          <form onSubmit={handleSubmmit} className="mt-4">
            <h4 className="text-center font-semibold">THÔNG TIN TRUYỀN THÔNG TẠI CÁC CUNG ĐOẠN TUẦN TRA CÁP QUANG</h4>
            <div className="mt-4">
              <div className="flex flex-wrap justify-around">
                <div className="md:w-[30%] my-2 w-full flex items-center ">
                  <select
                    name="location"
                    onChange={handleChange}
                    defaultValue={location[0].value}
                    className=" w-full px-[9px] py-[7px] border rounded-md font-semibold"
                  >
                    {location.map((option, index) => {
                      return (
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <InputField
                  placeholder={'Tên TTCQ'}
                  className="md:w-[30%] my-2 w-full"
                  name="name_ttcq"
                  value={data.name_ttcq}
                  onChange={handleChange}
                />
                <InputField
                  placeholder={'Số điện thoại'}
                  className="md:w-[30%] my-2 w-full"
                  name="phone_staff"
                  value={data.phone_staff}
                  onChange={handleChange}
                />
              </div>
              <Divider orientation="left">Thông tin nhà dân/Cơ quan</Divider>
              <div className="flex flex-wrap justify-around">
                <InputField
                  placeholder={'Km đường bộ'}
                  className="md:w-[30%] my-2 w-full"
                  name="km"
                  value={data.km}
                  onChange={handleChange}
                />
                <InputField
                  placeholder={'Tên'}
                  className="md:w-[30%] my-2 w-full"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                />
                <InputField
                  placeholder={'Số điện thoại'}
                  className="md:w-[30%] my-2 w-full"
                  name="phone"
                  value={data.phone}
                  onChange={handleChange}
                />
                <div className="md:w-[30%] my-2 w-full flex items-center">
                  <DatePicker
                    placeholder="Ngày"
                    onChange={handleChangeDate}
                    name="date"
                    className="w-full border py-[6px] font-semibold"
                  />
                </div>
                <InputField
                  placeholder={'Ghi chú'}
                  className="md:w-[30%] my-2 w-full"
                  name="note"
                  value={data.note}
                  onChange={handleChange}
                />
                <div className="md:w-[30%] my-2 w-full"></div>
              </div>
            </div>
            <div className="flex justify-center items-center mt-4">
              <button
                type="submit"
                className="bg-orange-400 font-semibold text-white px-14 py-2 rounded-md hover:bg-orange-600"
              >
                Submit
              </button>
            </div>
          </form>

          <div className="flex justify-end mt-4">
            <a
              href="https://mange-zdqk.onrender.com/api/download/"
              className="flex items-center bg-green-400 md:w-2/5 px-3 py-2 rounded-md justify-center font-semibold text-white hover:bg-green-600"
            >
              <IoDownloadOutline fontSize={26} fontWeight={700} />
              Download Excel File
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default MediaPage;
