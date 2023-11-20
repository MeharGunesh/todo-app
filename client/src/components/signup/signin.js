import React from "react"
import { useState } from 'react'
import "./signup.css"
import HeadingComp from './HeadingComp'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/index.js";

const SignIn = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [Inputs, setInputs] = useState({
        email: "",
        password: "",
    });
    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value });
    };
    const submit = async (e) => {
        e.preventDefault();
        await axios
            .post("http://localhost:7001/api/user/login", Inputs)
            .then((res) => {
                console.log(res.data.others._id);
                sessionStorage.setItem("id", res.data.others._id);
                dispatch(authActions.login());
                history("/todo");

            });
    }
    return (
        <div>
            <div className='signup'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-4 column col-left d-flex justify-content-center align-items-center'>
                            <HeadingComp first="Sign" second="in" />
                        </div>
                        <div className='col-lg-8 column d-flex justify-content-center align-items-center'>
                            <div className='d-flex flex-column w-100 p-5'>
                                <input className='p-2 my-3 input-signup'
                                    type="email"
                                    name="email"
                                    placeholder='Enter Your Email'
                                    value={Inputs.email}
                                    onChange={change}
                                />
                                {/* <input className='p-2 my-3 input-signup'
                                type="username"
                                name="username"
                                placeholder='Enter Your User Name'
                            /> */}
                                <input className='p-2 my-3 input-signup'
                                    type="password"
                                    name="password"
                                    placeholder='Enter Your Password'
                                    value={Inputs.password}
                                    onChange={change}
                                />
                                <button className='btn-signup p-2 ' onClick={submit}>SignIn</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn