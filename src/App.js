import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/products/Home";
import Create from "./components/products/Create";
import Update from "./components/products/Update";
import Infor from "./components/products/Infor";
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from "./components/layout/Main";
import NavbarApp from "./components/layout/NavbarApp";
import ListCategory from "./components/products/category/ListCategory";
import CategoryForm from "./components/products/category/CategoryForm";
import UserHome from "./components/users/UserHome";
import CreateUser from "./components/users/CreateUser";
import UpdateUser from "./components/users/UpdateUser";
import InforUser from "./components/users/InforUser";

function App() {
  return (
      <div className="App">
        <BrowserRouter>
            <NavbarApp/>

          <Routes>
              <Route path='/' element={<Main/>}></Route>
              <Route path='/products' element={<Home/>}></Route>
              <Route path='/products/create' element={<Create/>}></Route>
              <Route path='/products/update/:id' element={<Update/>}></Route>
              <Route path='/products/read/:id' element={<Infor/>}></Route>
              <Route path='/categories' element={<ListCategory/>}></Route>
              <Route path="/categories/create" element={<CategoryForm />}></Route>
              <Route path="/categories/edit/:id" element={<CategoryForm />}></Route>
              <Route path="/users" element={<UserHome />}></Route>
              <Route path='/users/create' element={<CreateUser />}></Route>
              <Route path='/users/update/:id' element={<UpdateUser />}></Route>
              <Route path='/users/read/:id' element={<InforUser />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
