import { Modal, Select, Input } from 'antd';
import { location, state } from '../../constant';
import { useState } from 'react';
import { format, subDays, parse } from 'date-fns';
const { TextArea } = Input;
const ReportDate = () => {
  const todayDate = format(new Date(), 'dd/MM/yyyy');
  const [modalOpen, setModalOpen] = useState(false);
  const [dataReport, setDataReport] = useState({
    location: '',
    dateReport: todayDate,
    device: '',
    cable: '',
    power: '',
    report: '',
    otherJob: '',
    exist: '',
    propose: '',
    creator: '',
    date: '',
  });

  const handleChangeData = (e) => {
    setDataReport({
      ...dataReport,
      [e.target.name]: e.target.value,
    });
  };
  const handleChange = (value) => {
    setDataReport({
      ...dataReport,
      location: value,
    });
  };
  return (
    <div className="mt-24 w-[1000px] mx-auto">
      <Modal
        title="Tạo báo cáo hàng ngày"
        centered
        open={modalOpen}
        onOk={() => {
          setModalOpen(false);
        }}
        okButtonProps={{
          disabled: dataReport.dateReport && dataReport.location ? false : true,
        }}
        onCancel={() => setModalOpen(false)}
      >
        <div className="">
          <h5 className="italic font-semibold text-xl">
            Chọn trạm <span className="text-red-500">*</span>:
          </h5>
          <Select defaultValue={location[0].value} className="w-full my-4" onChange={handleChange} options={location} />
          <div className="flex items-center">
            <h5 className="italic font-semibold text-xl">
              Ngày <span className="text-red-500">*</span>:
            </h5>
            <input
              name="dateReport"
              onChange={handleChangeData}
              className="ml-2 flex-1 border rounded-md py-1 px-2"
              placeholder={'Ngày báo cáo'}
              value={dataReport.dateReport}
            />
          </div>
          {!dataReport.dateReport && (
            <div className="mt-2">
              <p className="text-center text-red-500">Vui lòng điền ngày báo cáo</p>
            </div>
          )}
          {!dataReport.location && (
            <div className="mt-2">
              <p className="text-center text-red-500">Vui lòng chọn lại trạm</p>
            </div>
          )}
        </div>
      </Modal>
      <div className="flex justify-center">
        <button
          onClick={() => setModalOpen(true)}
          className="font-semibold text-white px-6 py-2 rounded-md bg-green-400 hover:bg-green-600 "
        >
          Tạo báo cáo ngày
        </button>
      </div>
      {!modalOpen && dataReport.location !== '' && (
        <form>
          <div className="border px-6 py-4 mt-6">
            <h4 className="text-center font-semibold text-xl">
              Báo cáo ADG Trạm VT {dataReport.location} ngày {dataReport.dateReport}
            </h4>
            <h6 className="mt-6">
              Kính gửi: <span className="font-semibold">Ban lãnh đạo Đài VT QNN</span>
            </h6>
            <h6 className="mt-2">
              Trạm VT {dataReport.location} báo cáo tình hình thông tin liên lạc từ 07h00 ngày{' '}
              <span className="font-semibold">
                {format(subDays(parse(dataReport.dateReport, 'dd/MM/yyyy', new Date()), 1), 'dd/MM/yyyy')}
              </span>{' '}
              đến 07h00 ngày <span className="font-semibold">{dataReport.dateReport}</span>.
            </h6>
            <h4 className="font-semibold mt-6">I. TÌNH HÌNH THÔNG TIN:</h4>
            <div className="flex items-center mt-2">
              <h6>1. Thiết bị viễn thông:</h6>
              <Select defaultValue={state[0].value} className="ml-2" onChange={handleChange} options={state} />
            </div>
            <div className="flex items-center mt-2">
              <h6>2. Cáp quang:</h6>
              <Select defaultValue={state[0].value} className="ml-2" onChange={handleChange} options={state} />
            </div>
            <div className="flex items-center mt-2">
              <h6>3. Nguồn điện, điều hoà</h6>
              <Select defaultValue={state[0].value} className="ml-2" onChange={handleChange} options={state} />
            </div>
            <p className="mt-4 text-sm italic">
              <span className="text-red-600">Chú thích:</span> <span className="font-semibold">BT:</span> Bình thường,{' '}
              <span className="font-semibold">SC:</span> Sự cố
            </p>
            <h4 className="font-semibold mt-6">II. TÌNH HÌNH CÔNG VIỆC:</h4>
            <div className="mt-2">
              <h6>1. Thực hiện theo công văn:</h6>
              <TextArea rows={4} placeholder="Thực hiện theo công văn:" />
            </div>
            <div className="mt-2">
              <h6>2. Công việc khác:</h6>
              <TextArea rows={4} placeholder="Công việc khác:" />
            </div>
            <h4 className="font-semibold mt-6">III. Tồn tại:</h4>
            <TextArea rows={4} className="mt-2" placeholder="Tồn tại:" />
            <div className="mt-6">
              <h6>ĐỀ XUẤT KIẾN NGHỊ</h6>
              <TextArea rows={4} className="mt-2" placeholder="Đề xuất kiến nghị" />
            </div>
            <div className="flex justify-end mt-10">
              <div className="text-center">
                <h6 className="italic">
                  Quy Nhơn, Ngày {format(parse(dataReport.dateReport, 'dd/MM/yyyy', new Date()), 'dd')} tháng{' '}
                  {format(parse(dataReport.dateReport, 'dd/MM/yyyy', new Date()), 'MM')} năm{' '}
                  {format(parse(dataReport.dateReport, 'dd/MM/yyyy', new Date()), 'yyyy')}{' '}
                </h6>
                <h6 className="mt-4">Người báo cáo</h6>
                <input className="border py-2 text-center font-semibold text-xl mt-2" placeholder="Họ và tên" />
              </div>
            </div>
          </div>
          <div className="mt-4 mb-24 flex justify-center">
            <button className="bg-orange-400 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-md">
              Gửi báo cáo
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ReportDate;
