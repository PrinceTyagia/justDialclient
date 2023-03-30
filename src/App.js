import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from './pages/Home'
import Login from './pages/Login'
import MyBusiness from "./pages/MyBusiness";
import Register from './pages/Register'
import Search from "./pages/Search";
import SubCategory from './pages/SubCategory'
import Detail from './pages/Detail'




const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        
        <Route path="/" element={<Layout/>} >
          <Route index element={<Home/>}/>
        
           {
            window.localStorage.getItem("jwt_token") !== null &&
            <Route path="mybusiness" element={<MyBusiness/>}/>
          } 
    
         <Route path="sub-cat/:id/:id/:id" element={<SubCategory/>}/>
         <Route path="/search/:id/:name" element={<Search/>}/>
         <Route path="/detail/:name/:id" element={<Detail/>}/>


        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
