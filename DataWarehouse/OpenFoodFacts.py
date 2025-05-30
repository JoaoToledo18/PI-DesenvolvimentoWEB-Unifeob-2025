import json
from pymongo import MongoClient

def importar_jsonl_para_mongo(caminho_jsonl, nome_banco, nome_colecao, limite=3000):
    cliente = MongoClient('mongodb+srv://pedrofreitas:81599703jb@pi.gwulj0g.mongodb.net/')
    db = cliente[nome_banco]
    colecao = db[nome_colecao]

    documentos = []
    with open(caminho_jsonl, 'r', encoding='utf-8') as arquivo:
        for i, linha in enumerate(arquivo):
            if i >= limite:
                break
            try:
                documento = json.loads(linha.strip())
                documentos.append(documento)
            except json.JSONDecodeError as e:
                print(f"Erro ao decodificar a linha {i}: {e}")

    if documentos:
        resultado = colecao.insert_many(documentos)
        print(f"{len(resultado.inserted_ids)} documentos inseridos.")
    else:
        print("Nenhum documento válido foi encontrado.")

# Exemplo de uso
importar_jsonl_para_mongo("./fontes/openfoodfacts-products.jsonl", "DataWarehouse", "OpenFood", limite=3000)
