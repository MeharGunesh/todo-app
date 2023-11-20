import React, { useEffect, useState } from "react";
import "./todo.css";
import Todocards from "./todocards"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from "./update";
// import { useDispatch } from "react-redux";
// import { authActions } from "../../store/index.js";
import axios from "axios";
// import update from "./update";

let id = sessionStorage.getItem("id");
let toUpdateArray = [];

const Todo = () => {
    const [Inputs, setInputs] = useState({ title: "", body: "" });
    const [Array, setArray] = useState([]);


    const show = () => {
        document.getElementById("textarea").style.display = "block"
    };

    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value });
    };

    const submit = async () => {
        if (Inputs.title === "" || Inputs.body === "") {
            toast.error("Title Or Body Should Not Be Empty")

        } else {
            if (id) {
                await axios
                    .post("https://todo-api-my12.onrender.com/api/list/addtask", { title: Inputs.title, body: Inputs.body, id: id })
                    .then((res) => {
                        console.log(res);
                    });
                // setArray([...Array, Inputs]);
                setInputs({ title: "", body: "" });
                toast.success("Your Task Is Added")

            } else {
                setArray([...Array, Inputs]);
                setInputs({ title: "", body: "" });
                toast.success("Your Task Is Added")
                // toast.error("Error In Adding Task ! plz Sign Up")
            }
        }
    };

    const del = async (Cardid) => {
        if (id) {
            await axios.delete(`https://todo-api-my12.onrender.com/api/list/deletetask/${Cardid}`, { data: { id: id } })
                .then((res) => {
                    toast.success("Your Task Is Deleted")
                })
        } else {
            toast.success("Please Sigin First")
        }
    };

    const dis = (value) => {
        document.getElementById("todo-update").style.display = value;
    };

    const update = (value) => {
        toUpdateArray = Array[value];
    }
    useEffect(() => {
        if (id) {
            const fetch = async () => {
                await axios.get(`https://todo-api-my12.onrender.com/api/list/gettask/${id}`)
                    .then((res) => {
                        setArray(res.data.list);
                        // console.log(res.data.list)
                    });
            }
            fetch()
        } else {
        }
    }, [submit]);

    // console.log(Array)
    return (
        <>
            <div className='todo'>
                <ToastContainer />
                <div className='todo-main container d-flex justify-content-center align-items-center  flex-column'>
                    <div className='d-flex flex-column todo-inputs-div w-50 p-1 my-4'>
                        <input
                            type="text"
                            placeholder='TITLE'
                            className='rounded my-2 p-2 todo-inputs'
                            onClick={show}
                            name="title"
                            value={Inputs.title}
                            onChange={change}

                        />
                        <textarea
                            id="textarea"
                            type="text"
                            placeholder='BODY'
                            name='body'
                            className='rounded p-2 todo-inputs'
                            value={Inputs.body}
                            onChange={change}
                        />

                    </div>
                    <div className='w-50 d-flex justify-content-end my-3'>
                        <button
                            className='home-btn px-2 py-1'
                            onClick={submit}
                        >
                            Add
                        </button>
                    </div>
                </div>
                <div className="todo-body">
                    <div className="container-fluid">
                        <div className="row ">
                            {Array &&
                                Array.map((item, index) => (
                                    <div className="col-lg-3 col-10 mx-5 my-2" key={index}>
                                        <Todocards
                                            title={item.title}
                                            body={item.body}
                                            id={item._id}
                                            delid={del}
                                            display={dis}
                                            updateId={index}
                                            toBeUpdate={update}

                                        />
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="todo-update" id="todo-update">
                <div className="container update">
                    <Update display={dis} update={toUpdateArray} />
                </div>
            </div>
        </>


    )
}

export default Todo