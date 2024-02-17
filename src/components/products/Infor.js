import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function Infor() {
    const [product, setProduct] = useState({});
    const [category, setCategory] = useState({});

    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8080/${id}`)
            .then(res => {
                setProduct(res.data);
                setCategory(res.data.category);
            })
            .catch(err => console.error(err))
    }, [id]);

    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
            <div className='w-50 border bg-secondary text-white p-5'>
                <h3>Thông tin sản phẩm</h3>
                <div className=' text-white'>
                    <div>
                        <label htmlFor="productName">Tên sản phẩm:</label>
                        <input type="text" name='productName' className='form-control'
                               value={product.productName}
                               disabled
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Thông tin:</label>
                        <input type="text" name='description' className='form-control'
                               value={product.description}
                               disabled
                        />
                    </div>
                    <div>
                        <label htmlFor="price">Giá:</label>
                        <input type="number" name='price' className='form-control'
                               value={product.price}
                               disabled
                        />
                    </div>
                    <div>
                        <label htmlFor="category">Thể loại:</label>
                        <input type="text" name='category' className='form-control'
                               value={category.name}
                               disabled
                        />
                    </div>
                    <div>
                        <label>Ảnh:</label>
                        <br />
                        {product.image && <img src={product.image} alt="Product" style={{ maxWidth: '60%' }} />}
                    </div>

                    <Link to={`/products/update/${id}`} className='btn btn-info'>Edit</Link>
                    <div className='d-flex justify-content-between'>
                        <Link to='/products' className='btn btn-success'>Back</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Infor;
