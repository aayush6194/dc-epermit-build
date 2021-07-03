import { token } from "../config";


function header() {
  return {
    "Content-Type": "application/json",
    os: "web",
    usertoken: btoa(token),
  };
}

function authHeader() {
  let usertoken = localStorage.getItem('USER') || "eyJhbGciOiJIUzI1NiJ9.NjIxOj4sT0k.c3j0R8CkEylWI-NyfDBQj-4HUKQyY5b-xKagUac5By0";
  let userId = localStorage.getItem('ID') || "606139915fe8a02c7a9a5e2d";
  let authToken = btoa(`${token}:${userId}:${usertoken}`);
  return { "Content-Type": "application/json", authToken, os: "web" };
}

function authUploadHeader() {
  let usertoken = localStorage.getItem('USER') || "";
  let userId = localStorage.getItem('ID') || "";
  let authtoken = btoa(`${token}:${userId}:${usertoken}`);
  return { "content-type": "application/x-www-form-urlencoded", authtoken, os: "web" };
}

export { header, authHeader, authUploadHeader };
