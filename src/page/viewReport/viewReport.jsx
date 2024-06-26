import { useEffect, useMemo, useState } from 'react';
import reportAPI from '../../api/reportAPI';
import { format, subDays, parse } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import Loading from '../loading/Loading';
import { IoIosCloudDownload } from 'react-icons/io';
import { MdDeleteForever } from 'react-icons/md';
import { Popconfirm } from 'antd';
import toast from 'react-hot-toast';
const ViewListReport = () => {
  const [chooseReport, setChooseReport] = useState();
  const [listReport, setListReport] = useState();
  const { data, isLoading, refetch } = useQuery({ queryKey: ['todos'], queryFn: () => reportAPI.getAllReport() });

  const deleteReport = async (id) => {
    try {
      const res = await reportAPI.deleteReport(id);
      if (res.status === 204) {
        toast.success('Đã xóa báo cáo thành công!');
        refetch();
      }
    } catch (e) {
      console.log(e);
      toast.error('Xóa báo cáo thất bại !');
    }
  };
  useEffect(() => {
    if (data?.data?.data) {
      setListReport(data?.data?.data);
      setChooseReport(data?.data?.data[0]);
    }
  }, [data?.data?.data]);

  const selectDaily = useMemo(() => {
    return (
      <div className="md:w-[30%] h-[500px] mb-10 md:mb-0 overflow-y-auto p-4">
        {listReport?.map((report) => {
          return (
            <div
              key={report.id}
              onClick={() => setChooseReport(report)}
              className={`${
                chooseReport?.id === report.id ? 'bg-slate-200' : ''
              } p-2 border hover:bg-slate-200 hover:cursor-pointer font-semibold flex justify-between items-center`}
            >
              <span>
                Báo cáo {report.location} - {report.date_report}
              </span>
              <div className="flex gap-2">
                <a
                  href={`https://mange-zdqk.onrender.com/api/report/download/${report.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="border-green-500 border  p-2 rounded-md text-green-500 hover:bg-green-500 hover:text-white"
                >
                  <IoIosCloudDownload fontSize={20} />
                </a>
                <Popconfirm
                  title="Xoá báo cáo"
                  description="Bạn có chắc chắn muốn xóa báo cào này?"
                  onConfirm={() => deleteReport(report.id)}
                  okText="Xóa"
                  cancelText="Hủy"
                >
                  <button className="border-red-500 border  p-2 rounded-md text-red-500 hover:bg-red-500 hover:text-white">
                    <MdDeleteForever fontSize={20} />
                  </button>
                </Popconfirm>
              </div>
            </div>
          );
        })}
      </div>
    );
  }, [chooseReport?.id, deleteReport, listReport]);
  return (
    <>
      <div className="md:px-24 mt-24">
        {isLoading ? (
          <div>
            <Loading />
          </div>
        ) : (
          <div className="md:flex justify-between">
            {selectDaily}
            <div className="md:w-[70%] p-4">
              {chooseReport && (
                <div className="border px-6 py-4">
                  <h4 className="text-center font-semibold text-xl">
                    Báo cáo ADG Trạm VT {chooseReport.location} ngày {chooseReport.date_report}
                  </h4>
                  <h6 className="mt-6">
                    Kính gửi: <span className="font-semibold">Lãnh đạo Đài VT QNN</span>
                  </h6>
                  <h6 className="mt-2">
                    Trạm VT {chooseReport.location} báo cáo tình hình thông tin liên lạc từ 07h00 ngày{' '}
                    <span className="font-semibold">
                      {format(subDays(parse(chooseReport.date_report, 'dd/MM/yyyy', new Date()), 1), 'dd/MM/yyyy')}
                    </span>{' '}
                    đến 07h00 ngày <span className="font-semibold">{chooseReport.date_report}</span>.
                  </h6>
                  <h4 className="font-semibold mt-6">I. TÌNH HÌNH THÔNG TIN:</h4>
                  <div className="flex items-center mt-2">
                    <h6>1. Thiết bị viễn thông: {chooseReport.cable}</h6>
                  </div>
                  {chooseReport.sv_device && (
                    <div className="flex items-center mt-1">
                      <h6>
                        <span className="italic font-semibold">Thông tin sự vụ:</span> {chooseReport.sv_device}
                      </h6>
                    </div>
                  )}
                  <div className="flex items-center mt-2">
                    <h6>2. Cáp quang: {chooseReport.cable}</h6>
                  </div>
                  {chooseReport.sv_device && (
                    <div className="flex items-center mt-1">
                      <h6>
                        <span className="italic font-semibold">Thông tin sự vụ:</span> {chooseReport.sv_cable}
                      </h6>
                    </div>
                  )}
                  <div className="flex items-center mt-2">
                    <h6>3. Nguồn điện, điều hoà: {chooseReport.power}</h6>
                  </div>
                  {chooseReport.sv_power && (
                    <div className="flex items-center mt-1">
                      <h6>
                        <span className="italic font-semibold">Thông tin sự vụ:</span> {chooseReport.sv_power}
                      </h6>
                    </div>
                  )}
                  <p className="mt-4 text-sm italic">
                    <span className="text-red-600">Chú thích:</span> <span className="font-semibold">BT:</span> Bình
                    thường, <span className="font-semibold">SC:</span> Sự cố
                  </p>
                  <h4 className="font-semibold mt-6">II. TÌNH HÌNH CÔNG VIỆC:</h4>
                  <div className="mt-2">
                    <h6>1. Thực hiện theo công văn:</h6>
                    <p>{chooseReport.report}</p>
                  </div>
                  <div className="mt-2">
                    <h6>2. Công việc khác:</h6>
                    <p>{chooseReport.other_job}</p>
                  </div>
                  <h4 className="font-semibold mt-6">III. Tồn tại:</h4>
                  <p>{chooseReport.exist}</p>

                  <div className="mt-6">
                    <h6>ĐỀ XUẤT KIẾN NGHỊ</h6>
                    <p>{chooseReport.propose}</p>
                  </div>
                  <div className="flex justify-end mt-10">
                    <div className="text-center">
                      <h6 className="italic">
                        Quy Nhơn, Ngày {format(parse(chooseReport.date_report, 'dd/MM/yyyy', new Date()), 'dd')} tháng{' '}
                        {format(parse(chooseReport.date_report, 'dd/MM/yyyy', new Date()), 'MM')} năm{' '}
                        {format(parse(chooseReport.date_report, 'dd/MM/yyyy', new Date()), 'yyyy')}{' '}
                      </h6>
                      <h6 className="mt-4">Người báo cáo</h6>
                      <h4 className="text-center font-semibold text-xl mt-2">{chooseReport.creator}</h4>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewListReport;
