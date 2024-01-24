const columnsPlan = [
  {
    title: 'Trạm',
    dataIndex: 'location',
    key: 'location',
    width: 100,
  },
  {
    title: 'Cung đoạn',
    dataIndex: 'address',
    key: 'address',
    width: 100,
  },
  {
    title: 'Ngày',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Tuyến cáp',
    dataIndex: 'cable_line',
    key: 'cable_line',
  },
  {
    title: 'Tên Nhân Viên',
    dataIndex: 'name_staff',
    key: 'name_staff',
    width: 150,
  },
  {
    title: 'SĐT',
    dataIndex: 'phone_staff',
    key: 'phone_staff',
    width: 100,
  },
  {
    title: 'Kết quả',
    dataIndex: 'result',
    key: 'result',
  },
  {
    title: 'Kế hoạch',
    dataIndex: 'plan',
    key: 'plan',
    width: 100,
  },
  {
    title: 'Chi tiết công việc',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Thông tin đơn vị thi công',
    dataIndex: 'construction_unit_information',
    key: 'construction_unit_information',
  },
  {
    title: 'Ảnh hưởng',
    dataIndex: 'affect',
    key: 'affect',
  },
];

const columnsAppendix = [
  {
    title: 'Cung đoạn',
    index: 'cungdoan',
    dataIndex: 'address',
    key: 'address',
    width: 110,
  },
  {
    title: 'Hệ thống',
    index: 'hethong',
    dataIndex: 'system',
    key: 'system',
    width: 110,
  },
  {
    title: 'Cáp QH',
    index: 'cable_qh',
    dataIndex: 'cable_qh',
    key: 'cable_qh',
    width: 100,
  },
  {
    title: 'Cáp ƯC',
    index: 'cable_uc',
    dataIndex: 'cable_uc',
    key: 'cable_uc',
    width: 100,
  },
  {
    title: 'Thời gian chuyển đi',
    index: 'time_move',
    dataIndex: 'time_move',
    key: 'time_move',
    width: 60,
  },
  {
    title: 'Thời gian chuyển trả',
    index: 'time_back',
    dataIndex: 'time_back',
    key: 'time_back',
    width: 60,
  },
  {
    title: 'Lý do chuyển',
    index: 'reason',
    dataIndex: 'reason',
    key: 'reason',
    width: 200,
  },
  {
    title: 'Ghi chú',
    index: 'note',
    dataIndex: 'note',
    key: 'note',
    width: 300,
  },
];

export { columnsPlan, columnsAppendix };
