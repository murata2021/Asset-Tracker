import React from "react";
import Spinner from "./Spinner";
const ButtonWithProgress=(props)=>{

    const {disabled,apiProgress,onClick,buttonType}=props;

    let buttonClass='btn btn-primary'
    if(buttonType){
        buttonClass=`btn btn-${buttonType}`
    }
    return (
        <>
            <button className={buttonClass} disabled={disabled || apiProgress} onClick={onClick}>
                {apiProgress&&<Spinner/>}
                {props.children}
            </button>
        </>
    )
}

export default ButtonWithProgress;