const useStorage = (key : string)=> {    
      const loadData = () => localStorage?.getItem(key); 
      const saveData = (data : string) => localStorage.setItem(key, data); 
      const  removeData = () => localStorage.removeItem(key);

      return {
          loadData, saveData, removeData
      }

}

export default useStorage;