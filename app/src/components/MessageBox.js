import React from "react";

/**
 * Viestilaatikko, joka ilmoittaa kartan virheilmoitukset. Kutsu Map.js-komponentissa.
 * @param {boolean} loading - Ilmoita kartan latautuvan
 * @param {Error} error - Virheilmoitus ja virheiden selittäminen käyttäjälle viestin perusteella
 */

export default function MessageBox({ loading, error, locating }) {
    if (locating) {
        return <div className="messagebox">Haetaan sijaintia...</div>;
    }
    //Ilmoita jos reittejä tai ajoneuvoja ei ole
    else if (loading) {
        return <div className="messagebox">Ladataan karttaa...</div>;
    } else if (error.message === "No data") {
        return (
            <div className="messagebox">
                Ladattavaa dataa ei ole valitulle kalustotyypille. Sovellus
                näyttää viimeisen 24 tunnin aika suoritetut reitit ja
                ajoneuvojen tämänhetkisen sijainnin.
            </div>
        );
    } else if (error.message === "Dataset too big") {
        return (
            <div className="messagebox">
                Ladattava datasetti on liian iso. Kokeile ladata dataa
                pienemmältä alueelta.
            </div>
        );
    } else if (error) {
        return (
            <div className="messagebox">
                Datan lataaminen Digitrafficin rajapinnasta ei onnistunut. Katso
                https://status.digitraffic.fi/ ongelmatilanteen varalta.
            </div>
        );
    }
}
