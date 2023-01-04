import { Button,Dropdown, 
        DropdownItem, 
        DropdownMenu,
        DropdownToggle, 
        Form, 
        FormGroup, 
        Input,
        Label,
    } from 'reactstrap';
import {useState, useEffect}from "react";


function CountryQuery(){
    var url = "http://sefdb02.qut.edu.au:3001/countries"
    return fetch (url)
    .then ((res) => res.json())
}

function useCountriesQuery () {
    const [loading, setLoading] = useState(true)
    const [countries, setCountries] = useState([])
    const [error, setError] = useState (null)
    useEffect (() => {
            CountryQuery()
            .then((res)=>{
                setCountries(res)
            })
            .catch((e)=> {
                setError(e);
            })
            .finally(() => {
                setLoading(false);
            })


        },[])

    return {
        loading,
        countries,
        error,
    };
}


function CountrySelector ( {setParentSelectedCountry,setParentPopFilter}){
    //States for the request to get the list of countries
    //And correctly display components and data   
    const {loading,countries,error}=useCountriesQuery();
    const [prunedCountries,setPrunnedCountries]=useState(countries);
    const [innerSearch, setInnerSearch]=useState("");
    const [innerSelect,setInnerSelect]=useState("")
    const [isOpen,setIsOpen]=useState(false);

    
    //effect hook call for only populating dropdown with countries that match the search
    useEffect(()=>{     
        setPrunnedCountries(
            countries.filter((country)=>{
                if (country.toLowerCase().includes(innerSearch.toLowerCase())){
                    return country
                }
            })
        )
    },[innerSearch,countries])

    //if loading or error, display relevant message
    if (loading ){
        return (
            <p> loading</p>
        )       
    }

    if (error){
        return (
            <p> error: {error.message}</p>
        )       
    }
    //If there are countries loaded
    
    if (countries.length>0){
        return (
            <div>
                <h2>Volcano Explorer</h2>
                <p>Select a country to view volcanoes. Click table row to learn more</p>
                <Form
                    onSubmit ={(e)=>{
                        e.preventDefault()
                        setParentSelectedCountry(innerSearch)
                        setParentPopFilter(innerSelect)
                    }}
                >
                    <FormGroup className="countrySelect" >
                        <Label className="formItem" >Search Country</Label>
                        <Dropdown 
                            toggle = {()=> setIsOpen(!isOpen)} 
                            isOpen = {isOpen}
                            className="formItem"
                        >
                            <DropdownToggle id="toggleButton">
                                <Input
                                    name = "search"
                                    id="search"
                                    type="search"
                                    value={innerSearch}
                                    onChange={(e)=>setInnerSearch(e.target.value)}
                                />
                            </DropdownToggle>

                            <DropdownMenu id="dropdownMenu">
                                {prunedCountries.map ((country) => 
                                    (<DropdownItem 
                                            key={country} 
                                            onClick={()=>setInnerSearch(country)}>
                                        {country}
                                    </DropdownItem>)
                                )}   
                            </DropdownMenu>
                        </Dropdown>
                        
                        <Label className="formItem">Populated Within:</Label>
                        <Input
                            type="select"
                            name='select'
                            id="select"
                            className="formItem"
                        >
                            <option onClick={()=>setInnerSelect("") }>--</option>
                            <option onClick={()=>setInnerSelect("5km")}>5km</option>
                            <option onClick={()=>setInnerSelect("10km")}>10km</option>
                            <option onClick={()=>setInnerSelect("30km")}>30km</option>
                            <option onClick={()=>setInnerSelect("100km")}>100km</option>
                        </Input>

                        <Button id="search-button" className="formItem">
                            Search
                        </Button>

                    </FormGroup>
                </Form>
    
            </div >



        )
    } else {
        return <p>There has been an error loading countries</p>
    }

}  
export default CountrySelector