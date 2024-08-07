import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more'; // Importar el módulo necesario
import Histogram from 'highcharts/modules/histogram-bellcurve'; // Importar el módulo de histograma

// Registrar los módulos
HighchartsMore(Highcharts);
Histogram(Highcharts);

const EnhancedCharts = ({ data, view }) => {
  const scatterOptions = {
    title: { text: 'Transaction Scatter Plot' },
    subtitle: { text: 'Visualización de transacciones por monto y fecha' },
    xAxis: {
      title: { text: 'Fecha' },
      labels: {
        format: '{value:%Y-%m-%d}',
      }
    },
    yAxis: {
      title: { text: 'Monto' },
      labels: {
        format: "${value}",
      }
    },
    tooltip: {
      formatter: function () {
        return `Fecha: ${this.x}<br>Monto: ${this.y}`;
      }
    },
    series: [{
      type: 'scatter',
      data: data.map(transaction => [transaction.date, transaction.amount]),
      marker: {
        radius: 5,
        fillColor: 'rgba(0, 255, 0, 0.5)',
      },
      color: '#ff6347',
    }],
    plotOptions: {
      scatter: {
        animation: {
          duration: 1000,
        }
      }
    },
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

  const lineOptions = {
    title: { text: 'Transaction Line Chart' },
    xAxis: {
      title: { text: 'Date' },
      categories: data.map(transaction => transaction.date),
    },
    yAxis: {
      title: { text: 'Amount' },
      labels: {
        format: "${value}",
      }
    },
    tooltip: {
      shared: true,
      useHTML: true,
      formatter: function () {
        let tooltip = `<b>${this.x}</b><br>`;
        this.points.forEach(point => {
          tooltip += `${point.series.name}: ${point.y}<br>`;
        });
        return tooltip;
      }
    },
    series: [{
      name: 'Amount',
      type: 'line',
      data: data.map(transaction => transaction.amount),
    }],
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true
        },
        enableMouseTracking: true
      }
    },
  };

  return (
    <div>
      {view === 'scatter' && <HighchartsReact highcharts={Highcharts} options={scatterOptions} />}
      {view === 'histogram' && <HighchartsReact highcharts={Highcharts} options={histogramOptions} />}
      {view === 'line' && <HighchartsReact highcharts={Highcharts} options={lineOptions} />}
      {/* Agrega más gráficos aquí */}
    </div>
  );
};

export default EnhancedCharts;
