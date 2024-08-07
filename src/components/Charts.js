import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Charts = ({ data }) => {
  const scatterOptions = {
    title: { text: 'Transaction Scatter Plot' },
    series: [{
      type: 'scatter',
      data: data.map(transaction => [transaction.date, transaction.amount]),
      marker: { radius: 5 }
    }]
  };

  const histogramOptions = {
    title: { text: 'Transaction Histogram' },
    xAxis: { title: { text: 'Amount' } },
    yAxis: { title: { text: 'Frequency' } },
    series: [{
      type: 'histogram',
      data: data.map(transaction => transaction.amount),
    }]
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={scatterOptions} />
      <HighchartsReact highcharts={Highcharts} options={histogramOptions} />
      {/* Agrega más gráficos aquí */}
    </div>
  );
};

export default Charts;