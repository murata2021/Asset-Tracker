// import SecureLS from "secure-ls"

// const ls = new SecureLS();

const setItem=(key,value)=>{
    // ls.set(key,value);
    localStorage.setItem(key,JSON.stringify(value))
}

const getItem=(key)=>{
    // return ls.get(key)
    return JSON.parse(localStorage.getItem(key))
}


const clear=()=>{
    localStorage.clear()
}


const storage={setItem,getItem,clear}

export default storage;