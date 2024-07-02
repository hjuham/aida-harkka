import React, {
    useEffect,
    useState,
    useMemo,
    lazy,
    Suspense,
    useRef,
} from "react";
import "leaflet/dist/leaflet.css";
import {
    MapContainer,
    TileLayer,
    Rectangle,
    Popup,
    useMapEvents,
} from "react-leaflet";
// import InfoBox from "./InfoBox";
import MapLayers from "./MapLayers";
import MessageBox from "./MessageBox";
import MapVechiles from "../utils/MapVehicles";
import MapRoutes from "../utils/MapRoutes";
import { fetchVehicles } from "../services/fetchVehicles";
import { fetchRoutes } from "../services/fetchRoutes";
// import MapMethods from "./MapMethods";
// import StatBox from "./StatBox";
import { useMapContext } from "../contexts/MapContext";
import { fetchTasks } from "../services/fetchTasks";
import L from "leaflet";
import "leaflet-easybutton/src/easy-button.js";
import "leaflet-easybutton/src/easy-button.css";
import "font-awesome/css/font-awesome.min.css";
import moveMap from "../utils/moveMap";
const StatBox = lazy(() => import("./StatBox"));
const MapMethods = lazy(() => import("./MapMethods"));
const InfoBox = lazy(() => import("./InfoBox"));
// const InfoBox = lazy(() => wait(1000).then(() => import("./InfoBox")));
// const StatBox = lazy(() => wait(1000).then(() => import("./StatBox")));
// const MapMethods = lazy(() => wait(1000).then(() => import("./MapMethods")));

//Simuloi hidasta  yhteyttä
// function wait(time) {
//     return new Promise((resolve) => {
//         setTimeout(resolve, time);
//     });
// }

/**
 * Karttakomponentti. Sisältää kaikki kartan alueella olevat, karttaan vaikuttavat tai kartan dataa hyödyntävät komponentit.
 * @param {string} type - Kartan tyyppi, joka määrittää haettavat tehtävätyypit asettamalla noudettujen tehtävätyyppien show-arvon todeksi.
 */

