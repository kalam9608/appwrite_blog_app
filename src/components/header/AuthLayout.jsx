import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Protected({authentication=true,children}) {
    const navigate=useNavigate();
    const [loader,setLoader]=useState(true);
   //  const authStatus=useSelector((state)=>state.auth.status);
    const authStatus=true


    console.log("auth===>",authStatus)

    useEffect(()=>{
     if(authentication && authStatus !==authentication){
        navigate("/login")
     }else if(!authentication && authStatus !==authentication){
        navigate("/")
     }
     setLoader(false)
    },[])
  return loader?<h1>loading....</h1>:<>{children}</>
}

export default Protected
