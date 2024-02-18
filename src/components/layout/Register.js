import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        role: ''
    });

    const [roles, setRoles] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch danh sách các thể loại từ backend khi component được render
        axios.get('http://localhost:8080/roles')
            .then(response => {
                setRoles(response.data);
            })
            .catch(error => {
                console.error('Error fetching roles:', error);
            });
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            ...values,
            role: { id: values.role }
        };
        axios.post('http://localhost:8080/saveUser', userData)
            .then(res => {
                console.log(res);
                navigate('/users');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
            <div className='w-50 border bg-secondary text-black p-5'>
                <form onSubmit={handleSubmit}>
                    <h2>Thêm một tài khoản</h2>
                    <div>
                        <label htmlFor='productName'>Tên người dùng:</label>
                        <input
                            type='text'
                            name='name'
                            className='form-control'
                            onChange={(event) =>
                                setValues({ ...values, [event.target.name]: event.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label htmlFor='description'>Email:</label>
                        <input
                            type='text'
                            name='email'
                            className='form-control'
                            onChange={(event) =>
                                setValues({ ...values, [event.target.name]: event.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label htmlFor='price'>Tài Khoản:</label>
                        <input
                            type='text'
                            name='username'
                            className='form-control'
                            onChange={(event) =>
                                setValues({ ...values, [event.target.name]: event.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label htmlFor='price'>Mật Khẩu:</label>
                        <input
                            type='password'
                            name='password'
                            className='form-control'
                            onChange={(event) =>
                                setValues({ ...values, [event.target.name]: event.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label htmlFor='role'>Role:</label>
                        <select
                            name='role'
                            className='form-control'
                            onChange={(event) =>
                                setValues({ ...values, [event.target.name]: event.target.value })
                            }
                        >
                            <option value=''>Chọn thể loại</option>
                            {roles.map((role) => (
                                <option key={role.id} value={role.id}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <br />
                    <button className='btn btn-info'>Submit</button>
                    <div className='d-flex justify-content-between'>
                        <Link to='/users' className='btn btn-success'>
                            Back
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;