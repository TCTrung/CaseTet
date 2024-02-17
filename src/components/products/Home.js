import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        axios.get('http://localhost:8080/')
            .then(res => {
                console.log(res);
                setProducts(res.data);
            })
            .catch(err => console.error(err))
    }, [])

    const handleSearch = () => {
        axios.get(`http://localhost:8080/searchProduct?productName=${searchTerm}`)
            .then(res => {
                console.log(res);
                setProducts(res.data);
            })
            .catch(err => console.error(err));
    };

    const handleDelete = (id) => {
        const confirm = window.confirm('Bạn chắc chắn muốn xóa sản phẩm này ?');
        if (confirm) {
            axios.delete(`http://localhost:8080/deleteProduct/${id}`)
                .then(res => {
                    alert("Xóa thành công !");
                    window.location.reload();
                })
                .catch(err => console.log(err))
        }
    };

    return (
        <>
            <h1>Danh Sách Sản Phẩm</h1>

            <div className="d-flex justify-content-between align-items-center">
                <Link to="/products/create" className="btn btn-success">Thêm sản phẩm mới</Link>
                <Link to="/categories" className="btn btn-success">Danh sách thể loại</Link>
                <div className="mb-3 d-flex align-items-center">
                    <input type="text" placeholder="Nhập tên sản phẩm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <button className="btn btn-sm btn-danger ml-2" onClick={handleSearch}>Tìm kiếm</button>
                </div>
            </div>
            <div>
                <table className='table table-striped'>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên sản phẩm</th>
                        <th>Mô tả</th>
                        <th>Giá</th>
                        <th>Thể loại</th>
                        <th>Ảnh</th>
                        <th>Thao tác</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                <Link to={`/products/read/${product.id}`}>{product.productName}</Link>
                            </td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.category.name}</td>
                            <td>
                                <img src={product.image} alt={product.productName} style={{ width: '100px' }} />
                            </td>
                            <td>
                                <Link to={`/products/update/${product.id}`} className='btn btn-sm btn-primary me-2'>Sửa</Link>
                                <button className='btn btn-sm btn-danger' onClick={() => handleDelete(product.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Home;