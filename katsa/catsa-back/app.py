import os
from dotenv import load_dotenv
load_dotenv()

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import create_db

app = Flask(__name__)

CORS(app, origins=["http://localhost:3000", "http://127.0.0.1:3000"], supports_credentials=True)

app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY", "dev-jwt-secret-change-in-prod")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = False  # token לא פג תוקף (אפשר לשנות ל-timedelta)

jwt = JWTManager(app)


@app.route('/login', methods=['POST'])
def login():
    body = request.json
    users = create_db.users_login(body.get('username', ''), body.get('id', ''))

    if len(users) != 1:
        return jsonify({"userIn": False}), 401

    user = users[0]
    if not user['isActive']:
        return jsonify({"userIn": False, "reason": "inactive"}), 401

    token = create_access_token(identity={
        "id": user['id'],
        "name": user['name'],
        "isManager": bool(user['isManager']),
        "avatar": user['avatar']
    })

    return jsonify({
        "userIn": True,
        "access_token": token,
        "avatar": user['avatar'],
        "isManager": bool(user['isManager']),
        "isActive": bool(user['isActive'])
    })


@app.route('/projects', methods=['GET'])
@jwt_required()
def projects():
    return jsonify(create_db.projects_query())


@app.route('/newProject', methods=['POST'])
@jwt_required()
def NewProject():
    req = request.json
    create_db.insert_newProject(
        req['projectname'], req['contractorname'], req['supervisorName'],
        req['location_project'], req['description'], req['Tool']
    )
    return jsonify(create_db.projects_query())


@app.route('/changeProjectStatus', methods=['POST'])
@jwt_required()
def changeProjectStatus():
    body = request.json
    create_db.UpdateProjectStatus(body['Id'], body['StatusId'])
    return jsonify(create_db.projects_query())


@app.route('/workers', methods=['GET'])
@jwt_required()
def workers():
    return jsonify(create_db.workers_query())


@app.route('/newWorker', methods=['POST'])
@jwt_required()
def new_worker():
    body = request.json
    create_db.insert_worker(
        body['Name'], body['Id'], body['PhoneNumber'],
        body['Class'], body['img'], body['manager']
    )
    return jsonify({"success": True})


@app.route('/DeleteWorker', methods=['POST'])
@jwt_required()
def DeleteWorker():
    body = request.json
    create_db.Delete_worker(body['id'])
    return jsonify(create_db.workers_query())


@app.route('/risks', methods=['GET'])
@jwt_required()
def risks():
    return jsonify(create_db.risks_query())


@app.route('/newRisk', methods=['POST'])
@jwt_required()
def newRisk():
    body = request.json
    create_db.newRisk(body['RiskName'])
    return jsonify({"success": True})


@app.route('/deleteRisk', methods=['POST'])
@jwt_required()
def deleteRisk():
    body = request.json
    create_db.delete_project_risk(body['id'])
    return jsonify(create_db.project_risk_query())


@app.route('/ProjectRisk', methods=['GET'])
@jwt_required()
def project_risk():
    return jsonify(create_db.project_risk_query())


@app.route('/newRiskProject', methods=['POST'])
@jwt_required()
def newRiskProject():
    body = request.json
    create_db.insert_riskProject(body['projectId'], body['RiskName'])
    return jsonify(create_db.project_risk_query())


@app.route('/UpdateRiskStatus', methods=['POST'])
@jwt_required()
def UpdateRiskStatus():
    body = request.json
    create_db.UpdateRiskStatus(body['riskid'])
    return jsonify(create_db.project_risk_query())


@app.route('/changeRiskStatus', methods=['POST'])
@jwt_required()
def changeRiskStatus():
    body = request.json
    create_db.changeRiskStatus(body['riskid'])
    return jsonify(create_db.project_risk_query())


@app.route('/comments', methods=['GET'])
@jwt_required()
def comment():
    return jsonify(create_db.comment())


@app.route('/newComment', methods=['POST'])
@jwt_required()
def newComment():
    body = request.json
    create_db.insert_comment(body['ProjectRiskId'], body['description'], body['workerName'])
    return jsonify(create_db.comment())


@app.route('/updateCommon', methods=['POST'])
@jwt_required()
def updateCommon():
    body = request.json
    create_db.update_comment(body['body'], body['id'])
    return jsonify({"success": True})


@app.route('/DeleteCommon', methods=['POST'])
@jwt_required()
def DeleteCommon():
    body = request.json
    create_db.Delete_comment(body['id'])
    return jsonify({"success": True})


@app.route('/Status', methods=['GET'])
@jwt_required()
def Status():
    return jsonify(create_db.Status_query())


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
