import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// console.log(formatFloat(2.75)); // 2.75
// console.log(formatFloat(2.50)); // 2.5
// console.log(formatFloat(3.00)); // 3
function formatFloat(value) {
    return parseFloat(value.toString());
}

const groupScoresIntoBins = (students, binSize = 0.25) => {
    const bins = {};

    students.forEach(({ score }) => {
        const bucket = Math.floor(score / binSize) * binSize;
        // const label = `${bucket}-${bucket + binSize - 1}`;
        const label = `${formatFloat(bucket.toFixed(2))}-${formatFloat((bucket + binSize).toFixed(2))}`;

        bins[label] = (bins[label] || 0) + 1;
    });

    return Object.entries(bins)
        .map(([range, count]) => ({ range, count }))
        .sort((a, b) => parseInt(a.range) - parseInt(b.range));
};

function ScoreDistributionChart({ students }) {
    const data = groupScoresIntoBins(students);

    return (
        <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
                <BarChart data={data}>
                    <XAxis dataKey="range" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ScoreDistributionChart;