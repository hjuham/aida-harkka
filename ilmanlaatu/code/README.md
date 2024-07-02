## Ympäristö

[requirements.txt](./requirements.txt) sisältää ohjeet projektia vastaavan Anaconda-ympäristön luomiseksi (saattaa sisältää ylimääräisiä paketteja)

## Data

Harjausdata on tallennettu UTC:nä! https://www.ilmatieteenlaitos.fi/havaintojen-lataus käyttää oletuksena paikallista aikaa!

## Tiedostojen riippuvuudet ja muut tiedot

### `get_data.py`

Yksilöity tiedosto harjausdatan tallentamiseksi student-palvelimella. Luo JSON-tiedoston ja nimeää päivämäärän mukaisesti `public_html/api_calls/{date.today()}.json` mukaisesti

### `create_dataframe.ipynb`

Luo dataframen ja tästä CSV-tiedoston [./data/brushing_data.csv](./data/brushing_data.csv) edellä mainituista JSON-tiedostoista. JSON-tiedostojen sijainti paikallisesti [../data](../data/).

### `brushing.ipynb`

Tuottaa tietoa harjausreiteistä.  
Käyttää edellä mainittua [./data/brushing_data.csv](./data/brushing_data.csv)

### `maps.ipynb`

Tuottaa karttoja harjausreiteistä  
Vaaditut tiedostot:

-   [../data/2024-04-08.json](../data/2024-04-08.json) yhden päivän datan tarkasteluun
-   [./data/suomi.geojson](./data/suomi.geojson) kartan muodostamiseen
-   [../data](../data) kansio json tiedostoineen

### `stations_and_routes.ipynb`

Tuottaa kartan ja dataa harjausreittien lähellä sijatsevista havaintoasemista
Vaaditut tiedostot:

-   [./data/stations.txt](./data/stations.txt) tuottaa [./data/parsed_stations.csv](./data/parsed_stations.csv)
-   [./data/parsed_stations.csv](./data/parsed_stations.csv) havaintoasemien koordinaatteja varten
-   [../data](../data) kansio json tiedostoineen
-   [./data/suomi.geojson](./data/suomi.geojson) kartan muodostamiseen
