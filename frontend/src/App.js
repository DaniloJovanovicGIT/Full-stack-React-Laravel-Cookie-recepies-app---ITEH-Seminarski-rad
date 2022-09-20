import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Faq from "./routes/Faq";
import Start from "./pages/Start";
import Home from "./routes/Home";
import Blogs from "./routes/Blogs";
import SingleBP from "./routes/SinglePost";
import Login from "./components/user-admin/Login";
import Register from "./components/user-admin/Register";
import AddPost from "./components/post/AddPost";
import Admin from "./components/user-admin/Admin";
import CoffeeTable from "./components/coffee/CoffeeTable";
import "./styles/App.css";
import UsersTable from "./components/user-admin/UsersTable";
import PostTable from "./components/post/PostTable";
import CategoryTable from "./components/categories/CategoryTable";
import CategoryInfo from "./components/categories/CategoryInfo";
import NavBar from "./components/navigation/NavBar";
import Footer from "./components/navigation/Footer";
import CoffeeInfo from "./components/coffee/CoffeeInfo";
import UserInfo from "./components/user-admin/UserInfo";
import Recipes from "./pages/Recipes";

function App() {
    console.log('Provera app componente')
    return (

        <Router className='App'>
        <NavBar/>
            
            <Routes>
                <Route path="/" element={<Start/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/faq" element={<Faq/>}/>
                <Route path="/blogs" element={<Blogs/>}/>
                <Route path="/singleBP/:id" element={<SingleBP/>}/>

                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>

                <Route path="/addPost" element={<AddPost/>}/>
                <Route path="/addPost/:id" element={<AddPost/>}/>
                <Route path="/admin" element={<Admin/>}/>

                <Route path="/coffees" element={<CoffeeTable/>}/>
                <Route path="/coffee" element={<CoffeeInfo/>}/>
                <Route path="/coffee/:id" element={<CoffeeInfo/>}/>

                <Route path="/users" element={<UsersTable/>}/>
                <Route path="/user" element={<UserInfo/>}/>
                <Route path="/user/:id" element={<UserInfo/>}/>


                <Route path="/posts" element={<PostTable/>}/>
                <Route path="/categories" element={<CategoryTable/>}/>
                <Route path="/newCategory" element={<CategoryInfo/>}/>
                {/*todo servis*/}
                <Route path="/recipes" element={<Recipes/>}/>
            </Routes>
        </Router>
    );
}

export default App;
