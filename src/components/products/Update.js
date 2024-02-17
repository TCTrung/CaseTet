import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Update() {
    const [product, setProduct] = useState({
        productName: '',
        description: '',
        price: '',
        category: '',
        image: '' // Thêm trường image vào state của sản phẩm
    });

    const [categories, setCategories] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null); // State để lưu file ảnh mới
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/${id}`)
            .then(res => {
                setProduct(res.data);
            })
            .catch(err => console.error(err));

        axios.get('http://localhost:8080/categories')
            .then(res => {
                setCategories(res.data);
            })
            .catch(err => console.error(err));
    }, [id]);

    const handleUpdate = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', selectedFile); // Thêm file ảnh vào formData nếu có
        formData.append('productName', product.productName);
        formData.append('description', product.description);
        formData.append('price', product.price);
        formData.append('category', product.category);
        formData.append('image', product.image); // Thêm trường image vào formData

        try {
            const res = await axios.put(`http://localhost:8080/editProduct/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate("/products");
        } catch (err) {
            console.log(err);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
    }

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
            <div className='w-50 border bg-secondary text-white p-5'>
                <form onSubmit={handleUpdate}>
                    <h2>Cập nhật sản phẩm</h2>
                    <div>
                        <label htmlFor="productName">Tên sản phẩm:</label>
                        <input type="text" name='productName' className='form-control'
                               value={product.productName}
                               onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Thông tin:</label>
                        <input type="text" name='description' className='form-control'
                               value={product.description}
                               onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="price">Giá:</label>
                        <input type="number" name='price' className='form-control'
                               value={product.price}
                               onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="image">Ảnh sản phẩm:</label>
                        <input type="file" name='image' className='form-control'
                               onChange={handleFileChange}
                        />
                        {product.image && <img src={product.image} alt="Product" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                    </div>
                    <div>
                        <label htmlFor="category">Thể loại:</label>
                        <select name="category" className='form-control' value={product.category} onChange={handleChange}>
                            <option value="">Chọn thể loại</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>

                    <br />
                    <button className='btn btn-info'>Submit</button>
                    <div className='d-flex justify-content-between'>
                        <Link to='/products' className='btn btn-success'>Back</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Update;
