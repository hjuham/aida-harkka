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
 * Recharts pylväsdiagrammi. Reitteihin käytetty aika tehtävätyypin mukaan. Kutsu StatBox.js komponentissa.
 * @constructor
 * @param {Object[]} data - Formatoitu data
 * @param {string} data[].name - Tehtävätyypin nimi
 * @param {number} data[].value - Tehtävätyyppiin käytetty aika
 */
export default function RoutesByTask({ data }) {
    const bar = "value";
    const xLabel = "Tehtävätyypit";
    const yLabel = "Tuntia";
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
                    <h3>{payload[0].payload.name}</h3>
                    <p>{payload[0].value} tuntia</p>
                </div>
            );
        }

        return null;
    };
    return (
        <ResponsiveContainer height={"95%"}>
            <BarChart
                title={"Reitit tehtävätyypin mukaan"}
                data={data}
                margin={{ top: 5, right: 20, left: 10, bottom: 60 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey={bar} fill="#8884d8">
                    {
                        //Näytä pylväiden nimet jos pylväitä on alle 10
                        data.length < 10 ? (
                            <>
                                <LabelList dataKey="name" position="bottom" />
                                <LabelList dataKey="value" position="top" />
                            </>
                        ) : (
                            <></>
                        )
                    }
                </Bar>
                <XAxis tick={false}>
                    <Label value={xLabel} fontSize={20} position="bottom" offset={25} />
                </XAxis>
                <YAxis domain={[0, "dataMax + 5"]}>
                    <Label
                        value={yLabel}
                        fontSize={20}
                        position="left"
                        angle={-90}
                        offset={-10}
                        style={{ textAnchor: "middle" }}
                    />
                </YAxis>
                <Tooltip content={<CustomTooltip />} cursor={false} />
            </BarChart>
        </ResponsiveContainer>
    );
}
