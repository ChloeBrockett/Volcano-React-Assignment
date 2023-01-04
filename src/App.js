
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect} from "react";
import './App.css';

//Components
import Header from "./components/Header";

//Pages
import Home from "./pages/Home";
import VolcList from "./pages/VolcList";
import Auth from "./pages/Auth";
import Logout from "./pages/Logout";



function App() {
  const [token,setToken] = useState(localStorage.getItem("token"))
    //array of pages. [[name of page,page path]]
    //page name appears on nav button 
  const [pages,setPages]=useState([]);
  useEffect (()=>{
    let pageArray = [
        ["Home","/"],
        ["Volcanoes","/VolcList"],
    ]

    if (token){
        pageArray.push(["Logout","/Logout"])
    }
    else{
        pageArray.push(["Login","/Auth"])
    }
    setPages(pageArray)
  },[token])

  return (

      <BrowserRouter>
        <div className="App">
          <Header token={token} setToken={setToken} pages={pages}/>
          {/* Content */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/VolcList" element={<VolcList token={token}/>} />
            <Route path="/Auth" element={<Auth setToken={setToken}/>}/>
            <Route path="/Logout" element ={<Logout setToken={setToken}/>}  />
          </Routes>
          

        </div>
      </BrowserRouter>

  );
}

export default App;
