// // CoinInfo.jsx
// import { useEffect } from 'react';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CircularProgress from '@mui/material/CircularProgress';
// import { CryptoState } from '@/context/store';
// import ChartComponent from './ChartComponent';
// import ChartTimeline from './ChartTimeline';

// const CoinInfo = ({ coin }) => {
//   const { currency, historicData, days, fetchHistoricalData } = CryptoState();

//   useEffect(() => {
//     fetchHistoricalData(coin.id);
//   }, [coin.id, currency, days]);

//   const darkTheme = createTheme({
//     palette: {
//       mode: 'dark',
//     },
//   });

//   return (
//     <ThemeProvider theme={darkTheme}>
//       <div className="info-container">
//         {!historicData.length ? (
//           <CircularProgress style={{ color: 'gold' }} size={200} thickness={1} />
//         ) : (
//           <>
//             <ChartComponent />
//             <ChartTimeline />
//           </>
//         )}
//       </div>
//     </ThemeProvider>
//   );
// };

// export default CoinInfo;




import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Chart from 'react-apexcharts';
import axios from 'axios';
import { chartDays } from '@/config/data';
import SelectButton from './SelectButton';
import { CryptoState } from '@/context/store';

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState([]);
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();



  useEffect(() => {
    const fetchHistoricalData = async () => {
      const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=${currency}&days=${days}`);
      setHistoricData(data.prices);
    };
  
    fetchHistoricalData();
  }, [coin.id, currency, days]);
  

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="info-container">
        {!historicData ? (
          <CircularProgress style={{ color: 'gold' }} size={200} thickness={1} />
        ) : (
          <>
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
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 20, width: '100%' }}>
              {chartDays.map((day) => (
                <SelectButton key={day.value} onClick={() => setDays(day.value)} selected={day.value === days}>
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
