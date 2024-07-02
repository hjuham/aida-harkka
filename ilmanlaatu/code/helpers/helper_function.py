import pandas as pd
import numpy as np

#Testitiedosto

def modify_dataframe(df):
    df['new_column'] = df['existing_column'] * 2


def calculate_routes(routes_3067,city_3067):
    routes_3067 = routes_3067.to_crs("EPSG:3067")
    city_3067 = city_3067.to_crs("EPSG:3067")

    # Kilometrin "buffer" alue havaintoasemalle
    city_3067["buffer1000"] = city_3067.geometry.buffer(1000)
    city_3067["buffer500"] = city_3067.geometry.buffer(500)
    city_3067["buffer100"] = city_3067.geometry.buffer(100)

    count1000 = 0
    count500 = 0
    count100 = 0

    cols = routes_3067.columns
    city_routes = pd.DataFrame(columns=cols)

    city_routes["1000m"] = ""
    city_routes["500m"] = ""
    city_routes["100m"] = ""


    for i in range(len(routes_3067)):
        if (routes_3067.iloc[i]["geometry"].intersects(city_3067['buffer1000']) | routes_3067.iloc[i]["geometry"].within(city_3067['buffer1000'])).any():
            city_routes.loc[i] = routes_3067.iloc[i]
            city_routes["1000m"].loc[i] = True
            count1000 += 1
            if (routes_3067.iloc[i]["geometry"].intersects(city_3067['buffer500']) | routes_3067.iloc[i]["geometry"].within(city_3067['buffer500'])).any():
                count500 += 1
                city_routes["500m"].loc[i] = True
                if (routes_3067.iloc[i]["geometry"].intersects(city_3067['buffer100']) | routes_3067.iloc[i]["geometry"].within(city_3067['buffer100'])).any():
                        count100 = 0
                        city_routes["100m"].loc[i] = True

    city_3067['Reitit(1000m)'] = count1000
    city_3067['Reitit(500m)'] = count500
    city_3067['Reitit(100m)'] = count100


    city_routes["500m"] = city_routes["500m"].fillna(False)
    city_routes["100m"] = city_routes["100m"].fillna(False)