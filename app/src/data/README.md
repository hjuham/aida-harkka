#### Data

Tämä datasetti (`routes.json` ja `vehicles.json`) sisältää Jyväskylän alueella suoritetut aurausreitit 25.3.2024. Dataa voidaan käyttää sovelluksen testaamiseen `npm run start:local`-komennolla, jos rajapinnassa olevaa dataa ei ole saatavilla. `fi.json`-tiedostoa käytetään Suomen kaupunkien listaamiseen ja kartan siirtämiseen kaupunkia vastaaviin koordinaatteihin.

Sovelluksen testit on suunniteltu käytettäväksi paikallisella datalla, jotta Digitraficin rajapintaa ei kuormitettaisi tarpeettomasti ja testien luotettavuuden parantamiseksi.

`tasks.json` sisältää paikallisen version rajapinnan käyttämistä tehtävänimikkeistä. Nouto normaalisti `servces/fetchRoutes`-tiedostolla.
