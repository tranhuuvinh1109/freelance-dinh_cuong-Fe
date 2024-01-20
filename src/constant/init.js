import { format } from 'date-fns';
const todayDate = format(new Date(), 'dd/MM/yyyy');
const initialStatePlan = {
  id: 0,
  location: '',
  date: todayDate,
  address: 'aaa',
  cable_line: '111',
  name_staff: '',
  phone_staff: '',
  result: '',
  plan: '',
  description: '',
  construction_unit_information: '',
  affect: '',
};

export { initialStatePlan };
