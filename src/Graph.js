import React from 'react';
import Chart from 'chart.js/auto';

export default class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
    }
    


    buildChart() {
        const {chartData, chartLabels, chartTitle } = this.props.chart

        const chartRef = this.chartRef.current.getContext('2d');

        if (typeof this.chart !== 'undefined') {
            this.chart.destroy();
        }

        this.chart = new Chart(this.chartRef.current.getContext("2d"), {
            type: 'line',
            data: {
                labels: chartLabels,
                datasets: [
                    {
                        label: chartTitle,
                        data: chartData,
                        fill: false,
                        tension: 0,
                    }
                ]
            },
            options: {
                responsive: true,
                aspectRatio: 1,

            }
        })
    }
    
    componentDidMount() {
        this.buildChart()
    }
    componentDidUpdate(prevProps, prevState) {
        this.buildChart();
    }

    render() {  
        const {base, convertTo} = this.props.titles;
        return (
            <div id="graph" className="functionContainer"> 
                <h1 className="title graphTitle"><span className="fontColorChoice">{base}</span> to <span className="fontColorChoice">{convertTo}</span> Graph</h1>
                <div className="graph">
                    <canvas ref={this.chartRef} />
                </div>
            </div>
        )
    }
}