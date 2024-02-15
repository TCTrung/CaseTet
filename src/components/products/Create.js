import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Create() {
    const [values, setValues] = useState({
        productName: '',
        description: '',
        price: '',
        category: '' // Thêm trường category vào state
    });

    const [categories, setCategories] = useState([]); // Danh sách thể loại

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch danh sách các thể loại từ backend khi component được render
        axios.get('http://localhost:8080/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const productData = {
            ...values,
            category: { id: values.category } // Chuyển đổi category sang đối tượng Category
        };
        axios.post('http://localhost:8080/saveProduct', productData)
            .then(res => {
                console.log(res);
                navigate('/products');
            })
            .catch(err => console.log(err));
    };


    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
            <div className='w-50 border bg-secondary text-white p-5'>
                <form onSubmit={handleSubmit}>
                    <h2>Thêm một sản phẩm</h2>
                    <div>
                        <label htmlFor='productName'>Tên sản phẩm:</label>
                        <input
                            type='text'
                            name='productName'
                            className='form-control'
                            onChange={(event) =>
                                setValues({ ...values, [event.target.name]: event.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label htmlFor='description'>Thông tin:</label>
                        <input
                            type='text'
                            name='description'
                            className='form-control'
                            onChange={(event) =>
                                setValues({ ...values, [event.target.name]: event.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label htmlFor='price'>Giá:</label>
                        <input
                            type='number'
                            name='price'
                            className='form-control'
                            onChange={(event) =>
                                setValues({ ...values, [event.target.name]: event.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label htmlFor='category'>Thể loại:</label>
                        <select
                            name='category'
                            className='form-control'
                            onChange={(event) =>
                                setValues({ ...values, [event.target.name]: event.target.value })
                            }
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
