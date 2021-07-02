
import { post, authGet, authPost, customPost, authUpload } from './request';
import { API, googleAPIKey  } from '../config'
import { EditAnnouncement, AddAnnouncement } from '../model/domain/announcements';
import { Garage, UpdateGarageModel, GarageOccupancyTable, AddGarageModel } from '../model/domain/garage';
import { FlatValue, TimeSeries } from '../model/domain/metrics';
import { EnterpriseRole } from '../model/domain/enterprise';
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
const sendEmail = (body: Body) => authPost('https://test.findparkstash.com/api/v1/utils/notifyDC', body);
const sendTowEmail = (body: Body) => authPost('https://test.findparkstash.com/api/v1/utils/tow', body);
const sendTowEmail2 = (body: Body) => authPost('https://test.findparkstash.com/api/v1/utils/tow2', body);
const route = (route : string )=> API + route;

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
  sendEmail,
  getPlaces, sendTowEmail, sendTowEmail2
 }
