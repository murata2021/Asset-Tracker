
import { useParams } from "react-router-dom";
import { getCompanyById} from "../api/apiCalls";
import { useEffect,useState } from "react";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";
import { useSelector } from "react-redux";
import CompanyProfileCard from "../components/CompanyProfileCard";



const CompanyPage=(props)=>{

    const params=useParams()
    const auth = useSelector((store) => store);


    const [company,setCompany] =useState({})
    const [pendingApiCall,setPendingApiCall]=useState(false)
    const [failedResponse,setFailedResponse]=useState()

    const [isLoaded,setIsLoaded]=useState(true)

    useEffect(()=>{
        let isMounted=true
        async function loadCompany(){
            setPendingApiCall(true)
            try{
                const response=await getCompanyById(auth.companyId)
                setCompany((company)=>({...response.data}))
            }
            catch(error){
                setFailedResponse({failResponse:error.response.data.message})
            }
            setPendingApiCall(false)
        }
        if (isMounted && isLoaded) loadCompany()
        setIsLoaded(false)


        return (()=>isMounted=false)
            
    },[auth.companyId,isLoaded])

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
            content=<CompanyProfileCard company={company} setIsEditted={setIsLoaded}/>
        }

    }
    return(
        <div data-testid='user-page'>
            {content}
        </div>
    )
}

export default CompanyPage;
