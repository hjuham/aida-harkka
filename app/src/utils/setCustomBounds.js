/**
 * Apufunktio reittien hakemiseen kartan alueelta
 * @param map - Kartta viite
 * @param setBounds - Haettavan alueen asettaminen
 * @param setError - Virheilmoituksen asettaminen mikäli alue ei ole soveltuva
 */
const setCustomBounds = (map, setBounds, setError) => {
    const bounds = map.getBounds();
    //Pyöristetään koordinaatit Digitraficin käyttämälle tarkkuudelle
    let roundedBounds = [
        [
            Math.round(bounds._southWest.lat * 2) / 2, //y-min
            Math.round(bounds._southWest.lng), //x-min
        ],
        [
            Math.round(bounds._northEast.lat * 2) / 2, //y-max
            Math.round(bounds._northEast.lng), //x-max
        ],
    ];
    //Tunnista jos koordinaatit muodostavat pistemäisen tai yksiulotteisen alueen
    //Muuta koordinaattien alue ei-pistemäiseksi ja ei-yksiulotteiseksi
    if (roundedBounds[0][0] === roundedBounds[1][0]) {
        roundedBounds[0][0] -= 0.5;
        roundedBounds[1][0] += 0.5;
    }
    if (roundedBounds[0][1] === roundedBounds[1][1]) {
        roundedBounds[0][1] -= 1;
        roundedBounds[1][1] += 1;
    }

    //Tunnista jos koordinaatit eivät ole Digitraficin tukemalla alueella x:19-32, y:59-72
    if (
        roundedBounds[0][0] >= 59 &&
        roundedBounds[0][0] <= 72 &&
        roundedBounds[1][0] >= 59 &&
        roundedBounds[1][0] <= 72 &&
        roundedBounds[0][1] >= 19 &&
        roundedBounds[0][1] <= 32 &&
        roundedBounds[1][1] >= 19 &&
        roundedBounds[1][1] <= 32
    ) {
        setBounds(roundedBounds);
        setError();
    } else {
        setError("Kartan alue ei ole Digitrafficin tukema");
    }
};

export default setCustomBounds;
