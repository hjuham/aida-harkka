// import React, { useState } from "react";
import standard from "../assets/standard.PNG";
import humanitarian from "../assets/humanitarian.PNG";
/**
 * Karttataustojen valintakomponentti
 */
export default function MapLayers({ darkmode, setDarkmode, layer, setLayer }) {
    const [layer1, layer2] = [
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    ];

    const handleChange = (e) => {
        const { checked } = e.target;
        setDarkmode(checked);
    };

    return (
        <div className="maplayers">
            <ul>
                <li>
                    <button
                        disabled={layer === layer1}
                        onClick={() => setLayer(layer1)}
                    >
                        <img src={standard} alt="peruspohjakartta"></img>
                        Standard
                    </button>
                </li>
                <li>
                    <button
                        disabled={layer === layer2}
                        onClick={() => setLayer(layer2)}
                    >
                        <img
                            src={humanitarian}
                            alt="humanitaarinenkartta"
                        ></img>
                        Humanitarian
                    </button>
                </li>
            </ul>
            <label htmlFor="tummenna">Tummenna kartta:</label>
            <label className="switch">
                <input
                    onChange={handleChange}
                    checked={darkmode}
                    name="tummenna"
                    type="checkbox"
                ></input>
                <span className="slider"></span>
            </label>
        </div>
    );
}
