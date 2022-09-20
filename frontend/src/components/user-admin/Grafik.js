import {LineChart, Line, CartesianGrid, XAxis, YAxis} from 'recharts';

const Grafik = ({chartData}) => {
    return (
        <LineChart width={600} height={300} data={chartData} margin={{top: 5, right: 20, bottom: 5, left: 0}}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8"/>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
            <XAxis dataKey="name"/>
            <YAxis/>
        </LineChart>
    )
};

export default Grafik;