import { useRef } from "react";
import { message } from "antd";

const useCopy = () => {
    const ref = useRef<any>(null);

    const copy = (text: string, userMessage = "Link Copied") => {
        try {
            let tempInput = document.createElement("input");
            tempInput.value = text;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand("copy");
            document.body.removeChild(tempInput);
            
            message.success(userMessage);
        } catch (e) {
            window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
        }
    };

    return {
        ref,
        copy
    };
};


export default useCopy;
