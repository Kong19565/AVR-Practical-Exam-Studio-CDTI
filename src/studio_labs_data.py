# Labs data for the 80 practical exam scenarios
import os

json_path = os.path.join(os.path.dirname(__file__), 'studio_labs_data.json')
with open(json_path, 'r', encoding='utf-8') as f_in:
    _data = f_in.read()

LABS_DATA_JS = 'const LABS_DATA = ' + _data + ';\n'
