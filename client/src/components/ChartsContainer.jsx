import { useState } from 'react';

import BarChart from './BarChart';
import AreaChart from './AreaChart';
import ChartContainerWrapper from '../assets/wrappers/ChartsContainer';

const ChartsContainer = ({ data }) => {
  const [isBarChart, setIsBarChart] = useState(true);

  return (
    <ChartContainerWrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setIsBarChart(!isBarChart)}>
        {isBarChart ? 'Change to Area Chart' : 'Change to Bar Chart'}
      </button>
      {isBarChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </ChartContainerWrapper>
  );
};

export default ChartsContainer;
