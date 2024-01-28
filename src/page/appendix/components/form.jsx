/* eslint-disable react/prop-types */
import { DatePicker, Divider, Input, Modal } from 'antd';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import appendixAPI from '../../../api/apeendixAPI';
import { toast } from 'react-hot-toast';
import { createPortal } from 'react-dom';
import { LoadingPage } from '../..';
import dayjs from 'dayjs';

const Form = ({ visible, title, onCancel, dataEdit, refetch }) => {
  const [data, setData] = useState(dataEdit);
  console.log(data.time_back, data.time_move);
  const { mutate, isLoading } = useMutation({
    mutationFn: () => appendixAPI.updateAppendix(data?.id, data),
    onSuccess: (e) => {
      toast.success(e.data.message);
      onCancel();
      refetch();
    },
    onError: (e) => {
      console.error(e);
      onCancel();
    },
  });

  const onChange = (e, name) => {
    setData({
      ...data,
      [name]: e,
    });
  };

  const onOk = async () => {
    await mutate();
  };
  return (
    <>
      <Modal
        title={<h2 className="text-xl font-semibold">{title}</h2>}
        open={visible}
        onOk={onOk}
        onCancel={onCancel}
        width={800}
        style={{ top: 60 }}
      >
        <div className="">
          <Divider orientation="left">Thông tin vị trí</Divider>
          <div className="md:flex md:justify-between w-full">
            <div className="md:w-[40%]">
              <span className="text-sm ml-1">Hệ thống</span>
              <Input
                className="mt-2 p-1"
                value={data.address}
                name="address"
                onChange={(e) => onChange(e, 'address')}
              />
            </div>
            <div className="md:w-[40%]">
              <span className="text-sm ml-1">Hệ thống</span>
              <Input
                className="mt-2 p-1"
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
                className="w-full px-[9px] py-[7px] border rounded-md"
                showTime={{ format: 'HH:mm' }}
                value={data?.time_move ? dayjs(data?.time_move, 'HH:mm (DD/MM/YYYY)') : null}
                defaultValue={dayjs()}
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
                className="w-full px-[9px] py-[7px] border rounded-md"
                showTime={{ format: 'HH:mm' }}
                value={data?.time_move ? dayjs(data?.time_back, 'HH:mm (DD/MM/YYYY)') : null}
                defaultValue={dayjs()}
                format="HH:mm (DD/MM/YYYY)"
                placeholder="Thời gian chuyển đi"
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
        </div>
      </Modal>
      {isLoading && createPortal(<LoadingPage />, document.body)}
    </>
  );
};

export default Form;
