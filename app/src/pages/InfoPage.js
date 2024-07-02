import React from "react";
import preview from "../assets/preview.PNG";

/**
 * Tietoa-sivu. Kutsu App.js tiedostossa.
 */

export default function InfoPage() {
    return (
        <div className="infopage">
            <div className="infodiv">
                <h1>Tienhoito</h1>
                <p>
                    Sivusto visualisoi Digitrafficin kunnossapitodataa kartalle.
                    Sivustolla näet harjaus-, auraus- ja hiekoituskaluston
                    suorittamat reitit sekä kaluston sijainnin. Sivusto
                    mahdollistaa myös muiden reittien ja ajoneuvojen
                    suodattamisen tarkemman tehtävänimikeen mukaan. <br />
                    Data on peräisin{" "}
                    <a
                        rel="noreferrer"
                        target="_blank"
                        href="https://www.digitraffic.fi/tieliikenne/#maanteiden-kunnossapitotiedot"
                    >
                        Digitrafficin rajapinnasta
                    </a>
                    . Sivusto hyödyntää{" "}
                    <a
                        rel="noreferrer"
                        target="_blank"
                        href="https://www.openstreetmap.org/"
                    >
                        OpenStreetMapsin
                    </a>{" "}
                    karttaa. Sovellus on toteutettu{" "}
                    <a
                        rel="noreferrer"
                        target="_blank"
                        href="https://react.dev/"
                    >
                        ReactJS:llä
                    </a>
                    ,{" "}
                    <a
                        rel="noreferrer"
                        target="_blank"
                        href="https://react-leaflet.js.org/"
                    >
                        React Leafletillä
                    </a>{" "}
                    ja{" "}
                    <a
                        rel="noreferrer"
                        target="_blank"
                        href="https://leafletjs.com/"
                    >
                        Leafletillä
                    </a>
                    .
                </p>
                <img className="preview" alt="kuvakaappaus sovelluksesta" src={preview}></img>
            </div>
        </div>
    );
}
