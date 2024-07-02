/**
 * Funktio ajoneuvojen noutamiseen rajapinnasta. Kutsu Map.js-tiedostossa.
 * @param {[[],[]]} bounds - Haettava alue
 * @param {[]} tasksFi - Haettavat tehtävätyypit show arvon (true/false) perusteella
 * @returns {[]} - Palauta lista ajoneuvoja rajatun alueen ja tasksFi listan perusteella.
 */

export async function fetchVehicles(bounds, tasksFi, local_data) {
    const baseUrl = "https://tie.digitraffic.fi";
    const latest = "/api/maintenance/v1/tracking/routes/latest";
    const local_vehicles = require("../data/vehicles.json");
    const visibleTasks = tasksFi
        .filter((item) => item.show === true)
        .map((item) => item.id);

    const idString = visibleTasks.join(",");
    let params = `?taskId=${idString}&xMin=${bounds[0][1]}&xMax=${bounds[1][1]}&yMin=${bounds[0][0]}&yMax=${bounds[1][0]}`;
    try {
        let response;
        if (local_data === "true") {
            response = local_vehicles;
        } else {
            response = await fetch(baseUrl + latest + params);
            response = await response.json();
        }
        const data = response;
        if (data.features.length > 1) {
            const updatedVehicles = data.features.map((vehicle) => {
                const updatedTasks = vehicle.properties.tasks.map((taskId) => {
                    const task = tasksFi.find((task) => task.id === taskId);
                    return task.nameFi;
                });
                return {
                    ...vehicle,
                    properties: {
                        ...vehicle.properties,
                        task_fi: updatedTasks,
                    },
                };
            });
            return updatedVehicles;
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}
