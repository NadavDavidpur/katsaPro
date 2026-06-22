import os
import mysql.connector


def get_db():
    return mysql.connector.connect(
        host=os.environ.get("DB_HOST", "127.0.0.1"),
        user=os.environ.get("DB_USER", "root"),
        password=os.environ.get("DB_PASSWORD", ""),
        database=os.environ.get("DB_NAME", "Katsa"),
        auth_plugin='mysql_native_password'
    )


def query_to_js(columns_names, queries):
    query_json = []
    for row in queries:
        obj = {}
        for i, col in enumerate(columns_names):
            obj[col] = row[i]
        query_json.append(obj)
    return query_json


def projects_query():
    mydb = get_db()
    mycursor = mydb.cursor()
    sql = """SELECT project.*, Status.color, Status.status
             FROM project
             INNER JOIN Status ON Status.id = Project.StatusId"""
    mycursor.execute(sql)
    myresult = mycursor.fetchall()
    mydb.close()
    return query_to_js(
        ["id", "name", "contractorName", "supervisorName", "location",
         "description", "Tool", "StatusId", "inactive", "StatusColor", "StatusName"],
        myresult
    )


def UpdateProjectStatus(Id, StatusId):
    mydb = get_db()
    mycursor = mydb.cursor()
    sql = "UPDATE project SET StatusId=%s WHERE id=%s"
    mycursor.execute(sql, (StatusId, Id))
    mydb.commit()
    mydb.close()


def insert_newProject(name, contractorName, supervisorName, location, description, Tool):
    mydb = get_db()
    mycursor = mydb.cursor()
    sql = """INSERT INTO Project (name, contractorName, supervisorName, location, description, Tool, inactive, StatusId)
             VALUES (%s, %s, %s, %s, %s, %s, 1, 1)"""
    mycursor.execute(sql, (name, contractorName, supervisorName, location, description, Tool))
    mydb.commit()
    mydb.close()


def workers_query():
    mydb = get_db()
    mycursor = mydb.cursor()
    mycursor.execute("SELECT * FROM Worker")
    myresult = mycursor.fetchall()
    mydb.close()
    return query_to_js(["id", "name", "phone", "class", "isManager", "avatar", "isActive"], myresult)


def Status_query():
    mydb = get_db()
    mycursor = mydb.cursor()
    mycursor.execute("SELECT * FROM Status")
    myresult = mycursor.fetchall()
    mydb.close()
    return query_to_js(["id", "name", "color"], myresult)


def users_login(name, id):
    mydb = get_db()
    mycursor = mydb.cursor()
    sql = "SELECT id, name, avatar, isManager, isActive FROM Worker WHERE id=%s AND name=%s"
    mycursor.execute(sql, (id, name))
    myresult = mycursor.fetchall()
    mydb.close()
    return query_to_js(['id', 'name', 'avatar', 'isManager', 'isActive'], myresult)


def risks_query():
    mydb = get_db()
    mycursor = mydb.cursor()
    mycursor.execute("SELECT * FROM risk")
    myresult = mycursor.fetchall()
    mydb.close()
    return query_to_js(["id", "name", "inactive"], myresult)


def project_risk_query():
    mydb = get_db()
    mycursor = mydb.cursor()
    sql = """SELECT ProjectRisk.id, Project.id, Risk.name AS riskname,
                    Status.status, Status.id, ProjectRisk.inactive
             FROM ProjectRisk
             INNER JOIN Project ON Project.id = ProjectRisk.ProjectId
             INNER JOIN Risk ON Risk.id = ProjectRisk.RiskId
             INNER JOIN Status ON Status.id = ProjectRisk.status"""
    mycursor.execute(sql)
    myresult = mycursor.fetchall()
    mydb.close()
    return query_to_js(["id", "projectId", "RiskName", "status", "StatusId", "inactive"], myresult)


