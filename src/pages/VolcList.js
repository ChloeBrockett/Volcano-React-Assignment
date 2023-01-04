import {useState,}from "react";
import { Button } from "reactstrap"

import CountrySelector from "../components/CountrySelector";
import VolcGrid from "../components/VolcGrid"
import VolcData from "../components/VolcData"



import './CSS/VolcList.css';


function VolcPage (props){
    //State for the currently selected country and populated within from the form 
    const [currentCountry, setCurrentCountry] = useState("");
    const [popFilter,setPopFilter]=useState("");
    //a "switch" variable for displaying a table of all volcanoes for a country, or indepth info on just the 1. 
    const [displayVolcanoStats, setDisplayVolcanoStats] = useState(false);
    const [lastClickedVolcId, setLastClickedVolcID] =useState();

    if (displayVolcanoStats){
        return (
            <div className="row content">
                <div className="mapHeader">
                    <h2>Volcano Data</h2>
                    <Button onClick = {() =>setDisplayVolcanoStats(false)} id='return'>Return</Button>
                </div>
                <div className="">
                    <VolcData volcID = {lastClickedVolcId}
                        country = {currentCountry}
                        token = {props.token}
                    />
                </div>
            </div>
        )
    }else{
        return (
            <div className="row content">
                <CountrySelector 
                    setParentSelectedCountry={setCurrentCountry}
                    setParentPopFilter={setPopFilter}
                />
                <VolcGrid 
                    SelectedCountry = {currentCountry}
                    PopFilter = {popFilter}
                    setLastClickedVolcID = {setLastClickedVolcID}
                    setDisplayVolcanoStats = {setDisplayVolcanoStats}
                />
            </div>
        )
    }

}

export default VolcPage
