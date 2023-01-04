import { useState}from "react";
import { Button, Form, Label, FormGroup} from "reactstrap"

import Register from "../components/Register"
import Login from "../components/Login"

import './CSS/Auth.css';

function Auth ({setToken}){
    const [registering,setRegistering] = useState(false);
    //Even though the register and login pages and endpoints are very similar
    //I have chosen to have them swap like this because in future they may not be
    //For now they both use the same form just to demonstrate I am capable of reusing
    //components 
    if (registering){
        return (
            <div className="row auth">
                <Form>    
                    <FormGroup>
                        <h2>Register:</h2>
                    </FormGroup>
                    <FormGroup id="row2">
                        <Label id="regLabel">To Login:</Label>
                        <Button id="setAuth" onClick ={()=>setRegistering(!registering)} >Back</Button>
                    </FormGroup>
                    <FormGroup>
                        <Register/>
                    </FormGroup>
                </Form>
            </div>
        )
    } else{
        return (
            <div className="row auth">
                <Form>
                    <FormGroup>
                    <h2>Login:</h2>
                    </FormGroup>
                    <FormGroup id="row2">
                        <Label id="regLabel">To Register:</Label>
                        <Button id="setAuth" onClick ={()=>setRegistering(!registering)} >Register</Button>
                    </FormGroup>
                    <FormGroup>
                        <Login setToken={setToken}/>
                    </FormGroup>
                </Form>
            </div>
        )
    }
    

}

export default Auth