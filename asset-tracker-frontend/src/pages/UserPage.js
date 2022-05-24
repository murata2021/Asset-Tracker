
import { useParams } from "react-router-dom";
import { getUserById } from "../api/apiCalls";
import { useEffect,useState } from "react";
import ProfileCard from "../components/UserProfileCard";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";
import { useSelector } from "react-redux";



const UserPage=(props)=>{

    const params=useParams()
    const auth = useSelector((store) => store);


    const [user,setUser] =useState({})
    const [pendingApiCall,setPendingApiCall]=useState(false)
    const [failedResponse,setFailedResponse]=useState()

    const [isLoaded,setIsLoaded]=useState(true)

    useEffect(()=>{
        let isMounted=true
        async function loadUserById(){
            setPendingApiCall(true)
            try{
                const response=await getUserById(auth.companyId,params.userId)
                setUser((user)=>({...response.data}))
            }
            catch(error){
                setFailedResponse({failResponse:error.response.data.message})
            }
            setPendingApiCall(false)
        }
        if (isMounted && isLoaded) loadUserById()
        setIsLoaded(false)


        return (()=>isMounted=false)
            
    },[params.userId,isLoaded])

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
            content=<ProfileCard user={user} setIsEditted={setIsLoaded}/>
        }

    }
    return(
        <div data-testid='user-page'>
            {content}
        </div>
    )
}

export default UserPage;