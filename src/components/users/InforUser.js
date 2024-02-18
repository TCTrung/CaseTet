import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useParams} from "react-router-dom";

const InforUser = () => {
    const [user, setUser] = useState([]);
    const [role, setRole] = useState({});

    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8080/users/${id}`)
            .then(res => {
                console.log(res);
                setUser(res.data);
                setRole(res.data.role);
            })
            .catch(err => console.error(err))
    }, [])

    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
            <div className='w-50 border bg-secondary text-black p-5'>
                <h3>Thông tin tài khoản</h3>
                <div className=' text-white'>
                    <div>
                        <label htmlFor="name">Tên nguời dùng:</label>
                        <input type="text" name='name' className='form-control'
                               value={user.name}
                               disabled={user.name}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="text" name='email' className='form-control'
                               value={user.email}
                               disabled={user.email}
                        />
                    </div>
                    <div>
                        <label htmlFor="username">Tài khoản:</label>
                        <input type="text" name='username' className='form-control'
                               value={user.username}
                               disabled={user.username}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Mật khẩu:</label>
                        <input type="text" name='password' className='form-control'
                               value={user.password}
                               disabled
                        />
                    </div>
                    <div>
                        <label htmlFor="role">Role:</label>
                        <input type="text" name='role' className='form-control'
                               value={role.name}
                               disabled
                        />
                    </div>

                    <Link to={`/users/update/${id}`} className='btn btn-info'>Edit</Link>
                    <div className='d-flex justify-content-between'>
                        <Link to='/users' className='btn btn-success'>Back</Link>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default InforUser;