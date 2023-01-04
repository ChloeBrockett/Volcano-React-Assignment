
import { AgGridReact } from 'ag-grid-react';
import {useState, useEffect, useCallback}from "react";

import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css'; // Optional theme CSS

function useVolcanoesQuery(country,popFilter) {
    const [loading, setLoading] = useState(true)
    const [rowData, setRowData] = useState([])
    const [error, setError] = useState (null)

    useEffect(() => {
        setError(null)
        var url = `http://sefdb02.qut.edu.au:3001/volcanoes?country=${country}`
        if (popFilter != ""){
            url = `http://sefdb02.qut.edu.au:3001/volcanoes?country=${country}&populatedWithin=${popFilter}`
        }
        fetch(url)
        .then ((res)=> {
            if (!res.ok){
                throw Error(res.status);
            }else{
                return res
            }
        })
        .then(result => result.json())
        .then(rowData => setRowData(rowData))
        .catch ((e)=> {
            setError(e)
        })
        .finally(()=> {
            setLoading(false)
        })
        
    }, [country,popFilter]);

    return {loading, rowData,error}

}

function VolcGrid ({SelectedCountry,PopFilter, setLastClickedVolcID, setDisplayVolcanoStats}){

    const [columnDefs] = useState([
        { field: 'name',sortable: true, filter:true},
        { field: 'region',sortable: true, filter:true},
        { field: 'subregion',sortable: true, filter:true},
    ])

    const cellClickedListener = useCallback( event => {
        setLastClickedVolcID(event.data.id)
        setDisplayVolcanoStats(true)
      }, []);
     

    const {loading,rowData,error}=useVolcanoesQuery(SelectedCountry,PopFilter);
    
    
    if (SelectedCountry===""){
        return <p>no country selected</p>
    }
    if (loading){
        return <p>loading</p>
    }
    
    if (error){
        if (error.message==="400"){
            return <p>Query parameters not accepted</p>
        } else if (error.message == null){
            return <p>Network Error. If your connection is up, this means the API is down</p>
        } else {
            return <p>Unknown error :( code: {error.message}</p>
        }   
    }

    return (
        <div className="row content" id="volcanoGrid">
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                onCellClicked={cellClickedListener}
                pagination={true}
                paginationAutoPageSize={true}
                className="ag-theme-alpine-dark"
            />

    </div>
    )
    
    
}

export default VolcGrid