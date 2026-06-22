import { useState } from "react";
import APIService from "../help/APIService";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import './style.css';


function Login() {
    const [fields, setFields] = useState({ username: '', id: '' });
    const [error, setError] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFields({ ...fields, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setError(false);
        try {
            const res = await APIService.login(fields);
            if (!res.data.userIn) {
                setError(true);
                return;
            }
            login(
                {
                    username: fields.username,
                    id: fields.id,
                    isManager: res.data.isManager,
                    avatar: res.data.avatar,
                    isActive: res.data.isActive,
                },
                res.data.access_token
            );
            navigate('/projects');
        } catch {
            setError(true);
        }
    };

    return (
        <div className="container login-page" dir="rtl">
            <div className="a">
                <div className="mb-4 text-center row my-auto mt-3">
                    <div className="col-6 text-center">
                        <label>שם משתמש</label>
                    </div>
                    <div className="col-6">
                        <input
                            type="text"
                            placeholder="username"
                            name="username"
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="mb-4 text-center row my-auto mt-3">
                    <div className="col-6 text-center">
                        <label>תעודת זהות</label>
                    </div>
                    <div className="col-6">
                        <input
                            type="text"
                            placeholder="id"
                            name="id"
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 text-center">
                        <button
                            type="button"
                            data-testid="login-btn"
                            className="btn btn-primary btn-block mb-4"
                            onClick={handleSubmit}
                        >
                            התחבר
                        </button>
                    </div>
                    {error && (
                        <div>
                            <span data-testid="error1" className="cl-red">
                                שם משתמש או תעודת זהות לא נכונה
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;
