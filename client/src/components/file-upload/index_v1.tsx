import React from 'react';
import { Button, Loader } from 'platyplex_ui';


function uploadFile(file : any) {
  var url = `https://test.findparkstash.com/api/v1/utils/uploadTempImages`;
  var xhr = new XMLHttpRequest();
  var fd = new FormData();
  xhr.open('POST', url, true);

  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.setRequestHeader('os', 'web');
  xhr.setRequestHeader('authToken', 'alRWbklsMGFoTDo2MDFiNWZiNTEyMWMyMzNkNDgxZTAzYmQ6ZXlKaGJHY2lPaUpJVXpJMU5pSjkuT0RNMU9ra3hOVmsuSkxRWXBZeGx6NnEwdjl4aGZzUDhRYlRHYUlXelFWWlE5RTltUkw3cjBsMA==');
  
  fd.append('file', file);
  xhr.send(fd);
  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = function(e) {
      if (xhr.readyState == 4) {
        if (xhr.status < 200 || xhr.status > 299) return reject();
        else {
          var response = JSON.parse(xhr.responseText);
          resolve(response);
        }
      }
    };
  });
}

type State = { uploading: boolean, finished: boolean, onResult? : any }
type Props = {onResult : any}

export default class FileUpload extends React.Component<Props | any, State>{
  private inputRef : React.RefObject<HTMLInputElement> | any;
  constructor(props : Props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {uploading: false, finished: false};
  }

  onChange(event : any) {
    event.preventDefault()
    var file = event.target.files[0];
    this.setState({finished: false});
    if(file){
    this.setState({uploading: true, finished: false});
    uploadFile(file)
      .then((result : any)=> {
        this.setState({uploading: false, finished: true});
     
      })
      .catch(err => {
        this.setState({uploading: false});
      })
     }
  }

  openImagePicker(e) {
      e.preventDefault()
      this.inputRef?.current?.click();
  }

  render() {
    return (
      <>
        <input style={{ display: "none" }} type="file" name="file" onChange={this.onChange.bind(this)} ref={this.inputRef} />
        <Button shadow invert onClick={this.openImagePicker.bind(this)}>
        {this.state.uploading ?  <Loader.Spinner/> : <i className={this.state.finished ? 'fa fa-done' : 'fa fa-upload'} />}
          Upload
          </Button>
        {this.state.uploading ? <Loader.Spinner /> : null}

      </>
    )
  }
}