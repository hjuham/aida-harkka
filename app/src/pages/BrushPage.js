import React from "react";
import Map from "../components/Map";

/**
 * Harjauskaluston sivu. Kutsu App.js-tiedostossa type-muuttujaa käytetään haettavien tehtävätyyppien määrittämiseen.
 */
export default function BrushPage() {
    return <Map type={"brush"}></Map>;
}
