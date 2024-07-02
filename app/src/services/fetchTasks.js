/**
 * Funktio tehtävätyyppien noutamiseen rajapinnasta. Kutsu Map.js tiedostossa.
 * @param {string} type - käytettävä karttatyyppi, jonka perusteella asetetaan tehtävien show arvot (true/false)
 * @param {string} local_data - Hae tehtävät joko paikallisesti tai rajapinnasta arvot ("true"/"false"(string))
 * @returns {[]} - Palauta lista tehtävätyyppejä
 */

export async function fetchTasks(type, local_data) {
    const baseUrl = "https://tie.digitraffic.fi";
    //Haetaan tarkemman tehtävänimikkeet
    const tasks = "/api/maintenance/v1/tracking/tasks";

    try {
        let data_tasks;
        if (local_data === "false") {
            const response_tasks = await fetch(baseUrl + tasks);
            data_tasks = await response_tasks.json();
        } else {
            data_tasks = require("../data/tasks.json");
        }
        //Lisätään tehtäviin "show"-arvo tehtävätyyppien filteröintiä varten
        //Aseta show arvo karttatyypin mukaan
        let updatedItems;
        switch (type) {
            case "plough":
                updatedItems = data_tasks.map((task) => {
                    if (
                        task.id === "PLOUGHING_AND_SLUSH_REMOVAL" ||
                        task.id === "LEVELLING_OF_ROAD_SURFACE" ||
                        task.id === "REMOVAL_OF_BULGE_ICE" ||
                        task.id === "LOWERING_OF_SNOWBANKS" ||
                        task.id === "PREVENTING_MELTING_WATER_PROBLEMS"
                    ) {
                        return { ...task, show: true };
                    } else {
                        return { ...task, show: false };
                    }
                });
                break;
            case "sanding":
                updatedItems = data_tasks.map((task) => {
                    if (
                        task.id === "LINE_SANDING" ||
                        task.id === "SPOT_SANDING"
                    ) {
                        return { ...task, show: true };
                    } else {
                        return { ...task, show: false };
                    }
                });
                break;
            case "brush":
                updatedItems = data_tasks.map((task) => {
                    if (task.id === "BRUSHING") {
                        return { ...task, show: true };
                    } else {
                        return { ...task, show: false };
                    }
                });
                break;
            default:
                console.log("Error");
        }
        return updatedItems;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}
