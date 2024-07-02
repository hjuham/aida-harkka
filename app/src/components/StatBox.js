import React, { useState } from "react";
import RoutesByTask from "./recharts/RoutesByTask";
import RoutesByTime from "./recharts/RoutesByTime";
import useEsc from "../hooks/useEsc";

/**
 * Tilastolaatikko. Kutsu Map.js komponentissa. Avataan MapMethods.js komponentista. Sisältää reitteihin käytetyn ajan yhteensä ja kutsun Recharts kuvaajiin.
 * Tilastolaatikko on mahdollista sulkea oikeasta yläkulmasta.
 * @param {boolean} showStatBox - Näytä tai piilota tilastolaatikko
 * @param {useState} setShowStatBox - Aseta tilastolaatikon näkyvyys (kutsu x-merkkiä painettaessa)
 * @param {Object[]} rotues - Reitit, joiden avulla näytettävät tilastot muodostetaan
 * @param {Date} date - Tuotu Date-olio. Määrittely komponentin ulkopuolella mikäli sovellus käyttää paikallista dataa, jolloin arvo on tallennusajankohta.
 * @param {Object[]} tasksFi - Tehtävätyypit, käytetään alustamaan tehtävätyyppeihin käytetyn ajan diagrammi.
 */

export default function StatBox({
    showStatBox,
    setShowStatBox,
    routes,
    date,
    tasksFi,
}) {
    const [chartTitle, setChartTitle] = useState(
        "Valittuihin tehtävätyyppeihin käytetty aika tehtävätyypin mukaan",
    );

    const handleSelectChange = (event) => {
        setChartTitle(event.target.value);
    };

    //Reitteihin käytetty aika yhteensä
    let duration = 0;
    //Tehtävätyyppeihin käytetty aika (alusta tasksFi arvoilla joiden show arvo on true)
    let typeChartData = {};

    if (tasksFi) {
        tasksFi.forEach((element) => {
            if (element.show === true) {
                typeChartData[element.nameFi] = 0;
            }
        });
    }

    //Tehtäviin käytetty aika ajan mukaan
    let timeChartData = {};

    routes.forEach((route) => {
        //Aika yhteensä
        let time =
            new Date(route.properties.endTime) -
            new Date(route.properties.startTime);

        // duration += time
        //Käydään läpi kaikki tehtävänimikkeet, jos tehtävänimike löytyy alustetusta oliosta lisätään reittiin käytetty aika.
        //Tällä toteutuksella duration on suurempi kuin todellinen käytetty aika, sillä reitti voi kasvattaa useamman tehtävänimikkeen aikaa.
        //duration rivillä 43 tai 50 toteutuksen mukaan
        route.properties.task_fi.forEach((e) => {
            if (typeChartData[e] !== undefined) {
                typeChartData[e] += time;
                duration += time;
            }
        });

        //Tehtäviin käytetty aika ajan mukaan (tunnin välein)
        let hoursAgo = Math.round(
            (date - new Date(route.properties.endTime)) / (1000 * 60 * 60),
        );
        if (timeChartData[hoursAgo]) {
            timeChartData[hoursAgo] += time;
        } else {
            timeChartData[hoursAgo] = time;
        }
    });
    //Muunna tehtävätyyppeihin käytetty aika kuvaajalle käytettävään muotoon
    let typeArray = Object.keys(typeChartData).map((key, index) => ({
        name: key,
        value: Math.round((typeChartData[key] / (60 * 1000 * 60)) * 10) / 10,
    }));
    typeArray.sort((a, b) => {
        return b.value - a.value;
    });
    //Täytä timeChartDatan tyhjät kohdat
    for (let i = 0; i < 24; i++) {
        if (timeChartData[i] === undefined) {
            timeChartData[i] = 0;
        }
    }
    const timeArray = Object.keys(timeChartData).map((key) => {
        //Määrittele pylvään väri
        let color;
        if (key <= 5) {
            color = "#238823";
        } else if (key <= 10) {
            color = "#ffbf00";
        } else {
            color = "#d2222d";
        }
        return {
            name: key,
            value:
                Math.round((timeChartData[key] / (60 * 1000 * 60)) * 10) / 10,
            fill: color,
        };
    });

    //Piilota esc-näppäimellä
    useEsc(setShowStatBox);

    let graph;
    if (chartTitle === "Valittuihin tehtävätyyppeihin käytetty aika tehtävätyypin mukaan") {
        graph = <RoutesByTask data={typeArray} />;
    } else if (chartTitle === "Reitteihin käytetty aika ajan mukaan") {
        graph = <RoutesByTime data={timeArray} />;
    }

    if (showStatBox === true) {
        return (
            <div className="statbox">
                <button
                    data-testid="statbox-close-button"
                    onClick={() => setShowStatBox(false)}
                >
                    X
                </button>
                <h2>Alueella olevien reittien ja ajoneuvojen tilastot</h2>
                <p>Huomioi kartalla rajattu alue ja "Suodata tehtävätyyppejä" valikko</p>
                <p>
                    <b>Reitteihin käytetty aika: </b>
                    {Math.round(duration / (1000 * 60 * 60))} tunti(a)
                </p>
                <label htmlFor="charts">Valitse kuvaaja: </label>
                <select
                    name="charts"
                    value={chartTitle}
                    onChange={handleSelectChange}
                >
                    <option value="Valittuihin tehtävätyyppeihin käytetty aika tehtävätyypin mukaan">
                        Tehtävätyypit
                    </option>
                    <option value="Reitteihin käytetty aika ajan mukaan">
                        Ajan mukaan
                    </option>
                </select>
                <div className="chartDiv">
                    <h2>{chartTitle}</h2>
                    {graph}
                </div>
            </div>
        );
    } else {
        return <></>;
    }
}
