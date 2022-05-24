
import React from "react"
const Input=(props)=>{

    const {id,label,onChange,help,type,initialValue,value}=props

    let inputClass="form-control"
    if(help){
        inputClass+=" is-invalid"
    }

    return(
        <>
            <div className='mb-2'>    
                <label htmlFor={id} className="form-label">{label}</label>
                <input 
                    id={id} 
                    type={type||'text'} 
                    name={id} 
                    className={inputClass} 
                    onChange={onChange}
                    defaultValue={initialValue}
                    value={value}
                    />
                {help  && <span className="invalid-feedback">{help}</span>}
            </div>
        </>
    )
}

export default Input;