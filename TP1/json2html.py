import json, os, shutil 
from Repair import Repair
from Intervention import Intervention
from Vehicle import Vehicle
from collections import defaultdict

def open_json(filename):
    with open(filename, encoding="utf-8") as f:
        data = json.load(f)
    return data 

def create_dir(relative_path):
    if not os.path.exists(relative_path):
        os.mkdir(relative_path)
    else: 
        shutil.rmtree(relative_path)
        os.mkdir(relative_path)

def create_file(filename, text):
    with open(filename, "w", encoding="utf-8") as file:
        file.write(text)


data = open_json("dataset_reparacoes.json")
repairs_data = data["reparacoes"]

repairs = {} # dics to store the number of each service type || {} nif -> Repair
vehicles_count = {} # {} (brand,model) -> num
services = {} # {} code -> Intervention
vehicle_reparations = defaultdict(list)

# pre-processing cycle
for r in repairs_data:
    repair = Repair(r["data"], r["nif"], r["nome"], r["viatura"]["marca"], r["viatura"]["modelo"], r["nr_intervencoes"])
    repairs[repair.nif] = repair
    
    vehicle_key = (r["viatura"]["marca"], r["viatura"]["modelo"])
    vehicles_count[vehicle_key] = vehicles_count.get(vehicle_key,0) + 1
    vehicle_reparations[vehicle_key].append(r)
    
    for s in r["intervencoes"]:
        code = s["codigo"]
        if code not in services:
            services[code] = Intervention(code, s["nome"], s["descricao"])
        
        services[code].repair_codes.append(repair.nif)

repairs_data.sort(key = lambda r: r["nif"])
create_dir("output")



repair_list_elements = ""

for r in sorted(repairs.values(), key=lambda x: x.nif):
    repair_html= f'''
    <!DOCTYPE html>
    <html>
        <head>
            <title>{r.nif}</title>
            <meta charset="utf-8"/>
        </head>
        <body>
            <h2>Ficha de Reparação</h2>
            <table border="1">
                <tr><td>nif</td><td>{r.nif}</td>
                <tr><td>name</td><td>{r.name}</td>
                <tr><td>date</td><td>{r.date}</td>
                <tr><td>brand</td><td>{r.brand}</td>
                <tr><td>model</td><td>{r.model}</td>
                <tr><td>Number of Interventions</td><td>{r.num_services}</td>
            </table>
        </body>
        <hr/>
        <address>
            <a href="index.html>Voltar ao indice</a>
        </address>
    </html>
    '''
    repair_list_elements += f'''
        <li>
            {r.date} - 
            <a href="{r.nif}.html"><strong>{r.nif}</strong></a> - 
            {r.name} - 
            {r.brand} {r.model} - 
            {r.num_services} intervenções
        </li>
    '''
    create_file(f"./output/{r.nif}.html", repair_html)

for s in services.values():
    aux = ""
    for r_code in sorted(s.repair_codes):
        aux += f'''
            <li><a href="{repairs[r_code].nif}.html">NIF: {repairs[r_code].nif}</a></li>
            
        '''
    
    service_html = f'''
    <!DOCTYPE html>
    <html>
        <head>
            <title>{s.code}</title>
            <meta charset="utf-8"/>
        </head>
        <body>
            <h2>Descrição de Serviço</h2>
            <table border="1">
                <tr><td>code</td><td>{s.code}</td>
                <tr><td>description</td><td>{s.description}</td>
                <tr><td>date</td><td>{s.name}</td>
            </table>
            <hr/>
            <h3>Realizado em:</h3>
            <ul>
                {aux}
            </ul>
        </body>
        <hr/>
        <address>
            <a href="index.html>Voltar ao indice</a>
        </address>
    </html>
    '''
    create_file(f"./output/{s.code}.html",service_html)


for (brand, model),repair_list in vehicle_reparations.items():
    r_list_element = ""
    for r in repair_list:
        r_list_element += f'''
            <li><a href="{r['nif']}.html">Reparação: {r['nif']}</a></li>
        '''
    
    vehicle_html = f'''
    <!DOCTYPE html>
    <html>
        <head>
            <title>{brand} {model}</title>
            <meta charset="utf-8"/>
        </head>
        <body>
            <h2>{brand} {model}</h2>
            <table>
                <tr><td>Marca</td><td>{brand}</td>
                <tr><td>Modelo</td><td>{model}</td>
                <tr><td>Nº Intervenções</td><td>{vehicles_count[(brand,model)]}</td>
            </table>
        </body>
        <hr/>
        <h3>Lista de intervenções</h3>
        <ul>
            {r_list_element}
        </ul>
        <hr/>
        <address>
            <a href="index.html>Voltar ao indice</a>
        </address>
    </html>
    '''
    create_file(f"./output/{brand}{model}.html",vehicle_html)



repair_html = f'''
<!DOCTYPE html>
<html>
    <head>
        <title>Lista de reparações</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h2>Lista de Reparações</h2>
        <ul>
            {repair_list_elements}
        </ul>
    </body>
    <address>
        <a href="index.html>Voltar ao indice</a>
    </address>
</html>
'''    
create_file("./output/repairs.html",repair_html)



services_list_elements = ""

for s in sorted(services.values(), key=lambda x: x.code):
    services_list_elements += f'''
        <li>
            <a href="{s.code}.html"><strong>{s.code}</strong></a> 
            - {s.name} 
            <br>
            <small><em>{s.description}</em></small>
        </li>
    '''

services_page_html = f'''
<!DOCTYPE html>
<html>
    <head>
        <title>Lista de Serviços</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h2>Tipos de Intervenção</h2>
        <ul>
            {services_list_elements}
        </ul>
        <hr/>
        <address>
            <a href="index.html">Voltar ao índice</a>
        </address>
    </body>
</html>
'''
create_file("./output/services.html", services_page_html)


vehicle_list_elements = ""

for (brand, model) in sorted(vehicles_count.keys()):
    filename = f"{brand}{model}.html"
    count = vehicles_count[(brand, model)]
    
    vehicle_list_elements += f'''
        <li>
            <a href="{filename}"><strong>{brand} {model}</strong></a> 
            - {count} carros
        </li>
    '''

vehicles_page_html = f'''
<!DOCTYPE html>
<html>
    <head>
        <title>Lista de Veículos</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h2>Marcas e Modelos Intervencionados</h2>
        <ul>
            {vehicle_list_elements}
        </ul>
        <hr/>
        <address>
            <a href="index.html">Voltar ao índice</a>
        </address>
    </body>
</html>
'''
create_file("./output/vehicles.html", vehicles_page_html)

index_html = f'''
<!DOCTYPE html>
<html>
    <head>
        <title>Página Inicial de Repações Automóveis</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h3>Listas de Reparações Automóveis</h3>
        <ul>
            <li>
                <a href="repairs.html">Listagem das Reparações</a>
            </li>
            <li>
                <a href="services.html">Listagem das Reparações</a>
            </li>
            <li>
                <a href="vehicles.html">Listagem dos veiculos</a>
            </li>
        </ul>
    </body>
</html>
'''
create_file("./output/index.html", index_html)
    