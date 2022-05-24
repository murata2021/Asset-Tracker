
import { useParams } from "react-router-dom";
import { getVendorById } from "../api/apiCalls";
import { useEffect,useState } from "react";
import VendorProfileCard from "../components/VendorProfileCard";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";
import { useSelector } from "react-redux";



const VendorPage=(props)=>{

    const params=useParams()
    const auth = useSelector((store) => store);


    const [vendor,setVendor] =useState({})
    const [pendingApiCall,setPendingApiCall]=useState(false)
    const [failedResponse,setFailedResponse]=useState()

    const [isLoaded,setIsLoaded]=useState(true)

    useEffect(()=>{
        let isMounted=true
        async function loadVendorById(){
            setPendingApiCall(true)
            try{
                const response=await getVendorById(auth.companyId,params.vendorId)
                setVendor((vendor)=>({...response.data}))
            }
            catch(error){
                setFailedResponse({failResponse:error.response.data.message})
            }
            setPendingApiCall(false)
        }
        if (isMounted && isLoaded) loadVendorById()
        setIsLoaded(false)


        return (()=>isMounted=false)
            
    },[params.vendorId,isLoaded])

    let content=(
        <Alert type='secondary' center>
            <Spinner size='big'/>
        </Alert>
    )

    if(!pendingApiCall){
        if(failedResponse){
            content=<Alert type='danger' center>{failedResponse.failResponse}</Alert>
        }
        else{
            content=<VendorProfileCard vendor={vendor} setIsEditted={setIsLoaded}/>
        }

    }
    return(
        <div data-testid='vendor-page'>
            {content}
        </div>
    )
}

export default VendorPage;