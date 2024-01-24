import { Modal, Table } from 'antd';
import { useState } from 'react';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { IoDownloadOutline } from 'react-icons/io5';
import { useQuery } from '@tanstack/react-query';
import appendixAPI from '../../api/apeendixAPI';
import { LoadingPage } from '..';
import { columnsAppendix } from '../../constant/colums';
import { Link } from 'react-router-dom';

const Appendix = () => {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  // const [data, setData] = useState({});

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['appendix'],
    queryFn: () => appendixAPI.getAllAppendix(),
  });
  console.log(data, isLoading);
  const columns = [
    ...columnsAppendix,
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      width: '10%',
      render: (text, record) => (
        <div className="align-center flex justify-center text-lg gap-2">
          <button
            className="py-2 px-5 rounded-md bg-orange-400 hover:bg-orange-600 text-white"
            onClick={() => handleEdit(record)}
          >
            <MdEdit />
          </button>
          <button
            className="py-2 px-5 rounded-md bg-red-400 hover:bg-red-600 text-white"
            onClick={() => handleDelete(record)}
          >
            <MdDeleteForever />
          </button>
        </div>
      ),
    },
  ];

  const handleCreate = () => {
    document.body.style.overflow = 'hidden';
    // setData({});
    setIsCreateModalVisible(true);
  };
  // const handleCreateOk = () => {
  //   setDataSource((prevDataSource) => [
  //     ...prevDataSource,
  //     {
  //       ...data,
  //       key: prevDataSource.length,
  //       stt: prevDataSource.length + 1,
  //     },
  //   ]); // fake create
  //   toast.success('Tạo mới bản ghi thành công!');
  //   setIsCreateModalVisible(false);
  // };
  // const handleCreateCancel = () => {
  //   document.body.style.overflow = 'auto';
  //   setIsCreateModalVisible(false);
  // };

  const handleEdit = () => {
    document.body.style.overflow = 'hidden';
    // setData(record);
    setIsEditModalVisible(true);
  };
  // const handleEditOk = () => {
  //   setDataSource((prevDataSource) =>
  //     prevDataSource.map((item) => (item.key === data.key ? { ...item, ...data } : item)),
  //   );
  //   toast.success('Chỉnh sửa bản ghi thành công!');
  //   setIsEditModalVisible(false);
  // };
  // const handleEditCancel = () => {
  //   document.body.style.overflow = 'auto';
  //   setIsEditModalVisible(false);
  // };

  const handleDelete = (record) => {
    document.body.style.overflow = 'hidden';
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };
  const handleDeleteOk = () => {
    // setDataSource((prevDataSource) => prevDataSource.filter((item) => item.key !== currentRecord.key)); // fake remove
    toast.success('Xóa bản ghi thành công!');
    setIsDeleteModalVisible(false);
  };
  const handleDeleteCancel = () => {
    document.body.style.overflow = 'auto';
    setIsDeleteModalVisible(false);
  };

  return (
    <>
      {isLoading && <LoadingPage />}
      <div className="md:flex md:justify-center mt-24 bg-white overflow-hidden flex flex-col">
        <div className="flex flex-col gap-2 items-center justify-center mt-8 font-semibold">
          <h1 className="text-lg md:text-2xl">PHỤ LỤC: TỔNG HỢP CÁP QUANG KHÔNG ĐÚNG QUY HOẠCH</h1>
          <p className="md:text-lg">Đơn vị báo cáo: Đài VT Quy Nhơn</p>
        </div>
        <div className="mt-10 flex justify-end mr-[30px] md:mr-[120px] gap-6">
          <div>
            <a
              href="https://mange-zdqk.onrender.com/api/appendix/download/"
              className="flex items-center bg-green-400  px-3 py-2 rounded-md justify-center font-semibold text-white hover:bg-green-600"
            >
              <IoDownloadOutline fontSize={20} />
              Download
            </a>
          </div>
          <div>
            <Link
              to="create"
              className="flex items-center bg-green-400  px-3 py-2 rounded-md justify-center font-semibold text-white hover:bg-green-600"
            >
              <FaPlus fontSize={20} />
              Tạo mới
            </Link>
          </div>
        </div>
        <div className="my-8 md:mx-8 max-h-[455px] overflow-x-auto overflow-y-auto">
          {data?.data?.data && (
            <Table
              className="border rounded-lg"
              columns={columns}
              dataSource={data?.data?.data}
              scroll={{ x: 'max-content' }}
              pagination={false}
            />
          )}
        </div>
        <Modal
          title={<h2 className="text-xl font-semibold">Xóa bản ghi</h2>}
          open={isDeleteModalVisible}
          onOk={handleDeleteOk}
          onCancel={handleDeleteCancel}
        >
          <p>Bạn muốn xóa bản ghi này?</p>
        </Modal>
      </div>
    </>
  );
};

export default Appendix;
