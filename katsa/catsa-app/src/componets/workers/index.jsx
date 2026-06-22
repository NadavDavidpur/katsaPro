import { useEffect } from "react";
import Loading from "../Loading";
import Navbar from "../Navbar";
import { FaPlus } from "react-icons/fa";
import APIService from "../help/APIService";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import './style.css';

function Workers({ workers, setWorkers }) {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleDelete = (id) => {
        APIService.DeleteWorker({ id }).then(res => {
            setWorkers(res.data);
        });
    };

    useEffect(() => {
        APIService.workers().then(res => {
            setWorkers(res.data);
        });
    }, []);

    return (
        <div>
            {user?.isActive ? (
                <div dir="rtl">
                    <Navbar />
                    <div className="workers-title">
                        <h1>עובדים</h1>
                        <button className="mt-2 btn-circle" onClick={() => navigate('/newWorker')}>
                            <FaPlus className='text-center' />
                        </button>
                    </div>
                    <div className="grid" dir="rtl">
                        {workers != null ? workers.map((worker) => (
                            <div key={worker.id} className="grid-item worker">
                                שם: {worker.name}<br />
                                תעודת זהות: {worker.id}<br />
                                מנהל: {worker.isManager === 1 ? 'כן' : 'לא'}<br />
                                מחלקה: {worker.class}<br />
                                פעיל: {worker.isActive === 1 ? 'כן' : 'לא'}<br />
                                {worker.isActive === 1 && (
                                    <button onClick={() => handleDelete(worker.id)} className="btn-primary btn">
                                        הפוך ללא פעיל
                                    </button>
                                )}
                            </div>
                        )) : <Loading />}
                    </div>
                </div>
            ) : (
                <div dir="rtl"><p>העובד לא פעיל</p></div>
            )}
        </div>
    );
}

export default Workers;
