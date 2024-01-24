import { Modal, Select, Input } from 'antd';
import location from '../../constant/location.json';
import state from '../../constant/state.json';
import { useState } from 'react';
import * as Yup from 'yup';
import { format, subDays, parse } from 'date-fns';
import { toast } from 'react-hot-toast';
import reportAPI from '../../api/reportAPI';
import { createPortal } from 'react-dom';
import { IoMdCloudDownload } from 'react-icons/io';
import { LoadingPage } from '..';
import { Link } from 'react-router-dom';
const { TextArea } = Input;
const ReportDate = () => {
  const todayDate = format(new Date(), 'dd/MM/yyyy');
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [existWord, setExistWord] = useState('');
  const [dataReport, setDataReport] = useState({
    location: '',
    dateReport: todayDate,
    device: '',
    svDevice: '',
    svCable: '',
    svPower: '',
    report: '',
    otherJob: '',
    exist: '',
    propose: '',
    creator: '',
    date: todayDate,
  });
  const validationSchema = Yup.object().shape({
    location: Yup.string().required('Vui lòng chọn trạm'),
    dateReport: Yup.string().required('Vui lòng nhập ngày viết báo cáo'),
    device: Yup.string().required('Vui lòng chọn tình trạng Thiết bị viễn thông'),
    cable: Yup.string().required('Vui lòng chọn tình trạng Cáp quang'),
    power: Yup.string().required('Vui lòng chọn tình trạng Nguồn điện, điều hoà'),
    report: Yup.string().required('Vui lòng chọn nhập Thực hiện theo công văn'),
    otherJob: Yup.string().required('Vui lòng chọn nhập Công việc khác'),
    exist: Yup.string().required('Vui lòng chọn nhập Tồn tại'),
    propose: Yup.string().required('Vui lòng chọn nhập ĐỀ XUẤT KIẾN NGHỊ'),
    creator: Yup.string().required('Vui lòng nhập họ và tên người viết báo cáo'),
    date: Yup.string(),
    svDevice: Yup.string(),
    svCable: Yup.string(),
    svPower: Yup.string(),
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
  const handleClearData = () => {
    setDataReport({
      ...dataReport,
      device: '',
      cable: '',
      power: '',
      report: '',
      otherJob: '',
      exist: '',
      propose: '',
      creator: '',
    });
  };
  const fetchReportExist = async (location, date) => {
    try {
      const res = await reportAPI.getReportByLocationAndDate(location, date);
      setExistWord(res.data.data[0].id);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await validationSchema.validate(dataReport);

      const res = await reportAPI.createReport({
        location: dataReport.location,
        date_report: dataReport.dateReport,
        device: dataReport.device,
        cable: dataReport.cable,
        power: dataReport.power,
        report: dataReport.report,
        other_job: dataReport.otherJob,
        exist: dataReport.exist,
        propose: dataReport.propose,
        creator: dataReport.creator,
        date: dataReport.dateReport,
        sv_device: dataReport.svDevice,
        sv_cable: dataReport.svCable,
        sv_power: dataReport.svPower,
      });
      if (res.status === 201) {
        setDataReport({
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
          date: todayDate,
        });
        toast.success('Tạo báo cáo thành công !');
        fetchReportExist(res.data.data.location.split('/')[1], res.data.data.date_report.replaceAll('/', '-'));
      }
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors['' + error.path] = error.message;
        });
      }
      const messageKey = Object.keys(validationErrors)[0];
      toast.error(validationErrors[messageKey]);
    }
    setIsLoading(false);
  };
  return (
    <>
      {isLoading && createPortal(<LoadingPage />, document.body)}
      <div className="mt-24 md:w-[1000px] mx-auto">
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
          onCancel={() => {
            setDataReport({
              ...dataReport,
              location: '',
            });
            setModalOpen(false);
          }}
        >
          <div className="">
            <h5 className="italic font-semibold text-xl">
              Chọn trạm <span className="text-red-500">*</span>:
            </h5>
            <Select
              placeholder="Chọn trạm"
              value={dataReport.location}
              className="w-full my-4"
              onChange={handleChange}
              options={location}
            />
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
        <div className="w-full h-fit flex justify-center">
          <div className="w-fit h-[100px] bg-white flex justify-center items-center gap-20 px-12 rounded-md">
            <button
              onClick={() => setModalOpen(true)}
              className="font-semibold text-white w-[200px] h-[50px] rounded-md bg-[var(--main-theme-color)] hover:bg-[var(--main-theme-color-hover)] "
            >
              Tạo báo cáo ngày
            </button>
            <Link
              className="bg-orange-400 flex items-center justify-center w-[200px] h-[50px] px-6 rounded-md font-semibold text-white hover:bg-orange-600"
              to={'/report/view'}
            >
              Danh sách báo cáo
            </Link>
          </div>
        </div>
        {existWord && (
          <div className="flex justify-center mt-4">
            <a
              className="flex items-center font-semibold text-white px-6 py-2 rounded-md bg-red-400 hover:bg-red-600 "
              href={`https://mange-zdqk.onrender.com/api/report/download/${existWord}`}
            >
              <IoMdCloudDownload fontSize={24} fontWeight={600} />
              Tải báo cáo
            </a>
          </div>
        )}
        {!modalOpen && dataReport.location !== '' && dataReport.dateReport !== '' && (
          <form onSubmit={handleSubmit}>
            <div className="border px-6 py-4 mt-6 rounded-md bg-white">
              <h4 className="text-center font-semibold text-xl">
                Báo cáo ADG Trạm VT {dataReport.location} ngày {dataReport.dateReport}
              </h4>
              <h6 className="mt-6">
                Kính gửi: <span className="font-semibold">Lãnh đạo Đài VT QNN</span>
              </h6>
              <h6 className="mt-2">
                Trạm VT {dataReport.location} báo cáo tình hình thông tin liên lạc từ 07h00 ngày{' '}
                <span className="font-semibold">
                  {format(subDays(parse(dataReport.dateReport, 'dd/MM/yyyy', new Date()), 1), 'dd/MM/yyyy')}
                </span>{' '}
                đến 07h00 ngày <span className="font-semibold">{dataReport.dateReport}</span>.
              </h6>
              <h4 className="font-semibold mt-6">I. TÌNH HÌNH THÔNG TIN:</h4>
              <div className=" mt-2">
                <div className="flex items-center">
                  <h6 onClick={() => console.log(dataReport)}>1. Thiết bị viễn thông:</h6>
                  <Select
                    defaultValue={state[0].value}
                    className="ml-2"
                    onChange={(value) =>
                      setDataReport({
                        ...dataReport,
                        device: value,
                      })
                    }
                    value={dataReport.device}
                    options={state}
                  />
                </div>
                <div>
                  {dataReport.device === 'SV' && (
                    <Input
                      placeholder="Mô tả sự vụ"
                      className="mt-1"
                      value={dataReport.svDevice}
                      name="svDevice"
                      onChange={handleChangeData}
                    />
                  )}
                </div>
              </div>
              <div className="mt-2">
                <div className="flex items-center ">
                  <h6>2. Cáp quang:</h6>
                  <Select
                    defaultValue={state[0].value}
                    className="ml-2"
                    onChange={(value) =>
                      setDataReport({
                        ...dataReport,
                        cable: value,
                      })
                    }
                    value={dataReport.cable}
                    options={state}
                  />
                </div>
                <div>
                  {dataReport.cable === 'SV' && (
                    <Input
                      placeholder="Mô tả sự vụ"
                      className="mt-1"
                      value={dataReport.svCable}
                      name="svCable"
                      onChange={handleChangeData}
                    />
                  )}
                </div>
              </div>
              <div className="mt-2">
                <div className="flex items-center ">
                  <h6>3. Nguồn điện, điều hoà</h6>
                  <Select
                    defaultValue={state[0].value}
                    className="ml-2"
                    onChange={(value) =>
                      setDataReport({
                        ...dataReport,
                        power: value,
                      })
                    }
                    value={dataReport.power}
                    options={state}
                  />
                </div>
                <div>
                  {dataReport.power === 'SV' && (
                    <Input
                      placeholder="Mô tả sự vụ"
                      className="mt-1"
                      value={dataReport.svPower}
                      name="svPower"
                      onChange={handleChangeData}
                    />
                  )}
                </div>
              </div>
              <p className="mt-4 text-sm italic">
                <span className="text-red-600">Chú thích:</span> <span className="font-semibold">BT:</span> Bình thường,{' '}
                <span className="font-semibold">SV:</span> Sự vụ
              </p>
              <h4 className="font-semibold mt-6">II. TÌNH HÌNH CÔNG VIỆC:</h4>
              <div className="mt-2">
                <h6>1. Thực hiện theo công văn:</h6>
                <TextArea
                  name="report"
                  value={dataReport.report}
                  onChange={handleChangeData}
                  rows={4}
                  placeholder="Nhập N/A nếu không muốn viết nội dung"
                />
              </div>
              <div className="mt-2">
                <h6>2. Công việc khác:</h6>
                <TextArea
                  name="otherJob"
                  value={dataReport.otherJob}
                  onChange={handleChangeData}
                  rows={4}
                  placeholder="Nhập N/A nếu không muốn viết nội dung"
                />
              </div>
              <h4 className="font-semibold mt-6">III. Tồn tại:</h4>
              <TextArea
                name="exist"
                value={dataReport.exist}
                onChange={handleChangeData}
                rows={4}
                className="mt-2"
                placeholder="Nhập N/A nếu không muốn viết nội dung"
              />
              <div className="mt-6">
                <h6>ĐỀ XUẤT KIẾN NGHỊ</h6>
                <TextArea
                  name="propose"
                  value={dataReport.propose}
                  onChange={handleChangeData}
                  rows={4}
                  className="mt-2"
                  placeholder="Nhập N/A nếu không muốn viết nội dung"
                />
              </div>
              <div className="flex justify-end mt-10">
                <div className="text-center">
                  <h6 className="italic">
                    Quy Nhơn, Ngày {format(parse(dataReport.dateReport, 'dd/MM/yyyy', new Date()), 'dd')} tháng{' '}
                    {format(parse(dataReport.dateReport, 'dd/MM/yyyy', new Date()), 'MM')} năm{' '}
                    {format(parse(dataReport.dateReport, 'dd/MM/yyyy', new Date()), 'yyyy')}{' '}
                  </h6>
                  <h6 className="mt-4">Người báo cáo</h6>
                  <input
                    value={dataReport.creator}
                    name="creator"
                    onChange={handleChangeData}
                    className="border py-2 text-center font-semibold text-xl mt-2"
                    placeholder="Họ và tên"
                  />
                </div>
              </div>
              <div>
                <p className="font-semibold italic">Lưu ý: Nhập N/A nếu không muốn viết nội dung</p>
              </div>
            </div>
            <div className="mt-4 mb-24 flex justify-around">
              <button
                onClick={handleClearData}
                className="border border-orange-400 hover:text-orange-600 hover:border-orange-600 text-orange-400 bg-white font-medium px-6 py-2 rounded-md"
              >
                Xóa dữ liệu
              </button>
              <button
                type="submit"
                className="bg-orange-400 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-md"
              >
                Gửi báo cáo
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default ReportDate;
