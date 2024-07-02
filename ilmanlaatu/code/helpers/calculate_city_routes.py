import pandas as pd
import numpy as np
from multiprocessing import Pool

#Funktio 10km säteellä olevien reittien hakemiseen
def calculate_city_routes(routes_3067,city_3067, city_routes):
    routes_3067 = routes_3067.to_crs("EPSG:3067")
    city_3067 = city_3067.to_crs("EPSG:3067")

    # 10 Kilometrin "buffer" alue kaupungille
    city_3067["buffer10k"] = city_3067.geometry.buffer(10000, resolution=4)
    city_3067["buffer500"] = city_3067.geometry.buffer(500, resolution=4)
    city_3067["buffer100"] = city_3067.geometry.buffer(100, resolution=4)

    count10k = 0
    count500 = 0
    count100 = 0

    for i in range(len(routes_3067)):
        if (routes_3067.iloc[i]["geometry"].intersects(city_3067['buffer10k']) | routes_3067.iloc[i]["geometry"].within(city_3067['buffer10k'])).any():
            city_routes.loc[i] = routes_3067.iloc[i]
            city_routes["10k"].loc[i] = True
            count10k += 1
            if (routes_3067.iloc[i]["geometry"].intersects(city_3067['buffer500']) | routes_3067.iloc[i]["geometry"].within(city_3067['buffer500'])).any():
                count500 += 1
                city_routes["500m"].loc[i] = True
                if (routes_3067.iloc[i]["geometry"].intersects(city_3067['buffer100']) | routes_3067.iloc[i]["geometry"].within(city_3067['buffer100'])).any():
                        count100 += 1
                        city_routes["100m"].loc[i] = True

    city_3067['Reitit(10k)'] = count10k
    city_3067['Reitit(500m)'] = count500
    city_3067['Reitit(100m)'] = count100


    city_routes["500m"] = city_routes["500m"].fillna(False)
    city_routes["100m"] = city_routes["100m"].fillna(False)