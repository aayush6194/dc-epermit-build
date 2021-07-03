

function header() {
    return { "Content-Type": "application/json", "web" : "jTVnIl0ahL" };
  }
  
  function authHeader() {
    let usertoken = localStorage.getItem('user') || "";
    return { "Content-Type": "application/json",usertoken, "web" : "jTVnIl0ahL"  };
  }
  
  
  function authUploadHeader() {
    let authtoken = localStorage.getItem('user') || "";
    return {  'content-type': 'multipart/form-data', token: authtoken };
  }

  function authCustomHeader(obj: Object) {
    return { "Content-Type": "application/json", ...obj};
  }
  
  
  export { header , authHeader, authUploadHeader, authCustomHeader };