import React from 'react'
import "../navbar/navbar.css"
import { GiWhiteBook } from "react-icons/gi"
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { authActions } from "../../store/index.js";



const Navbar = () => {
    const navgateToHome = useNavigate();
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const dispatch = useDispatch();
    // console.log(isLoggedIn);
    const logout = () => {
        sessionStorage.clear("id");
        dispatch(authActions.logout());
        navgateToHome("/");
    };

    return (
        <>
            <nav className="navbar fixed-top navbar-expand-lg bg-secondary">
                <div className="container">
                    <Link className="navbar-brand text-white" to="/">
                        <b>
                            <GiWhiteBook /> &nbsp; TODO
                        </b>
                    </Link>
                    <button className="navbar-toggler btn-info" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item mx-2 ">
                                <Link className="nav-link active text-white" aria-current="page" to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className="nav-link active text-white" aria-current="page" to="/about">
                                    About Us
                                </Link>
                            </li>

                            {isLoggedIn && (
                                <>
                                    <li className="nav-item mx-2">
                                        <Link className="nav-link active text-white" aria-current="page" to="/todo">
                                            Todo
                                        </Link>
                                    </li>
                                </>
                            )}

                            {!isLoggedIn && (
                                <>
                                    <li className="nav-item mx-2">
                                        <Link className="nav-link active btn-nav text-dark" aria-current="page" to="/signup">
                                            SignUp
                                        </Link>
                                    </li>
                                    <li className="nav-item mx-2">
                                        <Link className="nav-link active btn-nav text-dark" aria-current="page" to="/signin">
                                            SignIn
                                        </Link>
                                    </li>
                                </>
                            )}

                            {isLoggedIn && (
                                <>
                                    <li className="nav-item mx-2" onClick={logout}>
                                        <Link
                                            className="nav-link active btn-nav text-dark"
                                            aria-current="page"
                                            to="#"
                                        >
                                            Log Out
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar