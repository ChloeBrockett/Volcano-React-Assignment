import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap"
import jwt_decode from 'jwt-decode'
import { Navigate} from "react-router-dom";


function Header ({token,setToken, pages}){
    const [shouldRedirect,setShouldRedirect] = useState(false);
    //check token expiry by decoding
    //var decoded = jwt_decode(token)
    useEffect(() => {
        if (token){
            //check token expiry by decoding
            try {
                var decoded = jwt_decode(token)
            }catch (error){
                setToken ( null);
                alert("Your login token is erroneous. You will be logged out");
                setShouldRedirect(true);
            }
            if (  !(decoded.exp) || ( decoded.exp<=( Math.floor(Date.now()/1000))  )  ){
                setToken ( null);
                alert("Your login appears to have expired. For safety you will be logged out");
                setShouldRedirect(true);   
            }
        }else{
            setShouldRedirect(false)
        }

    },[token])

    if (shouldRedirect){
        return (<Navigate to="/Logout"/>)
    }


    return (
        <div className="row header">
            <Nav>
                {pages.map ((page)=> (
                    <NavItem key={page[0]}>
                        <NavLink tag = {Link} to = {page[1]} >
                            {page[0]}
                        </NavLink>
                    </NavItem>
                ))}
            </Nav>
        </div>
    )
  }

  export default Header