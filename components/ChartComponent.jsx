// ChartComponent.jsx
import React from 'react';
import Chart from 'react-apexcharts';
import { CryptoState } from '@/context/store';

const ChartComponent = () => {
  const { historicData, currency, days } = CryptoState();

  return (
    <Chart
      options={{
        xaxis: {
          type: 'datetime',
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              return `${currency} ${value}`;
            },
          },
        },
      }}
      series={[
        {
          name: `Price (Past ${days} Days)`,
          data: historicData.map((coin) => ({
            x: new Date(coin[0]).getTime(),
            y: coin[1],
          })),
        },
      ]}
      type="line"
      height={400}
      width={1100}
    />
  );
};

export default ChartComponent;
