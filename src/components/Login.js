import AuthForm from "./AuthForm";

function doLogin(email,password,setMessage,setToken){
    const url = 'http://sefdb02.qut.edu.au:3001/user/login'
    return fetch (url, {
        method: "POST",
        headers: {accept: "application/json", "Content-Type":"application/json"},
        body: JSON.stringify({
            "email": email,
            "password": password
          })

 
        })
        .then(res =>{
            if (!res.ok){
                throw new Error (res.status)
            }else{
                setMessage("Login Successful")
                return (res.json())
            }
        })
        .then((res) => localStorage.setItem("token",res.token))
        .then(() => setToken(localStorage.getItem("token")))
        .catch ((e)=>{
            if (e.message==="401"){
                setMessage ("Invalid Username or Password")
            }else if (e.message==="400"){
                setMessage ("Both fields are mandatory")
            }else if (e.message == null){
                setMessage ("Network Error. If your connection is up, this means the API is down")
            }else{
                setMessage("Unknown error :( code: "+e.message)
            }

        })
}


function Login ({setToken}){
    return (<AuthForm Query = {doLogin} setToken = {setToken}/>)
}

export default Login