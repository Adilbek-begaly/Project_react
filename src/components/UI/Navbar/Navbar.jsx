import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context";
import MyButton from "../button/MyButton";

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const logout = () => {
        setIsAuth(false)
        localStorage.removeItem('auth') 
    };
    return(
        <div className="navbar">
            <div className="navbar__link">
                <Link to="/about" className="navbar__links">O Сайте</Link>
                <Link to="/posts" className="navbar__links">Посты</Link>
                <Link to="/login" className="navbar__links">Логин</Link>
            </div>
            <MyButton onClick={logout}>Выйти</MyButton>
        </div>
    )
};
export default Navbar;