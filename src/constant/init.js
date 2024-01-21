import { format } from 'date-fns';
const todayDate = format(new Date(), 'dd/MM/yyyy');
const today = new Date();
const initialStatePlan = {
  id: 0,
  location: '',
  date: todayDate,
  address: '',
  cable_line: '',
  name_staff: '',
  phone_staff: '',
  result: '',
  plan: '',
  description: '',
  construction_unit_information: '',
  affect: '',
};

const initialStateAppendix = {
  id: '',
  address: '',
  system: '',
  cable_qh: '',
  cable_uc: '',
  time_move: today,
  time_back: today,
  reason: '',
  note: '',
};
export { initialStatePlan, initialStateAppendix };
