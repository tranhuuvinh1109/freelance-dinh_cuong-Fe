import { DatePicker, Divider, Input } from 'antd';
import { CustomSelect } from '../../components';
import { initialStateAppendix } from '../../constant/init';
import { useState } from 'react';
import dayjs from 'dayjs';
import appendixData from '../../constant/appendixAddress.json';

const CreateAppendix = () => {
  const [data, setData] = useState(initialStateAppendix);
  const addresss = appendixData.map((item) => {
    return {
      label: item.location,
      value: item.location,
    };
  });

  const onChange = (e, name) => {
    if (name === 'address') {
      setData((prev) => ({ ...prev, [name]: e }));
    }
  };
  return (
    <div className="mt-24">
      <div className="md:flex md:justify-center mt-24 overflow-hidden">
        <div className="w-full md:w-3/5 md:border p-6 rounded-md bg-white md:shadow-xl">
          <Divider orientation="left">Thông tin vị trí</Divider>
          <div className="md:flex gap-2 w-full">
            <CustomSelect
              className="md:w-[33%]"
              selectTitle="Đài"
              value={data.address}
              options={addresss}
              onChange={(e) => onChange(e, 'address')}
            />
            <CustomSelect
              className="md:w-[33%]"
              selectTitle="Cung đoạn"
              value={data.cungdoan}
              onChange={(e) => setData((prev) => ({ ...prev, cungdoan: e.target.value }))}
            />
            <CustomSelect
              className="md:w-[33%]"
              selectTitle="Hệ thống"
              value={data.hethong}
              onChange={(e) => setData((prev) => ({ ...prev, hethong: e.target.value }))}
            />
          </div>
          <Divider orientation="left">Thông tin cáp</Divider>
          <div className="flex gap-2">
            <div className="flex gap-2 items-center w-1/2">
              <CustomSelect
                selectTitle="Cáp QH"
                className="w-full"
                placeholder=""
                value={data.capqh}
                onChange={(e) => setData((prev) => ({ ...prev, capqh: e.target.value }))}
              />
            </div>
            <div className="flex gap-2 items-center w-1/2">
              <CustomSelect
                selectTitle="Cáp ƯC"
                className="w-full"
                placeholder=""
                value={data.capuc}
                onChange={(e) => setData((prev) => ({ ...prev, capuc: e.target.value }))}
              />
            </div>
          </div>
          <div className="flex gap-2 w-full mr-4 mt-6">
            <div className="flex flex-col w-1/2 gap-2">
              <span className="ml-1">Thời gian chuyển đi</span>
              <DatePicker
                className=" w-full px-[9px] py-[7px] border rounded-md"
                showTime={{ format: 'HH:mm' }}
                format="HH:mm (DD/MM/YYYY)"
                placeholder="Thời gian chuyển đi"
                value={dayjs(data.time_move)}
                onChange={(date) =>
                  setData((prev) => ({ ...prev, tgchuyendi: date ? date.format('HH:mm (DD/MM/YYYY)') : null }))
                }
              />
            </div>
            <div className="flex flex-col w-1/2 gap-2">
              <span className="ml-1">Thời gian chuyển trả</span>
              <DatePicker
                className=" w-full px-[9px] py-[7px] border rounded-md"
                showTime={{ format: 'HH:mm' }}
                format="HH:mm (DD/MM/YYYY)"
                placeholder="Thời gian chuyển trả"
                value={dayjs(data.time_back)}
                onChange={(date) =>
                  setData((prev) => ({ ...prev, tgchuyentra: date ? date.format('HH:mm (DD/MM/YYYY)') : null }))
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <span className="ml-1">Lý do chuyển</span>
            <Input.TextArea
              className="w-full"
              rows={3}
              value={data.lydochuyen}
              onChange={(e) => setData((prev) => ({ ...prev, lydochuyen: e.target.value }))}
            />
          </div>
          <div className="flex flex-col gap-2 my-4">
            <span className="ml-1">Ghi chú</span>
            <Input.TextArea
              className="w-full"
              rows={3}
              value={data.ghichu}
              onChange={(e) => setData((prev) => ({ ...prev, ghichu: e.target.value }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAppendix;
