import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserHome = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        axios.get('http://localhost:8080/users')
            .then(res => {
                console.log(res);
                setUsers(res.data);
            })
            .catch(err => console.error(err))
    }, [])

    const handleSearch = (event) => {
        event.preventDefault();

        if (searchTerm) {
            axios.get(`http://localhost:8080/searchUser?nameUser=${searchTerm}`)
                .then(res => {
                    console.log(res);
                    setUsers(res.data);
                })
                .catch(err => console.error(err));
        } else {
            // Nếu searchTerm không có giá trị, gọi API /users để lấy toàn bộ danh sách người dùng
            axios.get('http://localhost:8080/users')
                .then(res => {
                    console.log(res);
                    setUsers(res.data);
                })
                .catch(err => console.error(err));
        }
    };

    const handleDelete = (id) => {
        const confirm = window.confirm('Bạn chắc chắn muốn xóa sản phẩm này ?');
        if (confirm) {
            axios.delete(`http://localhost:8080/deleteUser/${id}`)
                .then(res => {
                    alert("Xóa thành công !");
                    window.location.reload();
                })
                .catch(err => console.log(err))
        }
    };

  return (
      <>
          <h1>Danh Sách Tài Khoản</h1>

          <div className="d-flex justify-content-between align-items-center">
              <Link to="/users/create" className="btn btn-success">Thêm tài khoản mới</Link>
              <div className="mb-3 d-flex align-items-center">
                  <form onSubmit={handleSearch}>
                      <input type="text" placeholder="Nhập tên sản phẩm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                      <button type="submit" className="btn btn-sm btn-danger ml-2">Tìm kiếm</button>
                  </form>
              </div>
          </div>
          <div>
              <table className='table table-striped'>
                  <thead>
                  <tr>
                      <th>#</th>
                      <th>Tên</th>
                      <th>Email</th>
                      <th>Username</th>
                      <th>Password</th>
                      <th>Role</th>
                      <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                      users.map((user, index) => (
                          <tr key={index}>
                              <td>{index + 1}</td>
                              <td><Link to={`/users/read/${user.id}`}>{user.name}</Link></td>
                              <td>{user.email}</td>
                              <td>{user.username}</td>
                              <td>{user.password}</td>
                              <td>{user.role.name}</td>

                              <td>
                                  <Link to={`/users/update/${user.id}`} className='btn btn-sm btn-primary me-2'>Sửa</Link>
                                  <button className='btn btn-sm btn-danger' onClick={() => handleDelete(user.id)}>Xóa</button>
                              </td>
                          </tr>
                      ))
                  }
                  </tbody>
              </table>
          </div>
      </>
  );
}

export default UserHome;