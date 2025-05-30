import pymysql
import json
from pymongo import MongoClient

#Conectar ao MySQL
def conectar_mysql():
    return pymysql.connect(
        host='db-hamburgueria.chamcyicu1eb.us-east-1.rds.amazonaws.com',
        user='admin',         
        password='pi-grupo8', 
        database='hamburgueria', 
        cursorclass=pymysql.cursors.DictCursor
    )

#Executar a consulta e salvar em JSON
def exportar_para_json(query, nome_arquivo='./extraidos/exportSql.json'):
    conexao = conectar_mysql()
    try:
        with conexao.cursor() as cursor:
            cursor.execute(query)
            resultados = cursor.fetchall()

        if not resultados:
            print("A consulta não retornou dados.")
            return None

        with open(nome_arquivo, 'w', encoding='utf-8') as f:
            json.dump(resultados, f, ensure_ascii=False, indent=4)

        print(f"Dados salvos em {nome_arquivo}")
        return nome_arquivo

    except Exception as e:
        print(f"Erro ao exportar para JSON: {e}")
    finally:
        conexao.close()

#Importar para MongoDB
def importar_para_mongo(nome_arquivo, nome_banco, nome_colecao):
    if not nome_arquivo:
        print("Nenhum arquivo JSON para importar.")
        return

    try:
        with open(nome_arquivo, 'r', encoding='utf-8') as f:
            dados = json.load(f)

        if not dados:
            print("Arquivo JSON está vazio.")
            return

        client = MongoClient('mongodb+srv://pedrofreitas:81599703jb@pi.gwulj0g.mongodb.net/')
        db = client[nome_banco]
        colecao = db[nome_colecao]

        if isinstance(dados, list):
            colecao.insert_many(dados)
        elif isinstance(dados, dict):
            colecao.insert_one(dados)
        else:
            print("Dados no JSON não estão em formato esperado (lista ou dicionário).")
            return

        print(f"Dados importados para MongoDB: {nome_banco}.{nome_colecao}")

    except Exception as e:
        print(f"Erro ao importar para MongoDB: {e}")

#Executar tudo junto
if __name__ == '__main__':
    consulta_sql = "SELECT * FROM funcionarios;"
    arquivo_json = exportar_para_json(consulta_sql)
    importar_para_mongo(arquivo_json, nome_banco='Datawarehouse', nome_colecao='Export_banco')
