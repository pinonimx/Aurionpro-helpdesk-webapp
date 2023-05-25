import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import { Bar } from "react-chartjs-2";

  
function BarChart ({ chartData, header, axis, legend }) {
  return (
      <Bar
        data={chartData}
        options={{
          indexAxis: axis ? 'y' : 'x',
          plugins: {
            title: {
              display: true,
              text: header
            },
            legend: {
              display: legend
            },
          },
          responsive: true,
          interaction: {
            intersect: false,
          },
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true
            }
          }
        }}
      />
  );
}
Chart.register(CategoryScale);
export default function Graph(props) {

  const dataset = [
    {
      axis: props.axis ? 'y' : 'x',
      label: "Tickets ",
      data: props.data,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }
  ];
  const stackeddatasets = [
    {
      label: 'Unresolved',
      data: props.data.map((data) => {return(data[0])}),
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      stack: 'Stack 0',
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 1
    },
    {
      label: 'Resolved',
      data: props.data.map((data) => {return(data[1])}),
      backgroundColor: 'rgba(255, 159, 64, 0.2)',
      stack: 'Stack 0',
      borderColor: 'rgb(255, 159, 64)',
      borderWidth: 1
    },
  ];
  const [chartData, setChartData] = useState({
    labels: props.labels, 
    datasets: props.stacked ? stackeddatasets : dataset,
  });
  return (
    <BarChart chartData={chartData} header={props.header} axis={props.axis} legend={props.stacked ? true : false}/>
  );
}