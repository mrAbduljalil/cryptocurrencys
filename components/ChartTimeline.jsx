// ChartTimeline.jsx
import React from 'react';
import SelectButton from './SelectButton';
import { chartDays } from '@/config/data';
import { CryptoState } from '@/context/store';

const ChartTimeline = () => {
  const { days, setDays } = CryptoState();

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 20, width: '100%' }}>
      {chartDays.map((day) => (
        <SelectButton key={day.value} onClick={() => setDays(day.value)} selected={day.value === days}>
          {day.label}
        </SelectButton>
      ))}
    </div>
  );
};

export default ChartTimeline;
