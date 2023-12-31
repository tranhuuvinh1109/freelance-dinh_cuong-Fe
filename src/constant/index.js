const location = [
  {
    label: 'Chọn trạm',
    value: '',
  },
  {
    label: 'QNN/LKN',
    value: 'QNN/LKN',
  },
  {
    label: 'QNN/TKT',
    value: 'QNN/TKT',
  },
  {
    label: 'QNN/TYA',
    value: 'QNN/TYA',
  },
  {
    label: 'QNN/NTG',
    value: 'QNN/NTG',
  },
  {
    label: 'QNN/GRG',
    value: 'QNN/GRG',
  },
  {
    label: 'QNN/197.PBC',
    value: 'QNN/197.PBC',
  },
  {
    label: 'CQB.SJC2',
    value: 'CQB.SJC2',
  },
];
const state = [
  {
    label: 'Chọn tình trạng',
    value: '',
  },
  {
    label: 'BT',
    value: 'BT',
  },
  {
    label: 'SV',
    value: 'SV',
  },
];

const navBar = [
  {
    label: 'Trang chủ',
    url: '/',
  },
  {
    label: 'Báo cáo thông tin Ngày',
    url: '/report-day',
  },
  {
    label: 'Truyền thông',
    url: '/media',
  },
];

const staffs = [
  {
    id: '1',
    branch: 'QNN/TKT',
    name: 'Trần Viết Thanh',
    phone: '0914739518',
  },
  {
    id: '2',
    branch: 'QNN/TKT',
    name: 'Ngô Đình Thắng',
    phone: '0914130779',
  },
  {
    id: '3',
    branch: 'QNN/TKT',
    name: 'Phan Thanh Trung',
    phone: '0917235597',
  },
  {
    id: '4',
    branch: 'QNN/TKT',
    name: 'Trần Thanh Diệp',
    phone: '0914285138',
  },
  {
    id: '5',
    branch: 'QNN/TKT',
    name: 'Nguyễn Văn Toàn',
    phone: '0912621839',
  },
  {
    id: '6',
    branch: 'QNN/TKT',
    name: 'Trịnh Thanh Bình',
    phone: '0914243434',
  },
  {
    id: '7',
    branch: 'QNN/TKT',
    name: 'Trịnh Thanh Bình',
    phone: '0914243434',
  },
  {
    id: '8',
    branch: 'QNN/TKT',
    name: 'Nguyễn Quang Minh',
    phone: '0914179123',
  },
  {
    id: '9',
    branch: 'QNN/TKT',
    name: 'Dương Ngọc Anh',
    phone: '0914139866',
  },
  {
    id: '10',
    branch: 'QNN/TKT',
    name: 'Trần Ngọc Cường',
    phone: '0914269331',
  },
  {
    id: '11',
    branch: 'QNN/TKT',
    name: 'Mai Văn Viên',
    phone: '0914061863',
  },
  {
    id: '12',
    branch: 'QNN/TKT',
    name: 'Nguyễn Hữu Bình',
    phone: '0945153457',
  },
  {
    id: '13',
    branch: 'QNN/TYA',
    name: 'Đinh Nguyên Cao',
    phone: '0914683456',
  },
  {
    id: '14',
    branch: 'QNN/TYA',
    name: 'Bùi Chiến Lũy',
    phone: '0848268368',
  },
  {
    id: '15',
    branch: 'QNN/TYA',
    name: 'Nguyễn Đức Sanh',
    phone: '0918324255',
  },
  {
    id: '16',
    branch: 'QNN/TYA',
    name: 'Nguyễn Văn Quỳnh',
    phone: '0941362585',
  },
  {
    id: '17',
    branch: 'QNN/TYA',
    name: 'Mai Tiến Dũng',
    phone: '0911363979',
  },
  {
    id: '18',
    branch: 'QNN/TYA',
    name: 'Nguyễn Hữu Hòa',
    phone: '0914038384',
  },
  {
    id: '19',
    branch: 'QNN/TYA',
    name: 'Lê Ngọc Triên',
    phone: '0913452222',
  },
  {
    id: '20',
    branch: 'QNN/LKN',
    name: 'Huỳnh Đình Phương',
    phone: '0914221990',
  },
  {
    id: '21',
    branch: 'QNN/LKN',
    name: 'Võ Toản',
    phone: '0916600449',
  },
  {
    id: '22',
    branch: 'QNN/LKN',
    name: 'Nguyễn Thế Vị',
    phone: '0914222096',
  },
  {
    id: '23',
    branch: 'QNN/LKN',
    name: 'Trần Văn Nghệ',
    phone: '0914124035',
  },
  {
    id: '24',
    branch: 'QNN/NTC',
    name: 'Doãn Ngọc Đào',
    phone: '0914738499',
  },
  {
    id: '25',
    branch: 'QNN/NTC',
    name: 'Bùi Năng Học',
    phone: '0914461222',
  },
  {
    id: '26',
    branch: 'QNN/NTC',
    name: 'Nguyễn Hoàng Dũng',
    phone: '0914088701',
  },
  {
    id: '27',
    branch: 'QNN/NTC',
    name: 'Trần Quang Bắc',
    phone: '0947745577',
  },
  {
    id: '28',
    branch: 'QNN/NTC',
    name: 'Nguyễn Xuân Đàm',
    phone: '0945505105',
  },
  {
    id: '29',
    branch: 'QNN/NTC',
    name: 'Phan Bá Đường',
    phone: '0832577855',
  },
  {
    id: '30',
    branch: 'QNN/NTC',
    name: 'Ngô Đình Anh Dũng',
    phone: '0946147342',
  },
  {
    id: '31',
    branch: 'QNN/NTC',
    name: 'Trần Nho Anh',
    phone: '0914456070',
  },
  {
    id: '32',
    branch: 'QNN/NTC',
    name: 'Huỳnh Thái Trung',
    phone: '0914044822',
  },
  {
    id: '33',
    branch: 'QNN/NTC',
    name: 'Nguyễn Văn Thanh',
    phone: '0913429009',
  },
];

export { location, state, navBar, staffs };
