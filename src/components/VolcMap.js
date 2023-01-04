import { Map, Marker } from "pigeon-maps"

function VolcMap (props){
    var lat = parseFloat(props.lat)
    var long = parseFloat(props.long)

    return (
        <div>
            <Map
                height = {400}
                width={400}
                defaultCenter= {[lat,long]}
                defaultZoom={4}
                >

                <Marker 
                        width={50}
                        anchor={[lat,long]} 
                        color={'red'} 
                    />
            </Map>
        </div>
    )
}

export default VolcMap