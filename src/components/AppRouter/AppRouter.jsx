import React, { useContext } from "react";
import { Route, Routes} from "react-router-dom";
import About from "../../pages/About";
import Posts from "../../pages/Posts";
import PostIdPage from "../../pages/PostIdPage";
import Login from "../../pages/Login";
import { AuthContext } from "../../context";

const AppRouter = () => {
    const {isAuth} = useContext(AuthContext)
    return(
        isAuth
            ?
                <Routes>
                    <Route path="/about*" element={<About/>} />
                    <Route path="*" element={<Posts/>} />
                    <Route path="/posts*" element={<Posts/>} />
                    <Route path="/posts/:id*" element={<PostIdPage/>} />
                </Routes>
            :
                <Routes>
                    <Route path="/login*" element={<Login/>} />
                    <Route path="*" element={<Login/>} />
                </Routes>
    )
};
export default AppRouter;