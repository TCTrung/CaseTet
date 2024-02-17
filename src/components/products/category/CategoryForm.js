import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function CategoryForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState('');

    useEffect(() => {
        if (id) {
            fetchCategory();
        }
    }, [id]);

    const fetchCategory = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/categories/${id}`);
            const category = response.data;
            setName(category.name);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const category = { name };

        try {
            if (id) {
                await axios.put(`http://localhost:8080/categories/edit/${id}`, category);
            } else {
                await axios.post('http://localhost:8080/categories/save', category);
            }
            navigate('/categories');
        } catch (error) {
            console.error(error);
        }
    };

    return (

        <div className='d-flex w-80 vh-80 justify-content-center align-items-center'>
        <div className='w-50 border bg-secondary text-white p-5'>
            <h1>{id ? 'Edit Category' : 'Create Category'}</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <button type="submit">{id ? 'Save Changes' : 'Create'}</button>
            </form>
        </div>
        </div>
    );
}

export default CategoryForm;