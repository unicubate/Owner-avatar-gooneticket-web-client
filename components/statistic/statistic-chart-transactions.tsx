/* eslint-disable jsx-a11y/anchor-is-valid */

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  {
    name: 'Javier',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Fevrier',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Mars',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Avril',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Mai',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
];

export function StatisticChartTransactions() {
  return (
    <>
      <ResponsiveContainer height={500} width="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>

        {/* <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={`date`} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart> */}
      </ResponsiveContainer>
    </>
  );
}
