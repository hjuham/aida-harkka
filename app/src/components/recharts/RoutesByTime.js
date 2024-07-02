import React from "react";
import {
    BarChart,
    Bar,
    Tooltip,
    XAxis,
    CartesianGrid,
    YAxis,
    ResponsiveContainer,
    Label,
    LabelList,
} from "recharts";

/**
 * Recharts pylväsdiagrammi. Reitteihin käytetty aika ajan mukaan. Kutsu StatBox.js komponentissa.
 * @constructor
 * @param {Object[]} data - Formatoitu data
 * @param {string} data[].name -  Tuntia sitten
 * @param {number} data[].value - Tuntia sitten käytetty aika
 * @param {string} data[].fill - Pylvään väri, määritetty StatBox.js komponentissa ajan mukaan
 */

export default function RoutesByTime({ data }) {
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload) {
            return (
                <div
                    style={{
                        backgroundColor: "rgba(13, 0, 76)",
                        opacity: "0.8",
                        padding: "1em",
                    }}
                    className="custom-tooltip"
                >
                    <h3>{payload[0].payload.name} tuntia sitten käytetty aika:</h3>
                    <p>{payload[0].value} tuntia</p>
                </div>
            );
        }

        return null;
    };
    const bar = "value";
    const xLabel = "Tuntia sitten";
    const yLabel = "Tuntia";
    return (
        <ResponsiveContainer height={"95%"}>
            <BarChart
                title={"Reitit ajan mukaan"}
                data={data}
                margin={{ top: 5, right: 20, left: 10, bottom: 60 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey={bar} fill="#82ca9d">
                    <LabelList dataKey="value" position="top" />
                </Bar>
                <XAxis tick={true}>
                    <Label value={xLabel} fontSize={20} position="bottom" />
                </XAxis>
                <YAxis domain={[0, "dataMax + 1"]}>
                    <Label
                        value={yLabel}
                        position="left"
                        angle={-90}
                        fontSize={20}
                        offset={-10}
                        style={{ textAnchor: "middle" }}
                    />
                </YAxis>
                <Tooltip content={<CustomTooltip />} cursor={false} />
            </BarChart>
        </ResponsiveContainer>
    );
}
