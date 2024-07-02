import React, { useContext, useState } from "react";

const MapContext = React.createContext();

//Käytettävä funktio tämän tiedoston dataa tarvitsevissa komponenteissa
export function useMapContext() {
    return useContext(MapContext);
}

/**
 * Säilyttää ja muuttaa zoom-, sijainti- ja ladattavan alueen-arvoja.
 * Tuota datan lapsielementeille. Kutsu App.js tiedostossa
 * @param {any} children - Lapsielementit
 */
export function MapProvider({ children }) {
    //Säilytä sijainti, rajat ja zoom
    const [position, setPosition] = useState([62.2426, 25.7473]);
    const [bounds, setBounds] = useState([
        [62, 25],
        [62.5, 26],
    ]);
    const [zoom, setZoom] = useState(13);
    const [darkmode, setDarkmode] = useState(false);
    const [layer, setLayer] = useState(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    );
    const value = {
        position,
        bounds,
        setPosition,
        setBounds,
        zoom,
        setZoom,
        darkmode,
        setDarkmode,
        layer,
        setLayer,
    };

    //Komponentti on tuotu App.js-tiedostoon reittien ympärille
    return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}
