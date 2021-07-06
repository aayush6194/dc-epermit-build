import { getEmailTemplate } from '../utils/email';
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

export interface UserInfo {
  firstName: string;
  lastName: string;
  department: string;
  starts: string;
  ends: string;
  licensePlate: string;
}


const sendEmail = (body: Body) => authPost('https://test.findparkstash.com/api/v1/utils/emailSutterHealth', body);

const customEmail = (to: String, info: UserInfo) => authPost('https://test.findparkstash.com/api/v1/testOnly/email', {
  "from" :"ParkStash <important@findparkstash.com>",
   to,
  "subject": "ParkStash E-Permit Details",
  "html": getEmailTemplate(info)
});

export default { sendEmail, customEmail }