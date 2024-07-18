import React ,{useState,useContext}from 'react'
import Alertcontext from '../../createcontext/Alert/AlertContext';
import {Link,useNavigate} from "react-router-dom"
import GoogleLogin from "./GoogleLogin"
// import "./Style.css"
const network = "http://localhost:5000";

export default function SingUp() {
    const {showalert}=useContext(Alertcontext);
  let navigate = useNavigate();
  const [User,setUser]=useState({email:"",password:"",name:""})
  const handlechange=(e)=>{
    setUser({ ...User, [e.target.name]: e.target.value });
  }

  const submit=async(e)=>{
    console.log(User);
    e.preventDefault();

    const response = await fetch(`${network}/api/auth/signUp`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(User),
    });
    const json = await response.json();
    if(json.success===true){

       localStorage.setItem('token',json.token);
       console.log(json);
       navigate('/home');
       showalert({grole:json.role,gshow:true,gmsg:json.msg})
    }else {
      console.log(json.msg);
      showalert({grole:json.role,gshow:true,gmsg:json.msg})
    }
  }
    return (
   <>

  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
    <input type="email" className="form-control" id="name" name='name' onChange={handlechange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Email address</label>
    <input type="email" className="form-control"  name='email' onChange={handlechange} id="email"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control"  name='password' onChange={handlechange} id="password"/>
  </div>
  <button type="submit" className="btn btn-primary" onClick={submit}>Submit</button>
  <Link to="/login" className="btn btn-primary">Login</Link>
<GoogleLogin/>
   </>
  )
}
