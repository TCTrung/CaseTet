import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const InforProduct = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState({});
    const [category, setCategory] = useState({});
    const [products, setProducts] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8080/${id}`)
            .then(res => {
                setProduct(res.data);
                setCategory(res.data.category);
            })
            .catch(err => console.error(err))
    }, [id]);

    useEffect(() => {
        axios.get('http://localhost:8080/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
    };
    const handleSearch = () => {
        axios.get(`http://localhost:8080/searchProduct?productName=${searchTerm}`)
            .then(res => {
                console.log(res);
                setProducts(res.data);
            })
            .catch(err => console.error(err));
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
                        <Link to="/" className="text-decoration-none">
                            <h1 className="m-0 display-5 font-weight-semi-bold"><span className="text-primary font-weight-bold border px-3 mr-1">T</span>Shop</h1>
                        </Link>
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
                        <div className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100" data-toggle="collapse" href="#navbar-vertical" style={{ height: '65px', marginTop: '-1px', padding: '0 30px' }}>
                            <h6 className="m-0">Categories</h6>
                            <i className="fa fa-angle-down text-dark" />
                        </div>
                        <nav className="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0" id="navbar-vertical">
                            <div className="navbar-nav w-100 overflow-hidden" style={{ height: '410px' }}>
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
                </div>
            </div>
            {/* Navbar End */}
            {/* Games Start */}
            <div className="text-center mb-4">
                <h2 className="section-title px-5"><span className="px-2">Information Games</span></h2>
            </div>
            <div className="container-fluid pt-5">
                {/* Shop Detail Start */}

                <div className="row px-xl-5">
                    {/*            photo*/}
                    <div className="col-lg-6 pb-6">
                        <div id="product-carousel" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner border">
                                <div className="carousel-item active">
                                    {product.image && <img src={product.image} alt="Product" style={{ maxWidth: '60%' }} />}
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="col-lg-6 pb-6">
                        <h3 className="font-weight-semi-bold">{product.name}</h3>
                        {/*                danh gia sao*/}
                        <div className="d-flex mb-3">
                            <div className="text-primary mr-2">
                                <small className="fas fa-star"></small>
                                <small className="fas fa-star"></small>
                                <small className="fas fa-star"></small>
                                <small className="fas fa-star-half-alt"></small>
                                <small className="far fa-star"></small>
                            </div>
                            <small className="pt-1">(50 Reviews)</small>
                        </div>

                        <h3 className="font-weight-semi-bold mb-4">${product.price}</h3>
                        <p className="mb-4">Description: {product.description}</p>
                        <p className="mb-4">Category: {category.name}</p>

                        <div className="d-flex align-items-center mb-4 pt-2">
                            <Link to={`/home/addToCart/__${product.id}__(action='list')}`} className="btn btn-sm text-dark p-0"><i className="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</Link>
                        </div>

                    </div>
                </div>
                {/* Shop Detail End */}
            </div>
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

export default InforProduct;
