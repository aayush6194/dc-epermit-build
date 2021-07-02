import { useState, useRef, useEffect } from "react";

export const useSize = () =>{
    const [width, setWidth] = useState(300);
    const container = useRef<any>(null);
    const resize = () => setWidth(container?.current?.clientWidth);
    useEffect(resize, [ container?.current?.clientWidth ]);
    useEffect(() => {
      window?.addEventListener("resize", resize);
      return () => window.removeEventListener("resize", resize);
    }, []);
  
    return {
       container,
       width
    };
  };