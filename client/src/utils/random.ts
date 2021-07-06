export const random  = (length : number, number = false) =>{
    let max : number = 123; //ascii for 'z'
    let min : number = 97; //ascii for 'a'
    let temp : string = '';
  
    for( let i : number = 0; i < length; i++){
     let code: number =  Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.floor(min);
     temp += String.fromCharCode(code);
   }
    return temp.toUpperCase();
  }
  
  export default random;