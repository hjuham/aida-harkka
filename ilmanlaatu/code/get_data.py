
# Python skripti datan tallentamiseen student serverillä
# crontab -l (listaus) ja crontab -e (editointi) automatisointia varten
# Tallennus päivittäin
import requests # type: ignore
import json
from datetime import date
# Kaikki harjauskaluston suorittamat reitit
url = "https://tie.digitraffic.fi/api/maintenance/v1/tracking/routes?taskId=BRUSHING"
response = requests.get(url)

if response.status_code == 200:
    data = response.json()
   #Nimeä tiedosto päivän mukaan
    filename = f'public_html/api_calls/{date.today()}.json'
    with open(filename, 'w') as json_file:
        json.dump(data, json_file, indent=4)
    print(f'Data saved to {filename}')
else:
    print(f'Failed to retrieve data. Status code: {response.status_code}')