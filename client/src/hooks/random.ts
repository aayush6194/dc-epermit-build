import { useState  } from "react";

const generate  = (length : number) =>{
    let max : number = 123;
    let min : number = 97; 
    let temp : string = '';
  
    for( let i : number = 0; i < length; i++){
     let code: number =  Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.floor(min);
     temp += String.fromCharCode(code);
   }
    return temp;
  }
  
const useRandom = ({ number = 1})=> {  
    const generateRandom = (num : number)=>{
        const randoms = [];
        for(let i = 0; i < num; i++)
            randoms.push(generate(10));
        return randoms;
    }  
    const [ randoms ] = useState(generateRandom(number))

    return {
        randoms,
        random: randoms[0]
    };

}

export default useRandom;