import React, { useEffect } from "react";
import Navbar from "./components/navbar/navbar";
import Home from "./components/home/home.js";
import Fotter from "./components/fotter/fotter.js"
import About from "./components/about/about.js";
import SignUp from "./components/signup/signup.js";
import SignIn from "./components/signup/signin.js";
import Todo from "./components/todo/todo.js"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"; 
import { useDispatch } from "react-redux";
import { authActions } from "./store/index.js";



const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if(id){
      dispatch(authActions.login());
    }
  },[]);

  return (
    <>
    <Router>
    <Navbar/>
      <Routes>
        <Route exact path="/" element= {<Home/>} />
        <Route exact path="/about" element= {<About/>} />
        <Route exact path="/todo" element= {<Todo/>} />
        <Route exact path="/signup" element= {<SignUp/>} />
        <Route exact path="/signin" element= {<SignIn/>} />
      </Routes>
    </Router>
    <Fotter/>
    </>
  )
};

export default App;