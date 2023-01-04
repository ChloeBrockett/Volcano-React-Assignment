import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    } from 'chart.js';


function DensityChart ({densityArray}){

    if (!densityArray){
        return
    }
    const options = {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Chart.js Bar Chart',
                },
            },
        }
    ChartJS.register(
            CategoryScale,
            LinearScale,
            BarElement,
            Title,
            Tooltip,
        ) 
    const labels = densityArray.map ((data) => data[0]);
    const data = {
        labels,
        datasets: [
                {
                    id: 1,
                    label: 'Population',
                    data: densityArray.map ((data) => data[1]),
                    backgroundColor: 'rgba(236, 92, 70, 0.5)',
                },
            ],
        };
    return (
        <Bar id="barchart" datasetIdKey='id' options={options} data={data} />
    )
}

export default DensityChart