#Funktio reittien lataamiseen GeoPandasille. 
# %%
def load_routes(gdfs, dfs):
    import pandas as pd
    import geopandas as gpd
    import json
    from shapely.geometry import Point
    import warnings
    warnings.filterwarnings('ignore')
    import os
    json_dir = '../../data'
    for filename in os.listdir(json_dir):
        if filename.endswith('.json'):
            filepath = os.path.join(json_dir, filename)
            response = open(filepath)
            data = json.load(response)
            df = pd.json_normalize(data["features"], max_level=10)
            gdf = gpd.read_file(filepath)
            gdf = gdf.to_crs('EPSG:4326')
            dfs.append(df)
            gdfs.append(gdf)


