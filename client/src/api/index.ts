
import { post, authGet, authPost, customPost, authUpload, get, authDelete , deleteReq} from './request';
import { API, API2, ENTERPRISE, ENTERPRISE_GEO_LOCATION_URL, googleAPIKey  } from '../config'
import { EditAnnouncement, AddAnnouncement } from '../model/domain/announcements';
import { Garage, UpdateGarageModel, GarageOccupancyTable, AddGarageModel } from '../model/domain/garage';
import { FlatValue, TimeSeries } from '../model/domain/metrics';
import { EnterpriseRole } from '../model/domain/enterprise';
import { RootPermit } from '../store/reducer/permit';
import { getEmailTemplate } from '../utils/email';

export interface UserInfo {
  id: string;
  firstName: string;
  lastName: string;
  department: string;
  starts: string;
  ends: string;
  licensePlate: string;
  type: string;
  phone: string;
  email: string;
  location: string;
  link: string;
  isCompleting: boolean;
}


const getMessageTemplate =(info: UserInfo)=>{
  return `E-Permit request confirmation: ${info.id}. \n
  Hi ${info.firstName}, your request for E-permit from the ${ENTERPRISE} ${info.department? "(" +info.department+ ")": ""} has been confirmed with ParkStash and it starts at ${info.starts} and ends on ${info.ends}. More detail has been sent to your email.
  Permit Link: ${info.link} \n
  Navigation Link: ${ENTERPRISE_GEO_LOCATION_URL}
  `;
}

interface Body {
  firstName: string;
  lastName: string;
  email: string;
  licensePlate: string;
  phone: string;
  vaccine: string;
  date: string;
  end?: string;
  type? : string;
  location: string;
  space: number;
  link?: string;
}

