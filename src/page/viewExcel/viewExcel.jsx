import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import mediaAPI from '../../api/mediaAPI';
import SheetCard from './components/SheetCard/SheetCard';
import { IoChevronBackOutline } from 'react-icons/io5';
import { createPortal } from 'react-dom';
import { LoadingPage } from '..';

const ViewExcel = () => {
  const [dataExcel, setDataExcel] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const convertTable = useMemo(() => {
    if (dataExcel?.length > 0) {
      return (
        <>
          <div className="flex font-semibold">
            <div className="w-[8%] border-y border-x border-zinc-900 px-2 py-1 flex items-center ">Cung đoạn</div>
            <div className="w-[16%] border-y border-r border-zinc-900 px-2 py-1 flex items-center">Tên TTCQ</div>
            <div className="w-[8%] border-y border-r border-zinc-900 px-2 py-1 flex items-center">Số điện thoại</div>
            <div className="w-[42%] border-y border-r border-zinc-900 py-1">
              <div className="text-center border-b border-zinc-900 px-2 py-1">Thông tin nhà dân / Cơ quan</div>
              <div className="flex">
                <div className="w-[32%] border-r border-zinc-900 px-2 py-1 flex items-center">Km đường bộ</div>
                <div className="w-[24%] border-r border-zinc-900 px-2 py-1 flex items-center">Tên </div>
                <div className="w-[24%] border-r border-zinc-900 px-2 py-1 flex items-center">Số điện thoại</div>
                <div className="w-[20%] flex items-center px-2 py-1">Ngày</div>
              </div>
            </div>
            <div className="w-[26%] flex items-center border-y border-r border-zinc-900 px-2 py-1">Ghi chú</div>
          </div>
          {dataExcel.map((row, index) => {
            return <SheetCard data={row} key={index} />;
          })}
        </>
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataExcel]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await mediaAPI.getDataMedia();
        console.log(res);
        if (res.status === 200) {
          const result = res.data.reduce((acc, curr) => {
            const location = curr[0];
            const existingItem = acc.find((item) => item.location === location);

            if (existingItem) {
              existingItem.items.push(curr);
            } else {
              acc.push({ location, items: [curr] });
            }

            return acc;
          }, []);
          setDataExcel(result);
        }
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return (
    <>
      {isLoading && createPortal(<LoadingPage />, document.body)}
      <div className="md:px-6 mt-16">
        <div className="flex justify-end w-8/12 mx-auto my-6">
          <Link to={'/'} className="flex items-center font-medium hover:text-orange-400">
            <IoChevronBackOutline />
            Back
          </Link>
        </div>
        <div className="mt-4">
          <div className="flex justify-between">
            <div className="w-4/12">
              <h4 className="text-center font-semibold">Đài Viễn Thông Quy Nhơn</h4>
            </div>
            <div className="w-8/12 text-center font-semibold">
              <h4>THÔNG TIN TRUYỀN THÔNG TẠI CÁC CUNG ĐOẠN TUẦN TRA CÁP QUANG</h4>
              <h6 className="italic">{'(Thực hiện từ ngày 07/03/2023)'}</h6>
            </div>
          </div>
          <div className="mt-4">{convertTable}</div>
        </div>
      </div>
    </>
  );
};

export default ViewExcel;
