import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HistogramModule from 'highcharts/modules/histogram-bellcurve';
import moment from 'moment';

// Inicializa el módulo
HistogramModule(Highcharts);

const EnhancedCharts = ({ data, view }) => {
  const calculateStatistics = (data) => {
    const amounts = data.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, curr) => acc + curr, 0);
    const mean = total / amounts.length;

    const mode = amounts.sort((a, b) =>
      amounts.filter(v => v === a).length
      - amounts.filter(v => v === b).length
    ).pop();

    return { mean, mode };
  };

  const { mean, mode } = calculateStatistics(data);

  const scatterOptions = {
    chart: { type: 'scatter' },
    title: { text: 'Transaction Scatter Plot' },
    xAxis: {
      type: 'datetime',
      title: { text: 'Date' }
    },
    yAxis: { title: { text: 'Amount' } },
    series: [{
      data: data.map(transaction => ({
        x: new Date(transaction.date).getTime(),
        y: transaction.amount,
        marker: {
          radius: Math.sqrt(transaction.amount) / 10,
          fillColor: transaction.type === 'income' ? 'green' : 'red',
          symbol: transaction.type === 'income' ? 'circle' : 'diamond'
        }
      })),
      type: 'scatter'
    }]
  };

  const histogramOptions = {
    chart: { type: 'column' },
    title: { text: 'Transaction Histogram' },
    xAxis: {
      title: { text: 'Amount' }
    },
    yAxis: {
      title: { text: 'Frequency' }
    },
    series: [{
      type: 'histogram',
      baseSeries: 1,
      zIndex: -1
    }, {
      name: 'Data',
      type: 'column',
      data: data.map(transaction => transaction.amount),
      visible: false
    }]
  };

  const lineChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Transaction Line Chart' },
    xAxis: { 
      title: { text: 'Date' },
      categories: data.map(transaction => moment(transaction.date).format('YYYY-MM-DD'))
    },
    yAxis: { title: { text: 'Amount' } },
    series: [{
      type: 'line',
      data: data.map(transaction => transaction.amount)
    }]
  };

  return (
    <div>
      <div>
        <p>Mean: {mean}</p>
        <p>Mode: {mode}</p>
      </div>

      {view === 'scatter' && <HighchartsReact highcharts={Highcharts} options={scatterOptions} />}
      {view === 'histogram' && <HighchartsReact highcharts={Highcharts} options={histogramOptions} />}
      {view === 'lineChart' && <HighchartsReact highcharts={Highcharts} options={lineChartOptions} />}
    </div>
  );
};

export default EnhancedCharts;
