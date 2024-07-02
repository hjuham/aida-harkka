import React from "react";
import { Polyline, Popup, Circle, Tooltip } from "react-leaflet";

/**
 * Funktio reittien iteroimiseen kartalle. Kutsutaan yhdellä reitillä. Kutsu Map.js-tiedostossa
 * @param {Object} route - Kartalle piirrettävä reitti
 * @param {Date} currentDate - Käytä ulkoista Date oliota, mikäli reitit on paikallisesti tallennettuja
 */

export default function MapRoutes(route, currentDate, routeInfo) {
    //Viivan asetukset
    const lineOptions = {
        weight: 5,
    };
    //Laske aika reitin suorittamisesta ja määritä väri
    const hoursAgo = Math.floor(
        (currentDate - new Date(route.properties.endTime)) / (1000 * 60 * 60),
    );
    let colorString = "";
    if (hoursAgo <= 5) {
        colorString = "green";
    } else if (hoursAgo <= 10) {
        colorString = "yellow";
    } else {
        colorString = "red";
    }
    if (
        (routeInfo.green === false && colorString === "green") ||
        (routeInfo.yellow === false && colorString === "yellow") ||
        (routeInfo.red === false && colorString === "red")
    ) {
        return null;
    }
    //Jos reitti on viiva
    else if (route.geometry.type === "LineString") {
        return (
            <Polyline
                smoothFactor={5}
                //Avaa popupin ja lihavoi reitin, kun hiiri on reitin päällä
                eventHandlers={{
                    mouseover: (e) => {
                        e.target.setStyle({
                            weight: 10,
                            color: "#0d004c",
                        });
                    },
                    mouseout: (e) => {
                        e.target.setStyle({
                            color: colorString,
                            weight: 5,
                        });
                    },
                }}
                pathOptions={lineOptions}
                color={colorString}
                key={route.properties.id}
                positions={route.geometry.coordinates.map((coord) => [
                    coord[1],
                    coord[0],
                ])}
            >
                <Tooltip autoPan={false}>
                    <b>Lähde:</b> <br />
                    {route.properties.source} <br />
                    <b>Reitti suoritettu:</b> <br />
                    {Math.floor(
                        (currentDate - new Date(route.properties.endTime)) /
                            (1000 * 60 * 60),
                    )}{" "}
                    tuntia sitten <br />
                    {route.properties.task_fi.length > 1 ? (
                        <>
                            <b>Tehtävänimikkeet:</b> <br />
                            {route.properties.task_fi.map((task) => (
                                <p key={task}>{task}</p>
                            ))}
                        </>
                    ) : (
                        <>
                            <b>Tehtävänimike:</b> <br />
                            <p>{route.properties.task_fi[0]}</p>
                        </>
                    )}
                </Tooltip>
            </Polyline>
        );
    } else if (route.geometry.type === "Point") {
        //Näyttää tälllä hetkellä vain ympyöritä
        //Mahdollisuus yhdistää viivoihin?
        return (
            <Circle
                //Avaa popupin ja lihavoi ympyrän, kun hiiri on reitin päällä
                eventHandlers={{
                    mouseover: (e) => {
                        e.target.setStyle({
                            weight: 10,
                        });
                        e.target.openPopup();
                    },
                    mouseout: (e) => {
                        e.target.setStyle({
                            color: colorString,
                            weight: 5,
                        });
                        e.target.closePopup();
                    },
                }}
                color={colorString}
                center={[
                    route.geometry.coordinates[1],
                    route.geometry.coordinates[0],
                ]}
                key={route.properties.id}
            >
                <Popup autoPan={false}>
                    <b>Lähde:</b> <br />
                    {route.properties.source} <br />
                    <b>Piste suoritettu:</b> <br />
                    {Math.floor(
                        (currentDate - new Date(route.properties.endTime)) /
                            (1000 * 60 * 60),
                    )}{" "}
                    tuntia sitten
                    <b>Tehtävänimike</b>
                    <br />
                    {route.properties.task_fi}
                </Popup>
            </Circle>
        );
    } else {
        return null;
    }
}
