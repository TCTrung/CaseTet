import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateUser = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        role: ''
    });

    const [roles, setRoles] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8080/users/${id}`)
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => console.error(err));

        axios
            .get('http://localhost:8080/roles')
            .then((res) => {
                setRoles(res.data);
            })
            .catch((err) => console.error(err));
    }, [id]);

    const handleUpdate = (event) => {
        event.preventDefault();
        const userUp = {
            ...user,
            role: { id: user.role } // Chuyển đổi role sang đối tượng Role
        };
        axios
            .put(`http://localhost:8080/editUser/${id}`, userUp)
            .then((res) => {
                navigate('/users');
            })
            .catch((err) => console.log(err));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    return (
        <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
            <div className="w-50 border bg-secondary text-white p-5">
                <form onSubmit={handleUpdate}>
                    <h2>Cập nhật người dùng</h2>
                    <div>
                        <label htmlFor="name">Tên:</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={user.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={user.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="username">Tên đăng nhập:</label>
                        <input
                            type="text"
                            name="username"
                            className="form-control"
                            value={user.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Mật khẩu:</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={user.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="role">Vai trò:</label>
                        <select
                            name="role"
                            className="form-control"
                            value={user.role}
                            onChange={handleChange}
                        >
                            <option value="">Chọn vai trò</option>
                            {roles.map((role) => (
                                <option key={role.id} value={role.id}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <br />
                    <button className="btn btn-info">Cập nhật</button>
                    <div className="d-flex justify-content-between">
                        <Link to="/users" className="btn btn-success">
                            Quay lại
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateUser;