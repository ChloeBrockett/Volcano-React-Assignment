import {useEffect, useState}from "react";
import { Button,FormGroup,Input,Label } from "reactstrap"

import './CSS/AuthForm.css';

function AuthForm (props){
    //Should the submit button be disabled? By default yes because the fields (should) start empty
    const [btnDisable, setBtnDisable] = useState(true);
    
    //States for controlling inputs
    const [email,setEmail] = useState("");
    const [emailInvalid,setEmailInvalid]=useState(true)
    const [password,setPassword] = useState("");
    const [passwordInvalid,setPasswordInvalid]=useState(true)
    
    //state variables for giving the user feedback on form submission
    const [message,setMessage]=useState("Please enter your details into the form")
    
    //Is email invalid?
    useEffect (()=> {
        //Can later extend with regex verification of valid email
        if (email ===""){
            setEmailInvalid(true)
        }else{
            setEmailInvalid(false)
        }
    },[email])
    //Is password valid
    useEffect (()=> {
        //Can later extend with regex verification of valid password
        if (password ===""){
            setPasswordInvalid(true)
        }else{
            setPasswordInvalid(false)
        }
    },[password])
    //If the fields are invalid, disable the submit button 
    useEffect (()=>{
        
        if (emailInvalid || passwordInvalid){
            setBtnDisable(true)
        }
        else{
            setBtnDisable(false)
        }
    },[emailInvalid,passwordInvalid,email,password])


    return (
        
        <FormGroup>
            <Label>{message}</Label>
            <Input
                id="email"
                name="email"
                placeholder="Email"
                type="email"
                value = {email}
                invalid ={emailInvalid}
                onChange = {event => {setEmail(event.target.value)}}
            />
            <Input 
                id="password"
                name="password"
                placeholder="Password"
                type="password"
                value = {password}
                invalid = {passwordInvalid}
                onChange = {event => {setPassword(event.target.value)}}
            />


            <Button 
                onClick={() =>{
                    setBtnDisable(true)
                    props.Query(email,password,setMessage,props.setToken)
                    }}
                disabled={btnDisable}
            >
                Submit
            </Button>


        </FormGroup>
        
    )
}

export default AuthForm