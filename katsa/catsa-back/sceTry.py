import json
import mysql.connector
import create_db

# from create_db import *
def query_to_js(columns_names, queries):
    query_json = []
    for j in range(len(queries)):
        query_json.append({})
        for i in range(len(columns_names)):
            # if query_json[j]=={}:
            query_json[-1][columns_names[i]] = queries[j][i]

        # query_json.append()
    return query_json
def first_query():
    mydb = mysql.connector.connect(
        host="176.230.179.199",
        user="Nadav",
        password="nadav6",
        database="plantpricerDB",
        auth_plugin='mysql_native_password'
    )
    mycursor = mydb.cursor()

        # sql = """select * from project inner """
    sql = """select * from items"""
    mycursor.execute(sql)
    myresult = mycursor.fetchall()
    return query_to_js(
        ["itemID", "Name", "Price"], myresult)


print(first_query())