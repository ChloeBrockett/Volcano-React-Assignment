
import { useState, useEffect} from "react"

import VolcMap from "./VolcMap";
import DensityChart from "./DensityChart";

import './CSS/VolcData.css'

function useVolcanoQuery(volcID,token){
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [error, setError] = useState (null)

    useEffect(() => {
        let url = (`http://sefdb02.qut.edu.au:3001/volcano/${volcID}`)

        //if a token is present, send it to get auth only data
        let heads ={}
        if (token){
            heads={Authorization: `Bearer ${token}`}
        }

        fetch(url,{
            headers: heads
        })
        .then ((res)=> {
            if (!res.ok){
                throw Error(res.status);
            }else{
                return res
            }
        })
        .then(result => result.json())
        .then(data => {
            setData(data)
        })
        .catch ((e)=> {
            setError(e)
        })
        .finally(()=> {
            setLoading(false)
        })
        
    }, [volcID]);

    return {loading, data,error}
}

function VolcData ({volcID, country, token}){

    const {loading,data,error}=useVolcanoQuery(volcID,token);
    
    if (loading){
        return <p>Loading</p>
    } 
    if (error){
        if (error.message==="400"){
            return <p>Query parameters not accepted</p>
        } else if (error.message==="401"){
            return <p>Invalid Auth Token. Try logging out and in</p>
        } else if (error.message == null){
            return <p>Network Error. If your connection is up, this means the API is down</p>
        } else {
            return <p>Unknown error :( code: {error.message}</p>
        }   
    }
    //For this particular data, if and only if a token is given, request will also return
    //population stats for the volcano. if this data is given, put it into an array to pass
    //the charting component 
    let densityArray =null;
    //if there is population density, prepare the data for the component 
    if (data.population_10km){
        densityArray=[
            ["5km",data.population_5km],
            ["10km",data.population_10km],
            ["30km",data.population_30km],
            ["100km",data.population_100km]
        ]
    }
    return (
        <div className="wrapper" >
            
            <div className="row1">
                <div className="dataContainer">
                    <h3>{data.name}</h3>
                    <p>Country: {country}</p>
                    <p>Region: {data.region}</p>
                    <p>Subregion: {data.subregion}</p>
                    <p>Summit (m): {data.summit}</p>
                    <p>Elevation (ft): {data.elevation}</p>
                    <p>Last Eruption: {data.last_eruption}</p>
                </div> 
                <div className="mapContainer">
                    <VolcMap long = {data.longitude} lat = {data.latitude}/> 
                </div>     
            </div>
            <div className="row2">
                <DensityChart densityArray={densityArray}/>
            </div>
        </div>
    )
}

export default VolcData