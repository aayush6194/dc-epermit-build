import {  authPost } from './utils/request';


interface Body {
  firstName: string;
  lastName: string;
  email: string;
  licensePlate: string;
  phone: string;
  vaccine: string;
  date: string;
  location: string;
  space: number;
}


const sendEmail = (body: Body) => authPost('https://test.findparkstash.com/api/v1/utils/emailSutterHealth', body);

export default { sendEmail }