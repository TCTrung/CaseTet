import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const ListCategory = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8080/categories');
            setCategories(response.data);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div>
            <h1>Danh sách thể loại</h1>
            <div className="d-flex justify-content-between align-items-center">
                <Link to="/categories/create" className="btn btn-success">Thêm sản phẩm mới</Link>
            </div>
            <table className='table table-striped'>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {categories.map((category, index) => (
                    <tr key={category.id}>
                        <td>{index + 1}</td>
                        <td>{category.name}</td>
                        <td>
                            <Link to={`/categories/edit/${category.id}`} className='btn btn-sm btn-primary me-2'>Sửa</Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListCategory;