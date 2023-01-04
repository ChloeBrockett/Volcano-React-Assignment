import {useEffect}from "react"


function Logout ({setToken}){
    localStorage.removeItem("token")
   
    useEffect (()=>{setToken(null)})
    
    return(
        <div className="row content">
            <p>Successfully logged out. You will no longer be able to access features requiring Authorisation</p>
        </div>
    )
}
export default Logout