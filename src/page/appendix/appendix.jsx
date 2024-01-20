import { Modal, Table } from 'antd';
import { useState } from 'react';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa';
import appendixConst from '../../constant/appendixConst.json';
import appendixDataSource from '../../constant/appendixDataSource.json';
import toast from 'react-hot-toast';
import Form from './components/form';

const Appendix = () => {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [data, setData] = useState({});

  const columns = appendixConst
    .map((item) => ({
      title: item.title,
      dataIndex: item.index,
      key: item.title,
      width: item.width,
      align: 'center',
    }))
    .concat({
      title: 'Action',
      key: 'action',
      align: 'center',
      width: 150,
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
    });

  const [dataSource, setDataSource] = useState(
    appendixDataSource.map((item, index) => ({
      ...item,
      key: index,
    })),
  );

  const handleCreate = () => {
    document.body.style.overflow = 'hidden';
    setData({});
    setIsCreateModalVisible(true);
  };
  const handleCreateOk = () => {
    setDataSource((prevDataSource) => [
      ...prevDataSource,
      {
        ...data,
        key: prevDataSource.length,
        stt: prevDataSource.length + 1,
      },
    ]); // fake create
    toast.success('Tạo mới bản ghi thành công!');
    setIsCreateModalVisible(false);
  };
  const handleCreateCancel = () => {
    document.body.style.overflow = 'auto';
    setIsCreateModalVisible(false);
  };

  const handleEdit = (record) => {
    document.body.style.overflow = 'hidden';
    setData(record);
    setIsEditModalVisible(true);
  };
  const handleEditOk = () => {
    setDataSource((prevDataSource) =>
      prevDataSource.map((item) => (item.key === data.key ? { ...item, ...data } : item)),
    );
    toast.success('Chỉnh sửa bản ghi thành công!');
    setIsEditModalVisible(false);
  };
  const handleEditCancel = () => {
    document.body.style.overflow = 'auto';
    setIsEditModalVisible(false);
  };

  const handleDelete = (record) => {
    document.body.style.overflow = 'hidden';
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };
  const handleDeleteOk = () => {
    setDataSource((prevDataSource) => prevDataSource.filter((item) => item.key !== currentRecord.key)); // fake remove
    toast.success('Xóa bản ghi thành công!');
    setIsDeleteModalVisible(false);
  };
  const handleDeleteCancel = () => {
    document.body.style.overflow = 'auto';
    setIsDeleteModalVisible(false);
  };

  return (
    <div className="md:flex md:justify-center mt-24 bg-white overflow-hidden flex flex-col">
      <div className="flex flex-col gap-2 items-center justify-center mt-8 font-semibold">
        <h1 className="text-lg md:text-2xl">PHỤ LỤC: TỔNG HỢP CÁP QUANG KHÔNG ĐÚNG QUY HOẠCH</h1>
        <p className="md:text-xl">Đính kèm báo cáo tình hình cáp quang ngày 10/01/2024</p>
        <p className="md:text-lg">Đơn vị báo cáo: Đài VT Quy Nhơn</p>
      </div>
      <div className="mt-10 flex justify-end mr-[30px] md:mr-[120px]">
        <button
          className="bg-green-500 font-semibold text-white px-6 py-2 md:px-8 md:py-3 rounded-md hover:bg-green-600 flex justify-center items-center gap-3"
          onClick={handleCreate}
        >
          <FaPlus fontSize={20} />
          Tạo mới
        </button>
      </div>
      <div className="my-8 md:mx-8 max-h-[455px] overflow-x-auto overflow-y-auto">
        <Table
          className="border rounded-lg"
          columns={columns}
          dataSource={dataSource}
          scroll={{ x: 'max-content' }}
          pagination={false}
        />
      </div>
      <Form
        title="Tạo mới bản ghi"
        visible={isCreateModalVisible}
        onOk={handleCreateOk}
        onCancel={handleCreateCancel}
        data={data}
        setData={setData}
      />
      <Form
        title="Chỉnh sửa bản ghi"
        visible={isEditModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
        data={data}
        setData={setData}
      />
      <Modal
        title={<h2 className="text-xl font-semibold">Xóa bản ghi</h2>}
        open={isDeleteModalVisible}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
      >
        <p>Bạn muốn xóa bản ghi này?</p>
      </Modal>
    </div>
  );
};

export default Appendix;
