# Tienhoito app

### `npm start`

Käynnistää sovelluksen paikallisesti. Hyödyntää Digitrafficin API:tä.

### `npm run start:local`

Käynnistää sovelluksen paikallisesti. Hyödyntää paikallisia tiedostoja `src/data`-kansiossa.

### `npm run build`

Rakentaa sovelluksen tuotantoa varten. Hyödyntää Digitrafficin API:tä

### `npm run build:local`

Rakentaa sovelluksen tuotantoa varten. Hyödyntää paikallisia tiedostoja `src/data`-kansiossa.

### `npm run cypress:open`

Käynnistää testauksen Cypress-testauskirjastolla. Testit on toteutettu paikallisilla tiedostoilla. `npm run start:local` käynnistää sovelluksen testausta varten.

## `/cypress`-kansio

### `/e2e`

E2E-testit eri komponenteille.

## `/public`-kansio

Reactin index.html-tiedosto ja sovelluksen ikonit.

## `/src`-kansio

### `/assets`

Kartassa ja muualla käytettävät ikonit ja kuvat

### `/components`

Sisältää sovelluksen komponentit ja `recharts`-kansion, jossa on Recharts kirjaston avulla luodut kuvaajat `StatBox.js`-komponentille

### `/contexts`

Sisältää `MapContext.js`, joka luo kontekstin lapsikomponenteille `App.js`-tiedostossa. Säilyttää ja mahdollistaa arvojen muuttamisen. Säilyttää ja muuttaa zoom-, sijainti- ja ladattavan alueen-arvoja.
kts. https://react.dev/reference/react/createContext

### `/data`

Sisältää dataa paikallisesti ajettavaa sovellusta varten (`routes.json`,`tasks.json`, `vehicles.json`) ja listauksen kaupungeista (`fi.json`) hakutoimintoa varten.

### `/pages`

Sisältää `react-router-dom`in käyttämät sivut elementteinseen. Määrittää karttasivuille käytettävän karttatyypin.
kts. https://reactrouter.com/en/main

### `/services`

Sisältää API-kutsut eri sisällöille. Tiedostoja kutsutaan `components/Map.js`-komponentissa. `fetchRoutes` noutaa reitit, `fetchVehicles` noutaa ajoneuvot ja `fetchTasks` tehtävätyypit.  
kts. https://tie.digitraffic.fi/swagger/#/Maintenance%20V1 rajapinnan dokumentointia varten.

### `/utils`

Apufunktiot `MapRoutes` ja `MapVehicles` reittien ja ajoneuvojen luontia varten karttapohjalle sekä muita apufunktioita.

### `App.css`

Sovelluksen tyylitiedosto. React className määrittelyllä.

### `App.js`

Sovelluskomponentti. Banner ja react-router-domin reitit, jotka ympäröity `<PositionProvider>` kontekstilla.

### `index.css`

Tyylien nollaus

### `index.js`

Juuritiedosto. StrictMode kehitystä ja bugien löytämistä varten kts. https://react.dev/reference/react/StrictMode

`react-router-dom` käyttää HashRouteria, koska julkaisualusta ei tue URL-polkuja.
kts. https://reactrouter.com/en/main/router-components/hash-router
