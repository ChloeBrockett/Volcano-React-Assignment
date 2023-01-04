import AuthForm from "./AuthForm";

function doRegister (email,password,setMessage){
    const url = 'http://sefdb02.qut.edu.au:3001/user/register'
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
                setMessage("Registration successful. Please return to previous page to login")
            }
        })
        .catch ((e)=>{
            if (e.message==="409"){
                setMessage ("Username already exists")
            }else if (e.message==="400"){
                setMessage ("Both fields are mandatory")
            }else{
                setMessage("Unknown error :( code: "+e.message)
            }

        })
}

function Register (){
    return (<AuthForm Query = {doRegister}/>)
}

export default Register