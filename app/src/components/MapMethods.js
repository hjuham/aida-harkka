import React, { useState, useEffect } from "react";
import bars from "../assets/bars-solid.svg";
import cities from "../data/fi.json";
import { useMapContext } from "../contexts/MapContext";
import setCustomBounds from "../utils/setCustomBounds";
import useEsc from "../hooks/useEsc";
import useNavigateCities from "../hooks/useNavigateCities";
import {
    toggleSelection,
    handleFilter,
    handleReset,
    handleEmpty,
} from "../utils/filterTasks";
import moveMap from "../utils/moveMap";
import { NavLink } from "react-router-dom";

/**
 * Kartan metodit. Sisältää karttaan vaikuttavat metodit. Aukeaa oikeasta yläkulmasta ja on mahdollista sulkea.
 * Sisältää kaupunkien haun, kartan alueella olevien reittien haun, tilastoikkunan avaamisen ja tehtävätyyppien suodattamisen.
 * Kutsu Map.js-komponentissa.
 * @param {map} map - Viite kartaan
 * @param {function} setShowStatBox - Piilota ja näytä tilastolaatikko
 * @param {Object[]} tasksFi - Tehtävänimikkeiden tila, joka sisältätävät suomenkielisen nimikkeen
 * @param {function} setTasksFi - Aseta tehtävänimikkeet suodatuksen mukaan (muokkaamalla tehtävätyypin show-arvoa)
 * @param {string} type - Kartan tyyppi, jota käytetään asettamaan suodatus oletusarvoihin
 */

export default function MapMethods({
    map,
    setShowStatBox,
    tasksFi,
    setTasksFi,
    type,
}) {
    const [display, setDisplay] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [search, setSearch] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [results, setResults] = useState([]);
    //tasks on listan tehtävät ja setTasks kutsutaan jokaisen painalluksen jälkeen
    //taskFi sisältää globaalit tehtävät ja setTasksFi kutsutaan kun tehtävätyypit halutaan suodattaa tai asettaa oletuksiin
    const [tasks, setTasks] = useState([]);
    const [filterError, setFilterError] = useState();
    const { setPosition, setBounds } = useMapContext();

    //Aseta komponentin näyttämä lista tehtäviä vastaamaan näytettäviä reittejä ja ajoneuvoja
    useEffect(() => {
        setTasks(tasksFi);
        setLoading(false);
    }, [tasksFi]);
    //Piilota ja näytä metodit
    const handleClick = () => {
        setDisplay(!display);
    };

    //Sulje metodit esc näppäimellä
    useEsc(setDisplay, setSearch);

    //Kaupunkien navigointi ja valinta
    useNavigateCities(
        setSelectedIndex,
        results,
        selectedIndex,
        search,
        setResults,
        cities,
        map,
        setPosition,
        setBounds,
        setLoading,
    );

    //Palauta metodit tai valikkopainike
    return display && tasks ? (
        <div data-testid="mapmethods" className="mapmethods">
            <button
                title="sivuvalikon sulkeminen"
                data-testid="mapmethods-button"
                className="toggle"
                onClick={handleClick}
            >
                X
            </button>
            <h2>Kaupungit:</h2>
            <input
                title="hae ja suodata kaupunkeja"
                type="search"
                data-testid="city-input"
                id="city-input"
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                list="cities"
            ></input>
            <div className="towns">
                <ul id="cities">
                    {results.map((city, index) => {
                        let id; //Määritä li, johon kaupunkilistaus siirretään
                        if (index === selectedIndex && selectedIndex >= 1) {
                            id = "selected";
                        } else if (
                            index === selectedIndex &&
                            selectedIndex === 0
                        ) {
                            id = "selected";
                        }
                        return (
                            <li
                                id={id}
                                style={{
                                    fontWeight:
                                        index === selectedIndex
                                            ? "bold"
                                            : "normal",
                                    backgroundColor:
                                        index === selectedIndex
                                            ? "gray"
                                            : "white",
                                }}
                                key={index}
                                value={[
                                    parseFloat(city.lat),
                                    parseFloat(city.lng),
                                ]}
                                onClick={() => {
                                    moveMap(
                                        [
                                            parseFloat(city.lat),
                                            parseFloat(city.lng),
                                        ],
                                        map,
                                        setPosition,
                                        setBounds,
                                        setLoading,
                                    );
                                    setDisplay(false);
                                    setSelectedIndex(index);
                                }}
                            >
                                {city.city}
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="custom">
                <h2>Reittien haku kartan alueelta ja reittien tilastot:</h2>
                <button
                    disabled={loading}
                    onClick={() => setCustomBounds(map, setBounds, setError)}
                >
                    Hae alueella olevat reitit
                </button>
                {error ? <p>{error}</p> : <></>}
                <button
                    data-testid="open-statbox-button"
                    onClick={() => setShowStatBox(true)}
                >
                    Näytä tilastot
                </button>
            </div>
            <div className="filter">
                <h2>Suodata tehtävätyyppejä:</h2>
                <ul className="tasks">
                    {tasks.map((task) => {
                        return (
                            <li
                                className={
                                    task.show === true ? "selected-task" : ""
                                }
                                key={task.id}
                                onClick={() => {
                                    toggleSelection(task.id, tasks, setTasks);
                                }}
                                style={{
                                    fontWeight:
                                        task.show === true ? "bold" : "normal",
                                    backgroundColor:
                                        task.show === true ? "gray" : "white",
                                }}
                            >
                                {task.nameFi}
                            </li>
                        );
                    })}
                </ul>
                <button
                    data-testid="filter-button"
                    onClick={() => {
                        handleFilter(tasks, setTasksFi, setFilterError);
                    }}
                >
                    Suodata
                </button>
                <button
                    data-testid="default-button"
                    onClick={() => {
                        handleReset(type, tasksFi, setTasksFi);
                    }}
                >
                    Palauta oletus
                </button>
                <button
                    data-testid="empty-button"
                    onClick={() => {
                        handleEmpty(tasks, setTasks);
                    }}
                >
                    Tyhjennä valinta
                </button>
                {filterError ? (
                    <p data-testid="error-text">{filterError}</p>
                ) : (
                    <></>
                )}
            </div>
            <div className="link">
                <NavLink
                    data-testid="info-link"
                    to={"/tietoa"}
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }
                >
                    Tietoa sovelluksesta
                </NavLink>
            </div>
        </div>
    ) : (
        <div data-testid="min-mapmethods" className="min-mapmethods">
            <button
                disabled={loading}
                data-testid="min-mapmethods-button"
                onClick={handleClick}
            >
                {" "}
                <img src={bars} alt="sivuvalikon avaus"></img>
            </button>
        </div>
    );
}
