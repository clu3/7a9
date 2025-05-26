import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

function formatFloat(value) {
    return parseFloat(value.toString());
}

const groupScoresIntoBins = (students, binSize = 0.25) => {
    const bins = {};

    students.forEach(({ score }) => {
        if (typeof score !== "number" || isNaN(score)) return;

        const bucket = Math.floor(score / binSize) * binSize;
        const lower = formatFloat(bucket.toFixed(2));
        const upper = formatFloat((bucket + binSize).toFixed(2));
        const label = `${lower}-${upper}`; // e.g., [7.25, 7.5)

        // const label = `${formatFloat(bucket.toFixed(2))}-${formatFloat((bucket + binSize).toFixed(2))}`;

        bins[label] = (bins[label] || 0) + 1;
    });

    return Object.entries(bins)
        .map(([range, count]) => ({ range, count }))
        .sort(
            (a, b) =>
                parseFloat(a.range.split("-")[0]) -
                parseFloat(b.range.split("-")[0])
        );
};

function ScoreDistributionChart({ students, binSize = 0.25 }) {
    const data = groupScoresIntoBins(students, binSize);

    return (
        <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
                <BarChart data={data}>
                    <XAxis dataKey="range" />
                    <YAxis allowDecimals={false} />
                    <Tooltip
                        formatter={(value) => `${value} students`}
                        labelFormatter={(label) => {
                            const [start, end] = label.split("-");
                            return `${start} ≤ đ < ${end}`;
                        }}
                    />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ScoreDistributionChart;
