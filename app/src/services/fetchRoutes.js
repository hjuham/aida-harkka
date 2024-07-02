/**
 * Funktio reittien noutamiseen rajapinnasta. Kutsu Map.js-tiedostossa.
 * @param {[[],[]]} bounds - Haettava alue
 * @param {[]} tasksFi - Haettavat tehtävätyypit show arvon (true/false) perusteella
 * @returns {[]} - Palauta lista reittejä rajatun alueen ja tasksFi listan perusteella.
 */

export async function fetchRoutes(bounds, tasksFi, local_data) {
    const baseUrl = "https://tie.digitraffic.fi";
    const routes = "/api/maintenance/v1/tracking/routes";
    const local_routes = require("../data/routes.json");
    const visibleTasks = tasksFi
        .filter((item) => item.show === true)
        .map((item) => item.id);

    const idString = visibleTasks.join(",");
    let params = `?taskId=${idString}&xMin=${bounds[0][1]}&xMax=${bounds[1][1]}&yMin=${bounds[0][0]}&yMax=${bounds[1][0]}`;
    try {
        let response;
        if (local_data === "true") {
            response = local_routes;
        } else {
            response = await fetch(baseUrl + routes + params);
            response = await response.json();
        }
        const data = response;
        //Error jos reittejä on liian paljon
        if (data.features.length > 30000) {
            throw Error("Dataset too big");
        } else if (data.features.length > 0) {
            const updatedRoutes = data.features.map((route) => {
                const updatedTasks = route.properties.tasks.map((taskId) => {
                    const task = tasksFi.find((task) => task.id === taskId);
                    return task.nameFi;
                });
                return {
                    ...route,
                    properties: {
                        ...route.properties,
                        task_fi: updatedTasks,
                    },
                };
            });
            return updatedRoutes;
        } else {
            throw Error("No data");
        }
    } catch (error) {
        throw error;
    }
}
