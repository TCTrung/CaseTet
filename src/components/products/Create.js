import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Create() {
    const [values, setValues] = useState({
        productName: '',
        description: '',
        price: '',
        category: ''
    });

    const [selectedFile, setSelectedFile] = useState(null); // Thêm state để lưu trữ file ảnh được chọn
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', selectedFile); // Thêm file ảnh vào formData
        formData.append('productName', values.productName);
        formData.append('description', values.description);
        formData.append('price', values.price);
        formData.append('category', values.category);

        try {
            const res = await axios.post('http://localhost:8080/saveProduct', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res);
            navigate('/products');
        } catch (err) {
            console.log(err);
        }
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]); // Lưu file ảnh được chọn vào state
    };

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
            <div className='w-50 border bg-secondary text-black p-5'>
                <form onSubmit={handleSubmit}>
                    <h2>Thêm một sản phẩm</h2>
                    <div>
                        <label htmlFor='productName'>Tên sản phẩm:</label>
                        <input
                            type='text'
                            name='productName'
                            className='form-control'
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='description'>Thông tin:</label>
                        <input
                            type='text'
                            name='description'
                            className='form-control'
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='price'>Giá:</label>
                        <input
                            type='number'
                            name='price'
                            className='form-control'
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='image'>Hình ảnh:</label>
                        <input
                            type='file'
                            name='image'
                            className='form-control'
                            onChange={handleFileChange} // Thêm sự kiện để xử lý việc chọn file ảnh
                        />
                    </div>
                    <div>
                        <label htmlFor='category'>Thể loại:</label>
                        <select
                            name='category'
                            className='form-control'
                            onChange={handleChange}
                        >
                            <option value=''>Chọn thể loại</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <br />
                    <button className='btn btn-info'>Submit</button>
                    <div className='d-flex justify-content-between'>
                        <Link to='/products' className='btn btn-success'>
                            Back
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Create;
