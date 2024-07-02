import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";

/**
 *Sovelluksen juuritiedosto. Käyttää react-router-domin HashRouteria, sillä käytettävällä julkaisualustalla ei ole vapaasti määritettäviä polkuja.
 * React.StrictMode kehitystä ja bugien löytämistä tukevana asetuksena.
 */

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <HashRouter>
            <App />
        </HashRouter>
    </React.StrictMode>,
);
