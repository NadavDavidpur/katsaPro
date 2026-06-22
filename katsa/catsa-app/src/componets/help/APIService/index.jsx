import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000/";

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

class ApiServices {
    login(user) {
        return api.post('login', user);
    }
    projects() {
        return api.get('projects');
    }
    createProject(newproject) {
        return api.post('newProject', newproject);
    }
    UpdateProjectStatus(updateStatus) {
        return api.post('changeProjectStatus', updateStatus);
    }
    risks() {
        return api.get('risks');
    }
    ProjectRisk() {
        return api.get('ProjectRisk');
    }
    DeleteRisk(RiskId) {
        return api.post('deleteRisk', RiskId);
    }
    NewRiskProject(newRiskProject) {
        return api.post('newRiskProject', newRiskProject);
    }
    UpdateRiskStatus(riskId) {
        return api.post('UpdateRiskStatus', { riskid: riskId });
    }
    changeRiskStatus(riskId) {
        return api.post('changeRiskStatus', { riskid: riskId });
    }
    NewRisk(newRisk) {
        return api.post('newRisk', newRisk);
    }
    comments() {
        return api.get('comments');
    }
    newComment(newComment) {
        return api.post('newComment', newComment);
    }
    Status() {
        return api.get('Status');
    }
    updateCommon(update) {
        return api.post('updateCommon', update);
    }
    DeleteCommon(delete1) {
        return api.post('DeleteCommon', delete1);
    }
    workers() {
        return api.get('workers');
    }
    DeleteWorker(delete1) {
        return api.post('DeleteWorker', delete1);
    }
    newWorker(worker) {
        return api.post('newWorker', worker);
    }
}

export default new ApiServices();
