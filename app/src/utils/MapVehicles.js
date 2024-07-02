import React from "react";
import "leaflet/dist/leaflet.css";
import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet-rotatedmarker";

/**
 * Funktio ajoneuvojen iteroimiseen kartalle. Kutsutaan yhdellä ajoneuvolla. Kutsu Map.js-tiedostossa
 * @param {Object} vehicle - Kartalle piirrettävä ajoneuvo
 * @param {Date} currentDate - Käytä ulkoista Date oliota, mikäli ajoneuvot ovat paikallisesti tallennettuja
 */

export default function MapVechiles(vehicle, currentDate, darkmode) {
    let classname;
    if (darkmode === true) {
        classname = "dark";
    } else {
        classname = "";
    }
    //Tarkista onko suuntadataa, määrittele käytettävä merkki tämän mukaan
    let icon;
    //Käytä nuolikuvaketta, jos ajoneuvon suunta ei ole null
    if (vehicle.properties.direction !== null) {
        icon = new Icon({
            className: classname,
            iconUrl: require("../assets/navigation.png"), //Nuolikuvake
            iconSize: [25, 25], // size of the icon
        });
    } else {
        icon = new Icon({
            className: classname,
            iconUrl: require("../assets/icon.png"), //Paikkakuvake
            iconSize: [25, 25], // size of the icon
        });
    }

    return (
        <Marker
            position={[
                vehicle.geometry.coordinates[1],
                vehicle.geometry.coordinates[0],
            ]}
            rotationAngle={vehicle.properties.direction}
            rotationOrigin="center center"
            key={vehicle.properties.id}
            icon={icon}
            autoPanOnFocus={false} //Älä keskitä klikatessa
        >
            <Popup>
                <b>ID:</b> <br />
                {vehicle.properties.id} <br />
                <b>Sijainti:</b> <br />
                {vehicle.geometry.coordinates[1]}° N,{" "}
                {vehicle.geometry.coordinates[0]}° E <br />
                {vehicle.properties.task_fi.length > 1 ? (
                    <>
                        <b>Tehtävänimikkeet:</b>
                        <br />
                        {vehicle.properties.task_fi.map((task) => task + " ")}
                        <br />
                    </>
                ) : (
                    <>
                        <b>Tehtävänimike:</b> <br />
                        {vehicle.properties.task_fi[0]} <br />
                    </>
                )}
                <b>Lähde:</b> <br />
                {vehicle.properties.source} <br />
                <b>Päivitetty:</b> <br />
                {Math.floor(
                    (currentDate - new Date(vehicle.properties.time)) /
                        (1000 * 60),
                )}{" "}
                minuuttia sitten <br />
                <b>Suunta:</b>
                <br />
                {/* Näytä suuntatiedot mikäli suunta ei ole null */}
                {vehicle.properties.direction !== null
                    ? vehicle.properties.direction
                    : " Ei suuntatietoja"}
            </Popup>
        </Marker>
    );
}
