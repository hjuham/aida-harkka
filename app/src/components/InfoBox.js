import React, { useState, useEffect } from "react";
import icon from "../assets/icon.png";
import icon2 from "../assets/navigation.png";

/**
 * Selitteet kartalla näkyvistä ajoneuvoista ja reiteistä. Suljettavissa sovelluksen vasemmassa alakulmassa. Kutsu Map.js komponentissa
 * @param {boolean} data - Mikäli totta ilmoittaa sovelluksen käyttävän testidataa
 * @param {number} count - Ladattavalla alueella olevien ajoneuvojen määrä, näkyy selitteessä.
 * @param {} routeInfo - Reittien suodatus ajan mukaan
 * @param {} setRouteInfo - Reittien suodatuksen ajan mukaan asettaminen
 */

export default function InfoBox({ data, count, routeInfo, setRouteInfo }) {
    //Piilota ja näytä selite
    const [isDivVisible, setDivVisible] = useState(true);

    const toggleDivVisibility = () => {
        setDivVisible(!isDivVisible);
    };

    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener("resize", handleResize);
        //Piilota selite jos esimerkiksi mobiililaite on vaakatasossa
        if (window.innerHeight < 500) {
            setDivVisible(false);
        }
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [windowSize]);

    const handleChange = (e) => {
        const { name, checked } = e.target;
        setRouteInfo({
            ...routeInfo,
            [name]: checked,
        });
    };

    return isDivVisible ? (
        <div className="infobox">
            <div className="top">
                {/* Ilmoita mikäli selite on testidatalle */}
                <h2>Selite {data === "true" ? "Test" : ""}</h2>
                <button
                    type="button"
                    title="selitteen sulkeminen"
                    data-testid="hide-infobox"
                    onClick={toggleDivVisibility}
                >
                    X
                </button>
            </div>
            <p>Valittua kalustoa liikenteessä {count} kappaletta</p>
            <h3>Ajoneuvot:</h3>
            <span
                style={{
                    backgroundColor: "white",
                    paddingTop: "1.2em",
                }}
            >
                <img src={icon} alt="paikallaan olevan ajoneuvon kuvake" />
                <img src={icon2} alt="liikkeessä olevan ajoneuvon kuvake" />
            </span>
            <h3>Suoritetut reitit:</h3>
            <ul className="routecolors">
                <li>
                    <input
                        id="0-5 tuntia sitten"
                        data-testid="green-check"
                        name="green"
                        type="checkbox"
                        checked={routeInfo.green}
                        onChange={handleChange}
                    ></input>
                    <span
                        style={{
                            color: "green",
                        }}
                    >
                        _
                    </span>
                    <label htmlFor="0-5 tuntia sitten">0-5 tuntia sitten</label>
                </li>
                <li>
                    <input
                        id="5-10 tuntia sitten"
                        data-testid="yellow-check"
                        name="yellow"
                        type="checkbox"
                        checked={routeInfo.yellow}
                        onChange={handleChange}
                    ></input>
                    <span style={{ color: "yellow" }}>_</span>{" "}
                    <label htmlFor="5-10 tuntia sitten">
                        5-10 tuntia sitten
                    </label>
                </li>
                <li>
                    <input
                        id="10-24 tuntia sitten"
                        data-testid="red-check"
                        name="red"
                        type="checkbox"
                        checked={routeInfo.red}
                        onChange={handleChange}
                    ></input>
                    <span style={{ color: "red" }}>_</span>{" "}
                    <label htmlFor="10-24 tuntia sitten">
                        10-24 tuntia sitten
                    </label>
                </li>
            </ul>
        </div>
    ) : (
        <div className="infobox-min">
            <button data-testid="show-infobox" onClick={toggleDivVisibility}>
                i
            </button>
        </div>
    );
}
