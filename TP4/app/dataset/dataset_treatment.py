import json

original_file = 'emd.json' 
new_file = 'emd_fixed.json'           
endpoint = 'emds'           

try:
    with open(original_file, 'r', encoding='utf-8') as f:
        lista_de_objetos = json.load(f)

    for obj in lista_de_objetos:
        if 'nome' in obj and isinstance(obj['nome'], dict):
            primeiro = obj['nome'].get('primeiro', '')
            ultimo = obj['nome'].get('último', '') 
            
            obj['nome'] = f"{primeiro} {ultimo}".strip()

        if '_id' in obj:
            obj['id'] = obj.pop('_id')
            
        obj.pop('index', None)
    nova_estrutura = {
        endpoint: lista_de_objetos
    }

    with open(new_file, 'w', encoding='utf-8') as f:
        json.dump(nova_estrutura, f, indent=2, ensure_ascii=False)
        
    print(f"Ficheiro '{new_file}' criado com sucesso!")
    print("Nomes unificados e identificadores '_id' alterados para 'id'.")
    print("Campo index removido")

except FileNotFoundError:
    print(f"Erro: O ficheiro '{original_file}' não foi encontrado.")
except json.JSONDecodeError:
    print("Erro: O ficheiro original não parece ser um JSON válido.")