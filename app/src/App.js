import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Banner from "./components/Banner";
import InfoPage from "./pages/InfoPage";
import BrushPage from "./pages/BrushPage";
import SandingPage from "./pages/SandingPage";
import PloughPage from "./pages/PloughPage";
import { MapProvider } from "./contexts/MapContext";
/**
 * Sovelluskomponentti. react-router-dom navigoimiseen reittien välillä.
 * PositionProvider säilyttää kartan sijainnin, zoomin ja ladattavan alueen rajat.
 */

function App() {
    return (
        <div className="App">
            <Banner />
            <MapProvider>
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to="/hiekanpuhdistus" />}
                    ></Route>
                    <Route path="/hiekanpuhdistus" element={<BrushPage />} />
                    <Route path="/auraus" element={<PloughPage />} />
                    <Route path="/hiekoitus" element={<SandingPage />} />
                    <Route path="/tietoa" element={<InfoPage />} />
                </Routes>
            </MapProvider>
        </div>
    );
}

export default App;
