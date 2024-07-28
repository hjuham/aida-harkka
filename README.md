# Tienhoito

## Sisältö

Repositorio sisältää teiden kunnossapidon visualisointiin toteutetun web-sovelluksen sekä raportin ja toteutuksen ilmanlaadun ja kunnossapidon korrelaatiosta.

-   [Sovellus](app)
-   [Ilmanlaaturaportti ja toteutus](ilmanlaatu)

## Teknologiat

Kaluston liikkumisen visualisointi on [Reactilla](https://react.dev/) toteutettu web-sovellus, joka hyödyntää [Leaflet](https://leafletjs.com/)- ja [React Leaflet](https://react-leaflet.js.org/)-kirjastoja visualisoimaan huoltokaluston liikkeet toimeksiannon mukaisesti. Toteutuksen data on peräisin [Digitrafficin rajapinnasta](https://www.digitraffic.fi/tieliikenne/#maanteiden-kunnossapitotiedot), josta löytyy tarkemmat [Swagger-kuvaukset](https://tie.digitraffic.fi/swagger/#/Maintenance%20V1). Toteutus hyödyntää [OpenStreetMappia](https://www.openstreetmap.org/) karttapohjana.

Ilmanlaatua käsittelevät koodit hyödyntävät edellä mainittujen teknologioiden lisäksi pitkälti [Pandas](https://pandas.pydata.org/)- ja [GeoPandas](https://geopandas.org/en/stable/)-kirjastoja.

## Tienhoito web-sovellus

Sovellusta voi kokeilla osoitteessa: https://hjuham.github.io/aida-harkka/

## Toimeksianto

### Teiden kunnossapito

Teiden kunnossapidosta on saatavilla reaaliaikaisia dataa Digitrafficin kautta. https://www.digitraffic.fi/tieliikenne/#maanteiden-kunnossapitotiedot Tutustu saatavilla olevaan dataan ja valitse yksi tai useampi alla kuvattu ongelma työstettäväksi. Voit myös yhdistää useampia ongelmia/tavoitteita samaan toteutukseen, mikäli tämä on toteutettavissa ja toteutus näyttää järkevältä.

#### Kaluston liikkumisen visualisointi (Jyväskylän) teille

Tavoite:

-   Käyttäjä näkee missä kadut on keväisin puhdistettu hiekasta. (Käyttäjä saa informaatiota ilmanlaadusta ja teiden kunnosta. Missä päin mahdollisesti on vähiten katupölyä ja missä voi lähteä rullaluistelemaan, -hiihtämään, jne.)
-   Käyttäjä näkee missä kadut on aurattu.
-   Käyttäjä näkee missä kadut on hiekoitettu.

#### Ilmanlaadun ja kunnossapidon korrelaatio

Tutki mistä kaupungeista on mahdollista saada ilmanlaadun mittaustietoja ja mistä kaupungeista saa teiden kunnossapitodataa. Datasta ei välttämättä ole historiatietoja saatavilla, minkä takia voit joutua keräämään dataa tietokantaan. Kokoa dataa kevätkuukausien ajalta ja tutki onko teiden kunnossapidolla yhteyttä ilmanlaatuun. Huomaa että ilmanlaatuun vaikuttaa vahvasti myös sää.
