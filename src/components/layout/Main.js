import "./Main.css"
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Main = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/')
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => console.error(err));

        axios.get('http://localhost:8080/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => console.error('Error fetching categories:', error));
    }, [])

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    // Lọc danh sách sản phẩm dựa trên danh mục được chọn
    const filteredProducts = selectedCategory
        ? products.filter(product => product.category.id === selectedCategory)
        : products;

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
          {/* Topbar Start */}
          <div className="container-fluid">
              <div className="row bg-secondary py-2 px-xl-5">
                  <div className="col-lg-6 d-none d-lg-block">
                      <div className="d-inline-flex align-items-center">
                          <a className="text-dark" href>FAQs</a>
                          <span className="text-muted px-2">|</span>
                          <a className="text-dark" href>Help</a>
                          <span className="text-muted px-2">|</span>
                          <a className="text-dark" href>Support</a>
                      </div>
                  </div>
                  <div className="col-lg-6 text-center text-lg-right">
                      <div className="d-inline-flex align-items-center">
                          <a className="text-dark px-2" href>
                              <i className="fab fa-facebook-f" />
                          </a>
                          <a className="text-dark px-2" href>
                              <i className="fab fa-twitter" />
                          </a>
                          <a className="text-dark px-2" href>
                              <i className="fab fa-linkedin-in" />
                          </a>
                          <a className="text-dark px-2" href>
                              <i className="fab fa-instagram" />
                          </a>
                          <a className="text-dark pl-2" href>
                              <i className="fab fa-youtube" />
                          </a>
                      </div>
                  </div>
              </div>
              <div className="row align-items-center py-3 px-xl-5">
                  <div className="col-lg-3 d-none d-lg-block">
                      <a href="/home" className="text-decoration-none">
                          <h1 className="m-0 display-5 font-weight-semi-bold"><span className="text-primary font-weight-bold border px-3 mr-1">T</span>Shop</h1>
                      </a>
                  </div>
                  <div className="col-lg-6 col-6 text-left">
                          <div className="input-group">
                              <input type="text" className="form-control" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Nhập tên sản phẩm" />
                              <div className="input-group-append">
                                  <button className="input-group-text bg-transparent text-primary" type="submit" onClick={handleSearch} value="Search">
                                      <i className="fa fa-search" />
                                  </button>
                              </div>
                          </div>
                  </div>
                  <div className="col-lg-3 col-6 text-right">
                      <a className="btn border">
                          <i className="fas fa-heart text-primary" />
                          <span className="badge">0</span>
                      </a>
                      <a href="/shopping-cart" className="btn border">
                          <i className="fas fa-shopping-cart text-primary" />
                          <span className="badge">0</span>
                      </a>
                  </div>
              </div>
          </div>
          {/* Topbar End */}
          {/* Navbar Start */}
          <div className="container-fluid mb-5">
              <div className="row border-top px-xl-5">
                  <div className="col-lg-3 d-none d-lg-block">
                          <div className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100" data-toggle="collapse" href="#navbar-vertical" style={{height: '65px', marginTop: '-1px', padding: '0 30px'}}>
                              <h6 className="m-0">Categories</h6>
                              <i className="fa fa-angle-down text-dark" />
                          </div>
                          <nav className="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0" id="navbar-vertical">
                              <div className="navbar-nav w-100 overflow-hidden" style={{height: '410px'}}>
                                  <ul>
                                      {categories.map(category => (
                                          <li key={category.id} onClick={() => handleCategoryChange(category.id)}>
                                              <a href="#" className="nav-link">{category.name}</a>
                                          </li>
                                      ))}
                                  </ul>
                              </div>
                          </nav>

                  </div>
                  {/*<div className="col-lg-9">*/}
                  {/*    <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">*/}
                  {/*        <a href className="text-decoration-none d-block d-lg-none">*/}
                  {/*            <h1 className="m-0 display-5 font-weight-semi-bold"><span className="text-primary font-weight-bold border px-3 mr-1">E</span>Shopper</h1>*/}
                  {/*        </a>*/}
                  {/*        <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">*/}
                  {/*            <span className="navbar-toggler-icon" />*/}
                  {/*        </button>*/}
                  {/*        <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">*/}
                  {/*            <div className="navbar-nav mr-auto py-0">*/}
                  {/*                <a href="/home" className="nav-item nav-link active">Home</a>*/}
                  {/*                <div className="nav-item dropdown" >*/}
                  {/*                    <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Admin</a>*/}
                  {/*                    <div className="dropdown-menu rounded-0 m-0">*/}
                  {/*                        <a href="/admin/games" className="dropdown-item">Games Manager</a>*/}
                  {/*                        <a href="/admin/users" className="dropdown-item">Users Manager</a>*/}
                  {/*                    </div>*/}
                  {/*                </div>*/}
                  {/*            </div>*/}
                  {/*            <div>*/}
                  {/*                <div className="navbar-nav ml-auto py-0">*/}
                  {/*                    <a className="nav-item nav-link">Đăng nhập</a>*/}
                  {/*                    <a className="nav-item nav-link">Đăng ký</a>*/}
                  {/*                </div>*/}
                  {/*                /!* Hiển thị thông tin user nếu đăng nhập với vai trò user *!/*/}
                  {/*                <div className="navbar-nav ml-auto py-0">*/}
                  {/*                    <span className="nav-item nav-link">Chào mừng, <span />!</span>*/}
                  {/*                    <a className="nav-item nav-link">Đăng xuất</a>*/}
                  {/*                    /!*                            <a th:href="@{/logout}" class="nav-item nav-link">Thông tin user</a>*!/*/}
                  {/*                </div>*/}
                  {/*                /!* Hiển thị thông tin admin nếu đăng nhập với vai trò admin *!/*/}
                  {/*                <div className="navbar-nav ml-auto py-0">*/}
                  {/*                    <span className="nav-item nav-link">Chào mừng, admin!</span>*/}
                  {/*                    /!*                            <a th:href="@{/logout}" class="nav-item nav-link">Thông tin admin</a>*!/*/}
                  {/*                    <a className="nav-item nav-link">Đăng xuất</a>*/}
                  {/*                </div>*/}
                  {/*            </div>*/}
                  {/*        </div>*/}
                  {/*    </nav>*/}
                  {/*    <div id="header-carousel" className="carousel slide" data-ride="carousel">*/}
                  {/*        <div className="carousel-inner">*/}
                  {/*            <div className="carousel-item active" style={{height: '410px'}}>*/}
                  {/*                <img className="img-fluid" src="/image/background-footer.png" />*/}
                  {/*                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">*/}
                  {/*                    <div className="p-3" style={{maxWidth: '700px'}}>*/}
                  {/*                        <h4 className="text-light text-uppercase font-weight-medium mb-3">Game hay</h4>*/}
                  {/*                        <h3 className="display-4 text-white font-weight-semi-bold mb-4">Come On !</h3>*/}
                  {/*                    </div>*/}
                  {/*                </div>*/}
                  {/*            </div>*/}
                  {/*            <div className="carousel-item" style={{height: '410px'}}>*/}
                  {/*                <img src="/image/home background.png" />*/}
                  {/*                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">*/}
                  {/*                    <div className="p-3" style={{maxWidth: '700px'}}>*/}
                  {/*                        <h4 className="text-light text-uppercase font-weight-medium mb-3">Cập Nhật Hàng Ngày</h4>*/}
                  {/*                        <h3 className="display-4 text-white font-weight-semi-bold mb-4">Hot Hot Hot !</h3>*/}
                  {/*                    </div>*/}
                  {/*                </div>*/}
                  {/*            </div>*/}
                  {/*        </div>*/}
                  {/*        <a className="carousel-control-prev" href="#header-carousel" data-slide="prev">*/}
                  {/*            <div className="btn btn-dark" style={{width: '45px', height: '45px'}}>*/}
                  {/*                <span className="carousel-control-prev-icon mb-n2" />*/}
                  {/*            </div>*/}
                  {/*        </a>*/}
                  {/*        <a className="carousel-control-next" href="#header-carousel" data-slide="next">*/}
                  {/*            <div className="btn btn-dark" style={{width: '45px', height: '45px'}}>*/}
                  {/*                <span className="carousel-control-next-icon mb-n2" />*/}
                  {/*            </div>*/}
                  {/*        </a>*/}
                  {/*    </div>*/}
                  {/*</div>*/}
              </div>
          </div>
          {/* Navbar End */}
          {/* Games Start */}
          <div className="container-fluid pt-5">
              <div className="text-center mb-4">
                  <h2 className="section-title px-5"><span className="px-2">List Games</span></h2>
              </div>
              <div className="row px-xl-5 pb-3">
                  {/* Lặp qua danh sách sản phẩm và hiển thị từng sản phẩm */}
                  {products.map(product => (
                      <div className="col-lg-3 col-md-6 col-sm-12 pb-1" key={product.id}>
                          <div className="card product-item border-0 mb-4">
                              <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                  <img src={product.image} className="img-fluid w-100" alt={product.productName} style={{ width: '300px', height: '250px' }} />
                              </div>
                              <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                  <h6 className="text-truncate mb-3">{product.productName}</h6>
                                  <div className="d-flex justify-content-center">
                                      <h6>{product.price}</h6>
                                  </div>
                              </div>
                              <div className="card-footer d-flex justify-content-between bg-light border">
                                  <Link to={`/products/${product.id}`} className="btn btn-sm text-dark p-0"><i className="fas fa-eye text-primary mr-1" />View Detail</Link>
                                  <button className="btn btn-sm text-dark p-0"><i className="fas fa-shopping-cart text-primary mr-1" />Add To Cart</button>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>

          </div>
          {/* Games End */}

          {/* Footer Start */}
          <div className="container-fluid bg-secondary text-dark mt-5 pt-5">
              <div className="row px-xl-5 pt-5">
                  <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
                      <a href className="text-decoration-none">
                          <h1 className="mb-4 display-5 font-weight-semi-bold"><span className="text-primary font-weight-bold border border-white px-3 mr-1">T</span>Shop</h1>
                      </a>
                      <p>Thank you everyone for supporting T-Shop, please remember us, thank you !</p>
                      <p className="mb-2"><i className="fa fa-map-marker-alt text-primary mr-3" />123 My Dinh Street, Ha Noi, Viet Nam</p>
                      <p className="mb-2"><i className="fa fa-envelope text-primary mr-3" />admin@gmail.com</p>
                      <p className="mb-0"><i className="fa fa-phone-alt text-primary mr-3" />+012 345 67890</p>
                  </div>
                  <div className="col-lg-8 col-md-12">
                      <img src="/image/UnravelTwo.png" width={780} height={250} />
                  </div>
              </div>
              <div className="row border-top border-light mx-xl-5 py-4">
                  <div className="col-md-6 px-xl-0">
                      <p className="mb-md-0 text-center text-md-left text-dark">
                          © <a className="text-dark font-weight-semi-bold" href="#">T-Shop.com.vn</a>. All Rights Reserved. Designed
                          by
                          <a className="text-dark font-weight-semi-bold" href="https://htmlcodex.com">T-Team</a>
                      </p>
                  </div>
                  <div className="col-md-6 px-xl-0 text-center text-md-right">
                      <img className="img-fluid" src="img/payments.png" alt="" />
                  </div>
              </div>
          </div>
          {/* Footer End */}
      </>
  )
}
export default Main;