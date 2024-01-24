/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQuery } from '@tanstack/react-query';
import { DatePicker, Divider, Input, Modal, Table } from 'antd';
import planAPI from '../../api/planAPI';
import { LoadingPage } from '..';
import { columnsPlan } from '../../constant/colums';
import { useMemo, useState } from 'react';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { CustomSelect, CustomTextArea } from '../../components';
import staffs from '../../constant/staffs.json';
import jobs from '../../constant/planTomorrow.json';
import location from '../../constant/location.json';
import { initialStatePlan } from '../../constant/init';
import dayjs from 'dayjs';
import { toast } from 'react-hot-toast';
import { IoDownloadOutline } from 'react-icons/io5';
const { confirm } = Modal;
const viewPlan = () => {
  const [dataSelected, setDataSelected] = useState(initialStatePlan);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, isLoading, refetch } = useQuery({ queryKey: ['plan'], queryFn: () => planAPI.getAllPlan() });
  const { mutate, isPending } = useMutation({
    mutationFn: () => planAPI.updatePlan(dataSelected?.id, dataSelected),
    onSuccess: (e) => {
      toast.success(e.data.message);
      refetch();
      setIsModalOpen(false);
      setDataSelected(initialStatePlan);
    },
  });
  const { mutate: mutateDelete } = useMutation({
    mutationFn: (id) => planAPI.deletePlan(id),
    onSuccess: () => {
      toast.success('Delete plan successfully !');
      refetch();
    },
  });

  const [filteredStaffs, setFilteredStaffs] = useState(staffs);

  const handleSelectChange = (name) => (value) => {
    if (name === 'location') {
      const filtered = staffs.filter((staff) => staff.branch === value);
      setFilteredStaffs(filtered);
      setDataSelected((prevData) => ({
        ...prevData,
        [name]: value,
        name_staff: '',
        phone_staff: '',
      }));
      return;
    }
    if (name === 'name_staff') {
      const filteredStaff = staffs.filter((staff) => staff.id === value);
      if (filteredStaff.length > 0) {
        setDataSelected((prevData) => ({
          ...prevData,
          [name]: filteredStaff[0].name,
          phone_staff: filteredStaff[0].phone,
        }));
      } else {
        setDataSelected((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
      return;
    }
    setDataSelected((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleChangeDate = (_, dateString) => {
    dateString && setDataSelected({ ...dataSelected, date: dateString });
  };
  const handleChangeData = (e) => {
    setDataSelected({
      ...dataSelected,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (id) => {
    if (data?.data?.data) {
      const result = data?.data?.data?.find((item) => item.id === id);
      if (result) {
        setIsModalOpen(true);
        setDataSelected(result);
      }
    }
  };
  const handleOk = async () => {
    await mutate();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setDataSelected(initialStatePlan);
  };

  const handleDelete = async (id) => {
    confirm({
      title: 'Bạn có chắc chắn muốn xóa dữ liệu này?',
      content: 'Khi bạn nhấn OK, dữ liệu sẽ bị xóa hoàn toàn và không thể khôi phục lại.',
      onOk: async () => {
        console.log(id);
        await mutateDelete(id);
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    });
  };

  const columns = [
    ...columnsPlan,
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      render: (id) => (
        <div className="align-center flex justify-center text-lg gap-2">
          <button
            className="py-2 px-5 rounded-md bg-orange-400 hover:bg-orange-600 text-white"
            onClick={() => handleEdit(id)}
          >
            <MdEdit />
          </button>
          <button
            className="py-2 px-5 rounded-md bg-red-400 hover:bg-red-600 text-white"
            onClick={() => handleDelete(id)}
          >
            <MdDeleteForever />
          </button>
        </div>
      ),
    },
  ];
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const renderTable = useMemo(() => {
    return (
      <>
        {isLoading && <LoadingPage />}
        {data?.data?.data && (
          <Table
            className="border rounded-lg"
            columns={columns}
            dataSource={data.data.data}
            scroll={{ x: 'max-content' }}
          />
        )}
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data?.data, isLoading]);
  return (
    <div className="mt-24">
      <div className="flex justify-end mt-8 px-10">
        <a
          href="https://mange-zdqk.onrender.com/api/plan-file/"
          className="flex items-center bg-green-400  px-3 py-2 rounded-md justify-center font-semibold text-white hover:bg-green-600"
        >
          <IoDownloadOutline fontSize={26} fontWeight={700} />
          Download Excel File
        </a>
      </div>
      <div className="my-8 md:mx-8 max-h-[455px] overflow-x-auto overflow-y-auto">{renderTable}</div>
      <Modal title="Sửa dữ liệu" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}>
        {isPending && <LoadingPage />}
        <form className="max-h-[500px] overflow-y-auto">
          <h4 className="text-center font-semibold text-xl">KẾ HOẠCH TUẦN TRA</h4>
          <div className="mt-4">
            <div className="mt-8 mb-4 md:flex md:items-center md:justify-between md:gap-4">
              <CustomSelect
                className="md:w-[25%] mt-4"
                name="location"
                defaultValue={location[0].value}
                onChange={handleSelectChange('location')}
                options={location}
                value={dataSelected.location}
                selectTitle="Trạm"
              />
              <div className="flex-col justify-start items-center md:w-[33%] mt-4">
                <span className="text-sm ml-1">Thời gian</span>
                <DatePicker
                  placeholder="Ngày"
                  onChange={handleChangeDate}
                  name="date"
                  value={dayjs(dataSelected.date)}
                  defaultValue={dayjs()}
                  className=" w-full px-[9px] py-[7px] mt-2 border rounded-md font-semibold"
                />
              </div>
              <CustomSelect
                className="md:w-[21%] mt-4"
                name="address"
                onChange={handleSelectChange('address')}
                value={dataSelected.address}
                selectTitle="Cung đoạn"
              />
              <CustomSelect
                className="md:w-[21%] mt-4"
                name="cable_line"
                onChange={handleSelectChange('cable_line')}
                value={dataSelected.cable_line}
                selectTitle="Tuyến cáp"
              />
            </div>
            <Divider orientation="left">Thông tin tuần tra</Divider>
            <div className="flex-col my-4">
              <div className="flex justify-start items-center gap-8 my-4">
                <CustomSelect
                  className="w-[50%] md:w-[30%]"
                  name="name_staff"
                  onChange={handleSelectChange('name_staff')}
                  options={filteredStaffs.map((staff) => ({
                    value: staff.id,
                    label: staff.name,
                  }))}
                  value={dataSelected.name_staff}
                  selectTitle="Tên nhân viên"
                />
                <div className="flex-col justify-start items-center w-[50%] md:w-[30%] ml-2">
                  <span className="text-sm ml-1">Số điện thoại</span>
                  <Input
                    name="phone_staff"
                    className="w-full h-9 mt-2"
                    readOnly={true}
                    value={dataSelected.phone_staff}
                  />
                </div>
              </div>
              <CustomTextArea
                name="result"
                onChange={handleChangeData}
                value={dataSelected.result}
                textAreaTitle="Kết quả công việc"
              />
            </div>
            <Divider orientation="left">Kế hoạch công việc ngày mai</Divider>
            <div className="flex-col my-4">
              <div className="flex justify-start items-center gap-8 my-2">
                <CustomSelect
                  className="w-full md:w-[30%]"
                  name="plan"
                  options={jobs.map((job) => ({
                    value: job.name,
                    label: job.name,
                  }))}
                  onChange={handleSelectChange('plan')}
                  value={dataSelected.plan}
                  selectTitle="Kế hoạch công việc ngày mai"
                />
              </div>
              <CustomTextArea
                className="mt-4"
                name="description"
                onChange={handleChangeData}
                value={dataSelected.description}
                textAreaTitle="Chi tiết công việc"
              />
              <CustomTextArea
                className="mt-4"
                name="construction_unit_information"
                onChange={handleChangeData}
                value={dataSelected.construction_unit_information}
                textAreaTitle="Thông tin đơn vị thi công"
              />
              <CustomTextArea
                className="mt-4"
                name="affect"
                onChange={handleChangeData}
                value={dataSelected.affect}
                textAreaTitle="Ảnh hưởng"
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default viewPlan;
