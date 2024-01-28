import { DatePicker, Divider, Input } from 'antd';
import { initialStateAppendix } from '../../constant/init';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import appendixAPI from '../../api/apeendixAPI';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { IoChevronBackOutline } from 'react-icons/io5';
import Loading from '../loading/Loading';

const CreateAppendix = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(initialStateAppendix);
  const { mutate, isLoading } = useMutation({
    mutationFn: () => appendixAPI.createAppendix(data),
    onSuccess: (e) => {
      toast.success(e.data.message);
      setData(initialStateAppendix);
      navigate('/appendix');
    },
  });

  const onChange = (e, name) => {
    setData({
      ...data,
      [name]: e,
    });
  };
  const onBack = () => navigate(-1);
  const onSubmit = async () => {
    if (!data.address) {
      toast.error('Vui lòng chọn cung đoạn');
      return;
    }
    await mutate();
  };
  return (
    <>
      <div className="mt-24">
        <div className="md:flex md:justify-center mt-24 overflow-hidden">
          <div className="w-full md:w-3/5 md:border p-6 rounded-md bg-white md:shadow-xl">
            <button
              onClick={onBack}
              className="flex items-center gap-1 bg-slate-300 px-6 py-2 rounded-md hover:bg-slate-500"
            >
              <IoChevronBackOutline />
              <span className="font-semibold">Back</span>
            </button>
            <Divider orientation="left">Thông tin vị trí</Divider>
            <div className="md:flex md:justify-between w-full">
              <div className="md:w-[40%]">
                <span className="text-sm ml-1">Cung đoạn</span>
                <Input
                  className="mt-2 px-3 py-1"
                  value={data.address}
                  name="address"
                  onChange={(e) => onChange(e.target.value, 'address')}
                />
              </div>
              <div className="md:w-[40%]">
                <span className="text-sm ml-1">Hệ thống</span>
                <Input
                  className="mt-2 px-3 py-1"
                  value={data.system}
                  name="system"
                  onChange={(e) => onChange(e.target.value, 'system')}
                />
              </div>
            </div>
            <Divider orientation="left">Thông tin cáp</Divider>
            <div className="">
              <div className="">
                <span className="text-sm ml-1">Cáp QH</span>
                <Input.TextArea
                  className="w-full"
                  placeholder=""
                  name="cable_qh"
                  value={data.cable_qh}
                  onChange={(e) => onChange(e.target.value, 'cable_qh')}
                />
              </div>
              <div className="mt-2">
                <span className="text-sm ml-1">Cáp UC</span>
                <Input.TextArea
                  className="w-full"
                  placeholder=""
                  value={data.cable_uc}
                  name="cable_uc"
                  onChange={(e) => onChange(e.target.value, 'cable_uc')}
                />
              </div>
            </div>
            <div className="flex gap-2 w-full mr-4 mt-6">
              <div className="flex flex-col w-1/2 gap-2">
                <span className="text-sm ml-1">Thời gian chuyển đi</span>
                <DatePicker
                  className=" w-full px-[9px] py-[7px] border rounded-md"
                  showTime={{ format: 'HH:mm' }}
                  format="HH:mm (DD/MM/YYYY)"
                  placeholder="Thời gian chuyển đi"
                  onChange={(date) =>
                    setData((prev) => ({ ...prev, time_move: date ? date.format('HH:mm (DD/MM/YYYY)') : null }))
                  }
                />
              </div>
              <div className="flex flex-col w-1/2 gap-2">
                <span className="text-sm ml-1">Thời gian chuyển trả</span>
                <DatePicker
                  className=" w-full px-[9px] py-[7px] border rounded-md"
                  showTime={{ format: 'HH:mm' }}
                  format="HH:mm (DD/MM/YYYY)"
                  placeholder="Thời gian chuyển trả"
                  onChange={(date) =>
                    setData((prev) => ({ ...prev, time_back: date ? date.format('HH:mm (DD/MM/YYYY)') : null }))
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <span className="text-sm ml-1">Lý do chuyển</span>
              <Input.TextArea
                className="w-full"
                rows={3}
                value={data.reason}
                name="reason"
                onChange={(e) => onChange(e.target.value, 'reason')}
              />
            </div>
            <div className="flex flex-col gap-2 my-4">
              <span className="text-sm ml-1">Ghi chú</span>
              <Input.TextArea
                className="w-full"
                rows={3}
                value={data.note}
                name="note"
                onChange={(e) => onChange(e.target.value, 'note')}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="mr-4 bg-orange-400 font-semibold text-white px-14 py-2 rounded-md hover:bg-orange-600"
                onClick={() => setData(initialStateAppendix)}
              >
                Clear
              </button>
              <button
                className="bg-[var(--main-theme-color)] font-semibold text-white px-14 py-2 rounded-md hover:bg-[var(--main-theme-color-hover)]"
                onClick={onSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      {isLoading && <Loading />}
    </>
  );
};

export default CreateAppendix;
