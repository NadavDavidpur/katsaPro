from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify, after_this_request
from flask_cors import CORS, cross_origin
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
import json

from flask_restful import Api
# from mobile_resources.events import UserMobile
import sqlite3,flask_sqlalchemy
import json
import mysql.connector
import create_db

# from create_db import *

mydb = mysql.connector.connect(
    host='127.0.0.1',
    user="root",
    password="NadavD3203",
    database="Katsa",
    auth_plugin='mysql_native_password'
)

app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'
# app.config["SESSION_PERMANENT"] = False
# app.config["SESSION_TYPE"] = "filesystem"

app.config['SESSION_PERMANENT'] = False
app.config['SESSION_TYPE'] = 'filesystem'
# app.secret_key = 'secret key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:NadavD3203@127.0.0.1/Katsa'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # השבתת התראות לא נחוצות

db = SQLAlchemy(app)
Session(app)


# jsonify(create_db.projects_query(mydb))
@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    response = request.json

    # response.headers.add('Access-Control-Allow-Origin', '*')mydb,

    users_login = create_db.users_login(response['username'], response['id'])

    if len(users_login) == 1:

        user_in = 'True'

        return {'userIn': user_in, 'avatar': users_login[0]['avatar'], "isManager": users_login[0]['isManager'],
                "isActive": users_login[0]['isActive']}
    else:
        user_in = 'False'
        return {'userIn': user_in}


@app.route('/deleteRisk', methods=['POST'])
@cross_origin()
def deleteRisk():
    response = request.json
    create_db.delete_project_risk(response['id'])

    response1 = (create_db.project_risk_query())
    # response.headdeleteRiskers.add('Access-Control-Allow-Origin', '*')
    # response1.headers.add('Access-Control-Allow-Origin', '*')
    # print(json.dumps(response1))
    return json.dumps(response1)

    # response.headers.add('Access-Control-Allow-Origin', '*')mydb,


@app.route('/newRiskProject', methods=['POST'])
@cross_origin()
def newRiskProject():
    response = request.json
    create_db.insert_riskProject(response['projectId'], response['RiskName'])
    response1 = (create_db.project_risk_query())
    # response.headdeleteRiskers.add('Access-Control-Allow-Origin', '*')
    # response1.headers.add('Access-Control-Allow-Origin', '*')
    # print(json.dumps(response1))
    return json.dumps(response1)


@app.route('/UpdateRiskStatus', methods=['POST'])
@cross_origin()
def UpdateRiskStatus():
    response = request.json
    print(33)
    create_db.UpdateRiskStatus(response['riskid'])
    response1 = (create_db.project_risk_query())
    # response.headdeleteRiskers.add('Access-Control-Allow-Origin', '*')
    # response1.headers.add('Access-Control-Allow-Origin', '*')
    # print(json.dumps(response1))
    return json.dumps(response1)


@app.route('/changeRiskStatus', methods=['POST'])
@cross_origin()
def changeRiskStatus():
    response = request.json

    create_db.changeRiskStatus(response['riskid'])
    response1 = (create_db.project_risk_query())
    # response.headdeleteRiskers.add('Access-Control-Allow-Origin', '*')
    # response1.headers.add('Access-Control-Allow-Origin', '*')
    # print(json.dumps(response1))
    return json.dumps(response1)


# mydb,
@app.route('/newRisk', methods=['POST'])
@cross_origin()
def newRisk():
    response = request.json
    create_db.newRisk(response['RiskName'])
    return '1'


# @app.route('/delete', methods=['GET'])
# def delete():
#     @after_this_request
#     def add_header(response):
#         response.headers['Access-Control-Allow-Origin'] = '*'
#         return response
#
#     if request.method == 'GET':
#
#         return jsonify(name="nas")


@app.route('/workers', methods=['GET'])
# @cross_origin()mydb
def workers():
    response = jsonify(create_db.workers_query())
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/projects', methods=['GET'])
# @cross_origin()mydb
def projects():
    response = jsonify(create_db.projects_query())
    # print(response)
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


@app.route('/newProject', methods=['POST'])
@cross_origin()
def NewProject():
    req = request.json
    print(req)
    create_db.insert_newProject(req['projectname'], req['contractorname'], req['supervisorName'], req['location_project'],
                                req['description'], req['Tool'])
    response = jsonify(create_db.projects_query())
    return response


@app.route('/risks', methods=['GET'])
# @cross_origin()mydb
def risks():
    response = jsonify(create_db.risks_query())
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/ProjectRisk', methods=['GET'])
# @cross_origin()mydb
def project_risk():
    response = jsonify(create_db.project_risk_query())
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/Status', methods=['GET'])
# @cross_origin()mydb
def Status():
    response = jsonify(create_db.Status_query())
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/comments', methods=['GET'])
# @cross_origin()mydb
def comment():
    response = jsonify(create_db.comment())
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/newComment', methods=['POST'])
@cross_origin()
def newComment():
    response = request.json
    # projectRiskId, description, workerName
    # print(response['workerName'])
    create_db.insert_comment(response['ProjectRiskId'], response['description'], response['workerName'])

    response = jsonify(create_db.comment())
    # response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/updateCommon', methods=['POST'])
@cross_origin()
def updateCommon():
    response = request.json
    print(response)
    # projectRiskId, description, workerName
    # print(response['workerName'])
    create_db.update_comment(response['body'], response['id'])

    return "update"


@app.route('/DeleteCommon', methods=['POST'])
@cross_origin()
def DeleteCommon():
    response = request.json
    print(response)
    # projectRiskId, description, workerName
    # print(response['workerName'])
    create_db.Delete_comment(response['id'])

    # print(1)

    return "delete"


@app.route('/DeleteWorker', methods=['POST'])
@cross_origin()
def DeleteWorker():
    response = request.json

    create_db.Delete_worker(response['id'])
    response = create_db.workers_query()
    # print(1)
    # print(response)
    return jsonify(response)


@app.route('/newWorker', methods=['POST'])
@cross_origin()
def new_worker():
    response = request.json
    # print(response)
    create_db.insert_worker(response['Name'], response['Id'], response['PhoneNumber'], response['Class'],
                            response['img'], response['manager'])
    return "successes"


@app.route('/changeProjectStatus', methods=['POST'])
@cross_origin()
def changeProjectStatus():
    response = request.json
    create_db.UpdateProjectStatus(response['Id'], response['StatusId'])
    response = jsonify(create_db.projects_query())
    # print(response)
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


if __name__ == "__main__":
    # db.create_all()
    # app.run(host='10.100.102.17', debug=True)
    # app.run(host='172.20.10.2', debug=True)

     app.run(host='172.19.34.128', debug=True)