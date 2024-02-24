import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import mediaAPI from '../../api/mediaAPI';
import { IoChevronBackOutline } from 'react-icons/io5';
import { createPortal } from 'react-dom';
import { LoadingPage } from '..';
import { Table } from 'antd';
import { useQuery } from '@tanstack/react-query';
const { Column, ColumnGroup } = Table;

const ViewExcel = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['appendix'],
    queryFn: () => mediaAPI.getAllMedia(),
  });
  const convertTable = useMemo(() => {
    if (data?.data?.length > 0) {
      return (
        <div>
          <Table dataSource={data.data} scroll={{ x: 'max-content' }}>
            <Column title="Cung đoạn" dataIndex="location" key="location" />
            <Column title="Tên TTCQ" dataIndex="name_ttcq" key="name_ttcq" />
            <Column title="Số điện thoại" dataIndex="phone_staff" key="phone_staff" />
            <ColumnGroup title="Thông tin nhà dân / Cơ quan">
              <Column title="Km đường bộ" dataIndex="km" key="km" />
              <Column title="Tên" dataIndex="name" key="name" />
              <Column title="Số điện thoại" dataIndex="phone" key="phone" />
              <Column title="Ngày" dataIndex="date" key="date" />
            </ColumnGroup>
            <Column title="Ghi chú" dataIndex="note" key="note" />
          </Table>
        </div>
      );
    }
  }, [data]);

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
