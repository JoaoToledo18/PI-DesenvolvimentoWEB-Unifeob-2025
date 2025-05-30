import pandas as pd
from pymongo import MongoClient

def importar_csv_para_mongo(arquivo_csv, nome_banco, nome_colecao):
    try:

        dados = pd.read_csv(arquivo_csv)


        dados_json = dados.to_dict(orient='records')


        client = MongoClient('mongodb+srv://pedrofreitas:81599703jb@pi.gwulj0g.mongodb.net/')
        db = client[nome_banco]
        colecao = db[nome_colecao]


        if dados_json:
            colecao.insert_many(dados_json)
            print(f"Dados do CSV importados para MongoDB: {nome_banco}.{nome_colecao}")
        else:
            print("CSV está vazio!")

    except Exception as e:
        print(f"Erro ao importar CSV para MongoDB: {e}")

if __name__ == '__main__':

    importar_csv_para_mongo(
        arquivo_csv='./fontes/pedidos.csv',
        nome_banco='Datawarehouse',
        nome_colecao='Export_csv'
    )
