export default function moveMap(
    coordinates,
    map,
    setPosition,
    setBounds,
    setLoading,
) {
    map.setView(coordinates);
    setPosition(coordinates);
    // Määritellään haettava alue kaupungin koordinaattien perusteella
    const cityBounds = [
        [
            Math.round((coordinates[0] - 0.5) * 2) / 2, //y-min
            Math.round(coordinates[1] - 1), //x-min
        ],
        [
            Math.round((coordinates[0] + 0.5) * 2) / 2, //y-max
            Math.round(coordinates[1] + 1), //x-max
        ],
    ];
    setBounds(cityBounds);
    setLoading(false);
}
