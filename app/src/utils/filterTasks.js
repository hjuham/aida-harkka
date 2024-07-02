function toggleSelection(id, tasks, setTasks) {
    const updatedItems = tasks.map((task) => {
        if (task.id === id) {
            return { ...task, show: !task.show };
        }
        return task;
    });
    setTasks(updatedItems);
}

function handleFilter(tasks, setTasksFi, setFilterError) {
    //setTasksFi kutsu täällä, aseta tasksFi vastaamaan tasks
    //Virheilmoitus mikäli yhtään tehtävätyyppiä ei ole valittuna
    const hasShowValue = tasks.some((task) => task.show === true);
    if (hasShowValue) {
        setTasksFi(tasks);
        setFilterError();
    } else {
        setFilterError("Valitse vähintään yksi tehtävätyyppi");
    }
}

//Palauttaa tehtävätyypit oletusarvoihin ylävalikosta valitun kalustotyypin mukaisesti
function handleReset(type, tasksFi, setTasksFi) {
    //setTasksFi kutsu täällä, nollaa ja aseta tasksFi show arvot karttatyypin mukaan kts. ../services/fetchTasks.js
    //nollaus
    let updatedItems = tasksFi.map((task) => {
        return { ...task, show: false };
    });
    //show arvo karttatyypin mukaan
    switch (type) {
        case "plough":
            updatedItems = updatedItems.map((task) => {
                if (
                    task.id === "PLOUGHING_AND_SLUSH_REMOVAL" ||
                    task.id === "LEVELLING_OF_ROAD_SURFACE" ||
                    task.id === "REMOVAL_OF_BULGE_ICE" ||
                    task.id === "LOWERING_OF_SNOWBANKS" ||
                    task.id === "PREVENTING_MELTING_WATER_PROBLEMS"
                ) {
                    return { ...task, show: !task.show };
                }
                return task;
            });
            break;
        case "sanding":
            updatedItems = updatedItems.map((task) => {
                if (task.id === "LINE_SANDING" || task.id === "SPOT_SANDING") {
                    return { ...task, show: !task.show };
                }
                return task;
            });
            break;
        case "brush":
            updatedItems = updatedItems.map((task) => {
                if (task.id === "BRUSHING") {
                    return { ...task, show: !task.show };
                }
                return task;
            });
            break;
        default:
            console.log("Error");
    }
    setTasksFi(updatedItems);
}

//Tyhjennä valitut tehtävätyypit, ei vaikuta karttaan
function handleEmpty(tasks, setTasks) {
    //setTasks kutsu täällä
    const updatedItems = tasks.map((task) => {
        return { ...task, show: false };
    });
    setTasks(updatedItems);
}

export { toggleSelection, handleFilter, handleReset, handleEmpty };