export default function Map({ type }) {
    const tileRef = useRef();
    const [map, setMap] = useState(null);
    const [vehicles, setVehicles] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const {
        position,
        bounds,
        zoom,
        setPosition,
        setZoom,
        setBounds,
        darkmode,
        setDarkmode,
        layer,
        setLayer,
    } = useMapContext();
    const [showStatBox, setShowStatBox] = useState(false);
    const [tasksFi, setTasksFi] = useState();
    const [routeInfo, setRouteInfo] = useState({
        green: true,
        yellow: true,
        red: true,
    });
    const [locating, setLocating] = useState(false);
    const [showLayers, setShowLayers] = useState(false);
    //package.json sisältää paikallisen datan määrittelyn palauttaa true/false string muodossa
    const local_data = process.env.REACT_APP_USE_LOCAL_DATA;
    useEffect(() => {
        if (!map) return;

        L.easyButton(
            "fa-map-marker",
            () => {
                setLocating(true);
                map.locate()
                    .on("locationerror", function () {
                        setLocating(false);
                        alert(
                            "Käyttäjän paikantaminen vaatii sijainnin jakamisen.",
                        );
                    })
                    .on("locationfound", function (e) {
                        moveMap(
                            [e.latitude, e.longitude],
                            map,
                            setPosition,
                            setBounds,
                            setLoading,
                        );
                        setLocating(false);
                    });
            },
            "Paikanna käyttäjä",
        ).addTo(map);
        //Näytä mahdolliset karttataustat ja aseta karttatausta
        // L.easyButton(

        //     "fa-map",
        //     () => {
        //         setShowLayers(!showLayers)
        //     }
        // ).addTo(map)
        L.easyButton({
            states: [
                {
                    stateName: "open",
                    icon: "fa-map",
                    title: "avaa karttataustat",
                    onClick: function (btn) {
                        setShowLayers(true);
                        btn.state("close");
                    },
                },
                {
                    stateName: "close",
                    icon: "fa-times",
                    title: "sulje karttataustat",
                    onClick: function (btn) {
                        setShowLayers(false);
                        btn.state("open");
                    },
                },
            ],
        }).addTo(map);
    }, [map, setPosition, setBounds]);

    //Tehtävien nouto
    useEffect(() => {
        const fetchTaskData = async () => {
            try {
                const data = await fetchTasks(type, local_data);
                setTasksFi(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTaskData();
    }, [type, local_data]);
    //Reittien ja ajoneuvojen nouto, kun kartan tyyppi tai rajat muuttuvat
    useEffect(() => {
        //Käytä API:ta
        if (tasksFi) {
            const fetchVehicleData = async () => {
                try {
                    const data = await fetchVehicles(
                        bounds,
                        tasksFi,
                        local_data,
                    );
                    setVehicles(data);
                } catch (error) {
                    //setError(error);
                    console.log(error);
                }
            };
            const fetchRouteData = async () => {
                try {
                    const data = await fetchRoutes(bounds, tasksFi, local_data);
                    setError(false);
                    setRoutes(data);
                } catch (error) {
                    setError(error);
                }
            };
            fetchVehicleData();
            fetchRouteData();
        }
        setLoading(false);
    }, [bounds, local_data, type, tasksFi]);

    let currentDate;
    if (local_data === "false") {
        currentDate = new Date();
    } else if (local_data === "true") {
        //Käytä paikallisen datan tallennusaikaa
        currentDate = new Date("2024-03-25T10:39:00.00Z");
    }
    //Karttaa zoomatessa aseta zoom ja siirrettäessä aseta sijainti
    const MapEvents = () => {
        useMapEvents({
            zoom() {
                setZoom(map.getZoom());
            },
            // Moveend on suorituskyvyllisesti parempi kuin move
            moveend() {
                setPosition(map.getCenter());
            },
        });
        return false;
    };

    //Kartan tummennus
    useEffect(() => {
        if (map && darkmode === true) {
            tileRef.current
                .getContainer()
                .style.setProperty(
                    "filter",
                    `invert(1) hue-rotate(180deg) grayscale(0.7)`,
                );
        } else if (map && darkmode === false) {
            tileRef.current.getContainer().style.setProperty("filter", ``);
        }
    }, [map, darkmode]);
    const displayMap = useMemo(
        () => (
            <>
                <MapContainer center={position} zoom={zoom} ref={setMap}>
                    <TileLayer
                        ref={tileRef}
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url={layer}
                    />
                    {vehicles.map((vehicle) =>
                        MapVechiles(vehicle, currentDate, darkmode),
                    )}
                    {routes.map((route) =>
                        MapRoutes(route, currentDate, routeInfo),
                    )}
                    <Rectangle bounds={bounds} fill={false} color="#0d004c">
                        <Popup>
                            <b>y-min: </b>
                            {bounds[0][0]} <br />
                            <b>x-min: </b>
                            {bounds[0][1]} <br />
                            <b>y-max: </b>
                            {bounds[1][0]} <br />
                            <b>x-max: </b>
                            {bounds[1][1]} <br />
                        </Popup>
                    </Rectangle>
                    <MapEvents />
                </MapContainer>
                {showLayers ? (
                    <MapLayers
                        darkmode={darkmode}
                        setDarkmode={setDarkmode}
                        layer={layer}
                        setLayer={setLayer}
                        setShowLayers={setShowLayers}
                    />
                ) : (
                    <></>
                )}
                <Suspense fallback={<></>}>
                    <InfoBox
                        data={local_data}
                        count={vehicles.length}
                        routeInfo={routeInfo}
                        setRouteInfo={setRouteInfo}
                    />
                </Suspense>
                <Suspense fallback={<></>}>
                    <StatBox
                        showStatBox={showStatBox}
                        setShowStatBox={setShowStatBox}
                        vehicles={vehicles}
                        routes={routes}
                        date={currentDate}
                        type={type}
                        tasksFi={tasksFi}
                    ></StatBox>
                </Suspense>
                <Suspense fallback={<></>}>
                    <MapMethods
                        map={map}
                        setShowStatBox={setShowStatBox}
                        tasksFi={tasksFi}
                        setTasksFi={setTasksFi}
                        type={type}
                    />
                </Suspense>
            </>
        ),
        [
            bounds,
            currentDate,
            routes,
            vehicles,
            local_data,
            map,
            type,
            showStatBox,
            position,
            zoom,
            tasksFi,
            setTasksFi,
            routeInfo,
            showLayers,
            layer,
            darkmode,
            setDarkmode,
            setLayer,
        ],
    );
    return (
        <>
            <MessageBox loading={loading} error={error} locating={locating} />
            {!loading ? (
                <>
                    {map ? <></> : null}
                    {displayMap}
                </>
            ) : (
                <></>
            )}
        </>
    );
}