const getPlaces = (addr: string)=> fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=${googleAPIKey}`).then((res) => res.json()) 
const sendTowEmail = (body: Body) => authPost('https://test.findparkstash.com/api/v1/utils/tow', body);
const sendTowEmail2 = (body: Body) => authPost('https://test.findparkstash.com/api/v1/utils/tow2', body);
const route = (route : string )=> API + route;
const route2 = (route : string )=> API2 + route;
 //User
 const auth = ()=> authGet(route("/v1/users/me"), false);
 const getUser = auth;

 //Password Forget
 const forgotPassword = (props: any) => post(route("/users/password/forgot"), props);
 const confirmEmail = (props: any) => post(route("/users/password/verify-forgot"), props);
 const resetPassword = (header: any, props: any) => customPost( route("/users/password/change"), header, props);

 const login = (props : any)=> post(route("/v1/login"), props);
 const signup = (props: any)=> post(route("/v1/signup"), props); 
 
//Enterpises
const selectEnterpise = (enterpriseId: string, userId: string)=> authPost(route(`/v1/enterprises/${enterpriseId}/users/${userId}/onboard/request`), {role: "member"}); 
const getEnterprises = ()=> authGet(route("/v1/enterprises"), false);
const getEnterpriseByUserId = (userId : string)=> authGet(route(`/v1/enterprises/search/by-user?userId=${userId}&fields=roles,capabilities`), false);
const getEnterprise = (eId : string)=> authGet(route(`/v1/enterprises/${eId}?fields=roles,capabilities`), false);
const getEnterpriseUsers = (eId : string, includeUnderCovers: boolean)=> authGet(route(`/v1/enterprises/${eId}/users?includeUnderCovers=${includeUnderCovers? 'true': 'false'}`));
const removeEnterpriseUser = (eid: string, userId : string)=> authPost(route(`/v1/enterprises/${eid}/users/${userId}/remove`),{});
const rejectEnterpriseUser = (eid: string, userId : string)=> authPost(route(`/v1/enterprises/${eid}/users/${userId}/onboard/reject`),{});
const acceptEnterpriseUser = (eid: string, userId : string)=> authPost(route(`/v1/enterprises/${eid}/users/${userId}/onboard/approve`), {});
const listMyScoreCardDescriptors = (eId: string, userId : string)=> authGet(route(`/v1/enterprises/scoreCardDescriptors?filter=user_specific&userId=${userId}&enterpriseId=${eId}`), false);
const listScoreCardDescriptors = ()=> authGet(route(`/v1/enterprises/scoreCardDescriptors`), false);
const getScoreCardValues = (eId: string, userId : string, scoreCards: string[])=> authGet(route(`/v1/enterprises/${eId}/users/${userId}/scoreCardValues?scoreCards=${scoreCards.join(',')}`), false);

//Roles
const addRole = (eid : string, role: EnterpriseRole)=> authPost(route(`/v1/enterprises/${eid}/roles`), role);
const editRole = (eid : string,role: EnterpriseRole)=> authPost(route(`/v1/enterprises/${eid}/roles/edit`),role);
const assignRole = (eid : string,role: string, assigneeId: string)=> authPost(route(`/v1/enterprises/${eid}/roles/assign`), { role, assigneeId });
const removeRole = (eid : string, role: string)=> authPost(route(`/v1/enterprises/${eid}/roles/remove`), { role });

 //Metrics
 const getTimeSeries = (eId: string, props:  any)=> authGet(route(`/v1/enterprises/${eId}/metrics/timeSeries?timeSeriesQuery=`+ JSON.stringify(props)));
 const getTimeSeriesMetricDescriptor = (eId: string, metricType:  string)=> authGet(route(`/v1/enterprises/${eId}/metrics/timeSeriesMetricDescriptors/${metricType}`));

 //Garages
 const getGarages = (eid: string)=> authGet(route(`/v1/enterprises/${eid}/garages`));
 const addGarage = (eid : string, garage: AddGarageModel)=> authPost(route(`/v1/enterprises/${eid}/garages`), garage);
 const editGarage = (eid : string, garageId: string, garage: UpdateGarageModel)=> authPost(route(`/v1/enterprises/${eid}/garages/${garageId}/edit`), garage);
  const removeGarage = (eid : string, garageId: string)=> authPost(route(`/v1/enterprises/${eid}/garages/${garageId}/remove`), {});
 //Occupancy Table
 const getOccupancyTables = (eId: string)=> authGet(route(`/v1/enterprises/${eId}/garageOccupancyTables`));
 const getOccupancyTableById = (eId: string, tId: string)=> authGet(route(`/v1/enterprises/${eId}/garageOccupancyTables/${tId}`), false);
 const addOccupancyTable = (eId: string, props: GarageOccupancyTable)=> authPost(route(`/v1/enterprises/${eId}/garageOccupancyTables`), props);
 const removeOccupancyTable = (eId: string,tId: string)=> authPost(route(`/v1/enterprises/${eId}/garageOccupancyTables/${tId}/remove`), {});
 const editOccupancyTable = (eId: string,tId: string, table: GarageOccupancyTable)=> authPost(route(`/v1/enterprises/${eId}/garageOccupancyTables/${tId}/edit`), table)

 //announcement
const getAnnoucements = (eid: string) => authGet(route(`/v1/enterprises/${eid}/announcements`));
const addAnnoucement = (eid: string, addBody : AddAnnouncement) => authPost(route(`/v1/enterprises/${eid}/announcements`), addBody);
const deleteAnnoucement = (eid : string, aid : string) => authPost(route(`/v1/enterprises/${eid}/announcements/${aid}/remove`), {});
const editAnnoucement = (eid : string, aid : string, editBody : EditAnnouncement) => authPost(route(`/v1/enterprises/${eid}/announcements/${aid}/edit`), editBody);

//Widgets
const getWidgets = (eId : string)=>authGet(route(`/v1/enterprises/${eId}/dashboards`), true);
const getScoreCardOptions = (eId : string, resource = undefined)=> authGet(route(`/v1/enterprises/${eId}/metrics/flatValueMetricDescriptors/${resource? `search/by-resourceType?resourceType=${resource}`: ""}`), false);
const getFlatValue = (eId: string, metrics: FlatValue.Query)=>authGet(route(`/v1/enterprises/${eId}/metrics/flatValue?flatValueQuery=` + JSON.stringify(metrics)), false)
const getFlatValueMetricDes = (eId: string, metrics: FlatValue.MetricDescriptor)=>authGet(route(`/v1/enterprises/${eId}/metrics/flatValueMetricDescriptors/` + metrics), false)
const downloadCSv = (eId : string, download: string, ts: string)=> authPost(route(`/v1/enterprises/${eId}/metrics/csv-export/${download}?${ts}`), {},false);

const getPastAbnormalityEvent = (eId: string)=> authGet(route(`/v1/enterprises/${eId}/garages/pastAbnormalEvents`), false);
const getAbnormalityEvent = (eId: string)=> authGet(route(`/v1/enterprises/${eId}/garages/activeAbnormalEvents`), false);
const getConfig = ()=> authGet(route(`/config`), false);

const uploadImage = (file: any)=> authUpload(route(`/v1/utils/uploadTempImages`), file);
const getImageUrl = (f: string)=> authGet(route(`/v1/utils/downloadTempImage/${f}`), false)
const getCapabilityDescriptors = ()=> authGet(route(`/v1/enterprises/capabilityDescriptors`), false);



 const getAllPermits = () => get(route2("/epermit/all"));
 const addEpermit = (epermit: Partial<RootPermit>) => post(route2("/epermit"), { epermit } , false);
 
 const resetEpermit = () => deleteReq(route2("/epermit/reset"));
 const addResidence = (epermit: Partial<RootPermit>, eId: string) => post(route2("/epermit/"+ eId), { epermit } , false);


 const customEmail = (to: string, info: UserInfo) => authPost(route2('/email'), {
  "from" :"ParkStash <important@findparkstash.com>",
   to,
  "subject": "ParkStash E-Permit Details",
  "html": getEmailTemplate(info)
});

const customSms = (to: string, info: UserInfo) => authPost(route2('/sms'), {
   to,
  "msg": getMessageTemplate(info)
});



export default {
  getGarages, getTimeSeries, addGarage, editGarage,
  auth, getUser, login, signup, getTimeSeriesMetricDescriptor,
  forgotPassword,confirmEmail, resetPassword, 
  selectEnterpise, getEnterprises, getEnterpriseByUserId, getEnterpriseUsers,
  removeEnterpriseUser, rejectEnterpriseUser, acceptEnterpriseUser,
  getAnnoucements, addAnnoucement, deleteAnnoucement, editAnnoucement,
  getWidgets, getScoreCardOptions,
  getFlatValue,  getFlatValueMetricDes, getEnterprise, removeGarage,
  getOccupancyTables, addOccupancyTable, removeOccupancyTable, editOccupancyTable, getOccupancyTableById,
  downloadCSv, getConfig,  getAbnormalityEvent, getPastAbnormalityEvent, uploadImage, getImageUrl, getCapabilityDescriptors,
  removeRole, editRole, assignRole, addRole, listMyScoreCardDescriptors, getScoreCardValues, listScoreCardDescriptors,
  
  getPlaces, sendTowEmail, sendTowEmail2,
  getAllPermits, addEpermit, addResidence, resetEpermit,
  customEmail, customSms
 }
