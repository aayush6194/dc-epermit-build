import React, { useState, useRef, useEffect } from "react";

import { Button, Grid } from "platyplex_ui";
import { message } from "antd";
import { overflow } from "../../utils/text";
import api from "../../api";

interface Props {
    style?: React.CSSProperties;
    text? : string;
    showFile?: boolean;
    setImages: (e: string)=> void;
}

const uploadFile = (file : any) => {
  const url = `https://test.findparkstash.com/api/v1/utils/uploadTempImages`;
  const xhr = new XMLHttpRequest();
  const fd = new FormData();
  xhr.open('POST', url, true);

  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.setRequestHeader('os', 'web');
  xhr.setRequestHeader('authToken', 'alRWbklsMGFoTDo2MDFiNWZiNTEyMWMyMzNkNDgxZTAzYmQ6ZXlKaGJHY2lPaUpJVXpJMU5pSjkuT0RNMU9ra3hOVmsuSkxRWXBZeGx6NnEwdjl4aGZzUDhRYlRHYUlXelFWWlE5RTltUkw3cjBsMA==');
  
  fd.append('file', file);
  xhr.send(fd);
  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = function(e) {
      if (xhr.readyState === 4) {
        if (xhr.status < 200 || xhr.status > 299) return reject();
        else {
          var response = JSON.parse(xhr.responseText);
          resolve(response);
        }
      }
    };
  });
}

const FileUpload = ({ style, text, showFile, setImages}: Props) => {
  const [state, setter] = useState({ uploaded: false, loading: false });

  const setState = (obj : any)=> setter({...state, ...obj})
  const ref = useRef<any>(null);
 
  const uploadClick = (e: any) => {
    e.preventDefault()
    console.log(ref.current)
   ref?.current?.click();
  };
  
 const onChange = (event : any) => {
    event.preventDefault()
    console.log(event)
    let file = event.target.files[0];
    setState({loading: true});
    if(file){
    setState({uploading: true });
    uploadFile(file)
      .then((result : any)=> {
        setState({uploading: false, loading: false});
        console.log(result)
        if(result.success){
          setImages(result.uploadResult[0]?.uploaded?.uploadedFilename)
        }
     
      })
      .catch(err => {
        setState({uploading: false, loading: false});
      })
     } else  setState({uploading: false, loading: false});
  }

  return (
    <>
      <Button
        invert
        shadow
        onClick={uploadClick}
        disabled={state.loading}
        style={{ ...style, ...{ placeSelf: "end" }, style }}
      >
        <i className="fa fa-upload" />
        {text}
      
      </Button>
   <input
   type="file"
   name="file"
   ref={ref}
   style={{ display: "none" }}
   onChange={(e)=>onChange(e)}
 />
 </>
  );
};

export default FileUpload;
