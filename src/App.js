import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/products/Home";
import Create from "./components/products/Create";
import Update from "./components/products/Update";
import Infor from "./components/products/Infor";
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from "./components/layout/Main";
import NavbarApp from "./components/layout/NavbarApp";

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
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