def UpdateRiskStatus(id):
    mydb = get_db()
    mycursor = mydb.cursor()
    sql = "UPDATE ProjectRisk SET Status=2 WHERE id=%s AND status != 4"
    mycursor.execute(sql, (id,))
    mydb.commit()
    mydb.close()


def changeRiskStatus(id):
    mydb = get_db()
    mycursor = mydb.cursor()
    sql = "UPDATE ProjectRisk SET Status=4 WHERE id=%s"
    mycursor.execute(sql, (id,))
    mydb.commit()
    mydb.close()


def delete_project_risk(id):
    mydb = get_db()
    mycursor = mydb.cursor()
    mycursor.execute("UPDATE ProjectRisk SET inactive=0 WHERE id=%s", (id,))
    mydb.commit()
    mycursor.execute("UPDATE Comment SET inactive=0 WHERE ProjectRiskId=%s", (id,))
    mydb.commit()
    mydb.close()


def insert_riskProject(projectid, riskname):
    mydb = get_db()
    mycursor = mydb.cursor()
    sql = """INSERT INTO ProjectRisk (projectId, RiskId, inactive, status)
             VALUES (%s, (SELECT id FROM Risk WHERE name=%s AND inactive=1), 1, 1)"""
    mycursor.execute(sql, (projectid, riskname))
    mydb.commit()
    mydb.close()


def newRisk(riskname):
    mydb = get_db()
    mycursor = mydb.cursor()
    sql = "INSERT INTO Risk (name, inactive) VALUES (%s, 1)"
    mycursor.execute(sql, (riskname,))
    mydb.commit()
    mydb.close()


def comment():
    mydb = get_db()
    mycursor = mydb.cursor()
    sql = """SELECT Comment.id, Comment.description, Worker.name AS workerName,
                    Comment.date, Comment.ProjectRiskId, Worker.avatar, Comment.inactive
             FROM Comment
             INNER JOIN Worker ON Worker.id = Comment.workerId
             INNER JOIN ProjectRisk ON ProjectRisk.id = Comment.ProjectRiskId
             ORDER BY date ASC"""
    mycursor.execute(sql)
    myresult = mycursor.fetchall()
    mydb.close()
    return query_to_js(['id', 'description', 'workerName', 'date', 'ProjectRiskId', 'avatar', 'inactive'], myresult)


def insert_comment(projectRiskId, description, workerName):
    mydb = get_db()
    mycursor = mydb.cursor()
    sql = """INSERT INTO comment (projectRiskId, description, workerId, inactive)
             VALUES (%s, %s, (SELECT id FROM Worker WHERE name=%s), 1)"""
    mycursor.execute(sql, (projectRiskId, description, workerName))
    mydb.commit()
    mydb.close()


def update_comment(body, id):
    mydb = get_db()
    mycursor = mydb.cursor()
    sql = "UPDATE comment SET description=%s WHERE id=%s"
    mycursor.execute(sql, (body, id))
    mydb.commit()
    mydb.close()


def Delete_comment(id):
    mydb = get_db()
    mycursor = mydb.cursor()
    sql = "UPDATE comment SET inactive=0 WHERE id=%s"
    mycursor.execute(sql, (id,))
    mydb.commit()
    mydb.close()


def Delete_worker(id):
    mydb = get_db()
    mycursor = mydb.cursor()
    sql = "UPDATE worker SET isActive=0 WHERE id=%s"
    mycursor.execute(sql, (id,))
    mydb.commit()
    mydb.close()


def insert_worker(name, id, phoneNumber, Class, profile, manager):
    mydb = get_db()
    isManager = 1 if manager else 0
    mycursor = mydb.cursor()
    sql = """INSERT INTO worker (id, name, phone, Class, avatar, isManager, isActive)
             VALUES (%s, %s, %s, %s, %s, %s, 1)"""
    mycursor.execute(sql, (id, name, phoneNumber, Class, profile, isManager))
    mydb.commit()
    mydb.close()
