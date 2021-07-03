import React, { useState } from "react";
import { Input } from "antd";
import { disabledTxtColor, primaryColor } from "../../config";
import { Text } from "platyplex_ui";

const PasswordInput = (props: any) => {
  const [hide, setHide] = useState(props.type === "password");
  return (
    <>
    <Input
      className='focus'
      {...props}
      type={hide ? "password" : "text"}
      suffix={
        props.type !== "password"? null :
        hide ? (
          <i className="fa fa-eye" onClick={() => setHide(false)}></i>
        ) : (
          <i className="fa fa-eye-slash" onClick={() => setHide(true)}></i>
        )
      }
    />
    <Text color={disabledTxtColor} style={{fontSize: '.8em'}} 
      className={props.type !== "password"? 'focus-show': ''}>{props.error}
    </Text>
    </>
  );
};

export default PasswordInput;