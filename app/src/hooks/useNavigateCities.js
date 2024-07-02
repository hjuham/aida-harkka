import { useEffect } from "react";
import moveMap from "../utils/moveMap";

export default function useNavigateCities(
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
) {
    useEffect(() => {
        const handleKeyDown = (event) => {
            let li;
            switch (event.key) {
                case "ArrowUp":
                    setSelectedIndex((prevIndex) =>
                        prevIndex > 0 ? prevIndex - 1 : 0,
                    );
                    li = document.getElementById("selected").previousSibling;
                    if (li) {
                        li.scrollIntoView({});
                    }
                    break;
                case "ArrowDown":
                    setSelectedIndex((prevIndex) =>
                        prevIndex < results.length - 1
                            ? prevIndex + 1
                            : prevIndex,
                    );
                    li = document.getElementById("selected");
                    if (li) {
                        li.scrollIntoView({});
                    }
                    break;
                case "Enter":
                    handleEnter(selectedIndex);
                    break;
                default:
                    break;
            }
        };
        const handleEnter = (selectedIndex) => {
            moveMap(
                [
                    parseFloat(results[selectedIndex].lat),
                    parseFloat(results[selectedIndex].lng),
                ],
                map,
                setPosition,
                setBounds,
                setLoading,
            );
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [
        selectedIndex,
        results,
        setSelectedIndex,
        map,
        setPosition,
        setBounds,
        setLoading,
    ]);

    //Filteröi kaupungit haun mukaan
    useEffect(() => {
        let filteredResults;
        if (typeof search === "string" && search.trim() === "") {
            setResults(cities);
            return;
        } else if (typeof search === "string") {
            filteredResults = cities.filter((item) =>
                item.city.toLowerCase().includes(search.toLowerCase()),
            );
        }
        setResults(filteredResults);
        setSelectedIndex(0);
    }, [cities, search, setResults, setSelectedIndex]);
}
