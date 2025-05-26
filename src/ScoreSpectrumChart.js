import React from "react";
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    LabelList
} from "recharts";

function ScoreSpectrumChart({ students }) {
    const data = students.map((s, i) => ({
        index: i + 1,
        score: s.score,
        name: s.name,
    }));

    return (
        <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
                <ScatterChart margin={{ top: 20, right: 30, bottom: 10, left: 0 }}>
                    <CartesianGrid />
                    <XAxis dataKey="index" tick={false} label={{ value: "Students", position: "insideBottom", offset: -5 }} />
                    <YAxis dataKey="score" domain={[0, 20]} label={{ value: "Score", angle: -90, position: "insideLeft" }} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="Scores" data={data} fill="#82ca9d">
                        <LabelList dataKey="name" position="top" />
                    </Scatter>
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ScoreSpectrumChart;