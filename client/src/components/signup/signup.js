import React from 'react'
import "./signup.css"
import HeadingComp from './HeadingComp'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"

const SignUp = () => {
    const history = useNavigate();
    const [Inputs, setInputs] = useState({
        email: "",
        username: "",
        password: "",
    });
    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value })
    };
    const submit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:7001/api/user/signup", Inputs)
        .then((res) => {
            if(res.data.message === "User Already Exits"){
                alert((res.data.message));
            }else{
                alert((res.data.message));
                setInputs({
                    email: "",
                    username: "",
                    password: "",
                });
                history("/signin")
            }
            // console.log(res)
        });
        // console.log(Inputs)
    };
    return (
        <div className='signup'>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-8 column d-flex justify-content-center align-items-center'>
                        <div className='d-flex flex-column w-100 p-5'>
                            <input className='p-2 my-3 input-signup'
                                type="email"
                                name="email"
                                placeholder='Enter Your Email'
                                onChange={change}
                                value={Inputs.email}
                            />
                            <input className='p-2 my-3 input-signup'
                                type="username"
                                name="username"
                                placeholder='Enter Your User Name'
                                onChange={change}
                                value={Inputs.username}
                            />
                            <input className='p-2 my-3 input-signup'
                                type="password"
                                name="password"
                                placeholder='Enter Your Password'
                                onChange={change}
                                value={Inputs.password}
                            />
                            <button className='btn-signup p-2' onClick={submit}>SignUp</button>
                        </div>
                    </div>
                    <div className='col-lg-4 column col-left d-flex justify-content-center align-items-center'>
                        <HeadingComp first="Sign" second="up" />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp