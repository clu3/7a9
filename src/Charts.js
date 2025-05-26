import React from 'react';
import ScoreSpectrumChart from './ScoreSpectrumChart';
import ScoreDistributionChart from "./ScoreDistributionChart";

const Charts = ({ students, classFilter = '' }) => {
    return (
    <div style={{ padding: 20 }}>
        <h3> Phổ điểm / Score Spectrum</h3>
        <ScoreSpectrumChart students={students} />
        <h3>Phân bố điểm số / Score Distribution</h3>
        <ScoreDistributionChart students={students} />
    </div>
    );
}

export default Charts;