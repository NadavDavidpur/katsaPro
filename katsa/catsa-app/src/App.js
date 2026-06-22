import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './componets/Login';
import Projects from './componets/Projects';
import Newproject from './componets/Projects/newProject';
import Project from './componets/Projects/project';
import Chat from './componets/Chat';
import Workers from './componets/workers';
import NewWorker from './componets/workers/newWorker';


function ProtectedRoute({ children }) {
    const { user } = useAuth();
    return user ? children : <Navigate to="/" replace />;
}


function AppRoutes() {
    const [projects, setProjects] = useState([]);
    const [workers, setWorkers] = useState(null);
    const [risks, setRisks] = useState(null);
    const [project, setProject] = useState(null);
    const [risksList, setRisksList] = useState([]);
    const [risk, setrisk] = useState(null);

    return (
        <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/projects" element={
                <ProtectedRoute>
                    <Projects projects={projects} setProjects={setProjects} setProject={setProject} project={project} />
                </ProtectedRoute>
            } />

            <Route path="/newProject" element={
                <ProtectedRoute>
                    <Newproject projects={projects} setProject={setProject} />
                </ProtectedRoute>
            } />

            <Route path="/project/:projectid" element={
                <ProtectedRoute>
                    <Project
                        project={project} setProject={setProject}
                        risks={risks} setRisks={setRisks}
                        setProjects={setProjects}
                        risksList={risksList} setRisksList={setRisksList}
                        risk={risk} setrisk={setrisk}
                    />
                </ProtectedRoute>
            } />

            <Route path="/project/:projectid/Risk/:riskid" element={
                <ProtectedRoute>
                    <Chat
                        project={project} setProject={setProject}
                        risksList={risksList} setRisksList={setRisksList}
                        risk={risk} setrisk={setrisk}
                    />
                </ProtectedRoute>
            } />

            <Route path="/workers" element={
                <ProtectedRoute>
                    <Workers workers={workers} setWorkers={setWorkers} />
                </ProtectedRoute>
            } />

            <Route path="/newWorker" element={
                <ProtectedRoute>
                    <NewWorker />
                </ProtectedRoute>
            } />
        </Routes>
    );
}


function App() {
    return (
        <AuthProvider>
            <Router>
                <AppRoutes />
            </Router>
        </AuthProvider>
    );
}

export default App;
