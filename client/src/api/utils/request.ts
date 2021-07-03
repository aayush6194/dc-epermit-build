import { authHeader , header  } from './header';
const delay = (f: any) => new Promise(resolve => setTimeout(resolve, f));

const DELAY = 800; 

const delayedResponse = async (response: any) => {
  await delay(DELAY)
  return response.json()
};

const response = (res: any) => res.json()

function post(url: string, body: object, useDelay = true) {
  return fetch(url, { method: 'POST', headers: header(), body: JSON.stringify(body) })
    .then(useDelay? delayedResponse: response);
}

function get(url: string, useDelay = true) {
  return fetch(url, { method: 'GET', headers: header() })
  .then(useDelay? delayedResponse: response);
}

function authGet(url: string,  useDelay = true, query = {} ){
  return fetch(url, { method: 'GET', headers: authHeader(), ...query })
  .then(useDelay? delayedResponse: response);
}

function authCustom(url: string, header: any, useDelay = true){
  return fetch(url, { method: 'GET', headers: header} )
  .then(useDelay? delayedResponse: response);
}

function authDelete(url: string, body = undefined, useDelay = true){
  return fetch(`${url}`, { method: 'DELETE', headers: authHeader(), ...body?{body: JSON.stringify(body)}: {} } )
  .then(useDelay? delayedResponse: response);
}

function authDeleteBody(url: string, body: any, useDelay = true){
  return fetch(`${url}`, { method: 'DELETE', headers: authHeader(), body: JSON.stringify(body)} )
  .then(useDelay? delayedResponse: response);
}

function customPost(url: string, header: any, body: object, useDelay = true) {
  return fetch(url, { method: 'POST', headers: {"Content-Type": "application/json", ...header} , body: JSON.stringify(body) })
  .then(useDelay? delayedResponse: response);
}

function authPost(url : string, body : any, useDelay = true) {
  return fetch(url, { method: 'POST', headers: authHeader(), body: JSON.stringify(body) })
  .then(useDelay? delayedResponse: response);
}


function postFormData(url : string, body : any, useDelay = true) {
  return fetch(url, { method: 'POST',   headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }, body })
  .then(useDelay? delayedResponse: response);
}

function authPut(url : string, body : any, useDelay = true) {
  return fetch(url, { method: 'PUT', headers: authHeader(), body: JSON.stringify(body) })
  .then(response);
}

function authGetQuery(url: string, query : string){
  return fetch(`${url}/?${query}`, { method: 'GET', headers: authHeader() })
    .then((response : any) => response.json());
}

function authGetParams(url: string, param : string){
  return fetch(`${url}/${param}`, { method: 'GET', headers: authHeader() })
    .then((response : any) => response.json());
}

function authUpload(url : string, file : any) {
  return fetch(url, { method: 'POST', body: file })
  .then((response : any) => response.json());
}


export { get, authGet, post, authPost, authPut, customPost, authCustom, authGetParams, authGetQuery, authUpload, authDelete, authDeleteBody, postFormData };