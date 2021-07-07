import { getEmailTemplate } from '../utils/email';
import random from '../utils/random';
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
  id: string;
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

const customSms = (to: String, info: UserInfo) => authPost('https://test.findparkstash.com/api/v1/testOnly/sms', {
   to,
  "msg": getMessageTemplate(info)
});


const getMessageTemplate =(info: UserInfo)=>{
  return `E-Permit request confirmation: ${info.id}. \n
  Hi ${info.firstName}, your request for E-permit from the UC Davis(${info.department}) has been confirmed with ParkStash and it starts at ${info.starts} and ends on ${info.ends}. More detail has been sent to your email.
  Navigate here: https://shorturl.at/uyDV0`;
}
export default { sendEmail, customEmail, customSms }