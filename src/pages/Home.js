import './CSS/home.css';

function Home (){
    return(
        <div className="row content">
            <div className="row content Hero">
                <h1>VolcMapr</h1>
                <h2>A Volcano Explorer by Chloe Brockett for CAB230</h2>
            </div>
            <div className="row content messages">
                <p>
                    This is a website made for CAB230: Web Computing. It was the first assignment for 2022. It uses React with a number
                    of component libraries and draws from an API provided by the school. The Volcano page displays a table of all the volcanoes for a given country 
                    using Reactstrap to create the form and AG Grid to create the table. 
                </p>
                <p>
                    Clicking a cell will display the location of the volcano on a world map (pigeon map) with some sample data about the particular Volcano. 
                    If the user is logged in, this page uses chartjs 2 with a wrapper to show the population around the volcano
                </p>
                <p>
                    The volcanoes dataset is collated by the Smithsonian Institution's <a className="RanomLink" href="https://volcano.si.edu/">Global Volcanism Program</a> and is publicly available
                </p>
                
            </div>
        </div>
    
    )
}


export default Home