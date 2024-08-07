import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HistogramModule from 'highcharts/modules/histogram-bellcurve';

HistogramModule(Highcharts);

const Charts = ({ data }) => {
  // Opciones para el Scatter Plot
  const scatterOptions = {
    title: { text: 'Transaction Scatter Plot' },
    series: [{
      type: 'scatter',
      data: data.map(transaction => [transaction.date, transaction.amount]),
      marker: { radius: 5 }
    }]
  };

  // Opciones para el Histograma
  const histogramOptions = {
    title: { text: 'Transaction Histogram' },
    xAxis: { title: { text: 'Amount' } },
    yAxis: { title: { text: 'Frequency' } },
    series: [{
      type: 'histogram',
      data: data.map(transaction => transaction.amount),
    }]
  };

  // Opciones para la Gráfica de Líneas
  const lineChartOptions = {
    title: { text: 'Transaction Line Chart' },
    xAxis: { 
      title: { text: 'Date' },
      categories: data.map(transaction => transaction.date)
    },
    yAxis: { title: { text: 'Amount' } },
    series: [{
      type: 'line',
      data: data.map(transaction => transaction.amount),
    }]
  };

  // Opciones para la Gráfica de Barras
  const barChartOptions = {
    title: { text: 'Transaction Bar Chart' },
    xAxis: { 
      title: { text: 'Date' },
      categories: data.map(transaction => transaction.date)
    },
    yAxis: { title: { text: 'Amount' } },
    series: [{
      type: 'column',
      data: data.map(transaction => transaction.amount),
    }]
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={scatterOptions} />
      <HighchartsReact highcharts={Highcharts} options={histogramOptions} />
      <HighchartsReact highcharts={Highcharts} options={lineChartOptions} />
      <HighchartsReact highcharts={Highcharts} options={barChartOptions} />
    </div>
  );
};

export default Charts;