import React, { useContext, useState } from 'react';
import { createUserEmailAndPassword, initializeLoginFramework, loggedOut, loginGoogleAccount, loginUserAndPassword } from '../LoginManager/LoginManager';
import goggel_icon from '../../images/goggle_icon.png';
import './login.css';
import { UserContext } from '../../App';
import { useLocation, useNavigate } from 'react-router';
const Login = () => {

    initializeLoginFramework();

    const location = useLocation();
    const navigate = useNavigate();
    const {from} = location.state || {from: {pathname: "/"}};

    const [loggedUser,setLoggedUser] = useContext(UserContext);
    const [signUser,setSignUser] = useState(false);
    const [user,setUser] = useState({
        name:'',
        email:'',
        password:''
    })
    const handelChange = (e)=>{
        let isValidation = true;
        if(e.target.name === 'email')
        {
            isValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e.target.value);
        }
        if(e.target.name === 'password')
        {
            isValidation = /\d{1}/.test(e.target.value);
        }
        if(isValidation)
        {
            const newUserInfo = {...user};
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }
    const handelResponse=(userInfo,redirect)=>{
        setUser(userInfo);
        setLoggedUser(userInfo);
        if(redirect)
        {
            navigate(from.pathname,{replace:true});
        }
    }
    const handelSubmit =(e)=>{
        if(signUser && user.email && user.password)
        {
            createUserEmailAndPassword(user.name,user.email,user.password)
            .then((userInfo)=>{
                handelResponse(userInfo,true);
            })
        }
        if(!signUser && user.email && user.password)
        {
            loginUserAndPassword(user.email,user.password)
            .then((userInfo)=>{
                handelResponse(userInfo,true);
            })
        }
        
        e.preventDefault();
    }
    const handleGoogleSignIn = () => {
        loginGoogleAccount()
        .then((userInfo)=>
            handelResponse(userInfo,true));
    }
    
    const loggedOutuser =()=>{
        loggedOut()
        .then((userInfo)=>{
            handelResponse(userInfo,false);
        })
    }
    
    return (
        <div style={{textAlign:'center'}}>

           {signUser ? <h1>Sign Up</h1> : <h1>Login Page</h1>}
          
            <form onSubmit={handelSubmit}>
                {
                    signUser && 
                    <div>
                        <label htmlFor="userName">Name : </label>
                        <input onBlur={handelChange} type="text" name='name' id='userName' required />
                    </div>
                }
                <br />
                <label htmlFor="name">Email : </label>
                <input onBlur={handelChange}  type="text" name="email" id="name" required/>
                <br />
                <label htmlFor="pass">Password : </label>
                <input  onBlur={handelChange}  type="password" name='password' id='pass' required/>
                <br />
                {
                    signUser? 
                    <input type="submit" value="Sign Up"/>
                    :
                    <input type="submit" value="Login"/>
                }
            </form>
            {loggedUser?.email && <button onClick={loggedOutuser}>Log Out</button>}
            <p style={{color:'red'}}>{user.error}</p>
            {user.success && <p style={{color:"green"}}>User {signUser ? "Created" : "Logged In"} Successfully</p>}

           { signUser ?  <h4>Or Sign Up</h4> : <h4>Or Login</h4>}
            <img onClick={handleGoogleSignIn} style={{width:'50px'}} src={goggel_icon} alt="Google Sign-in" />

            {
                signUser ?
                <p>Do have an account ? <span onClick={()=>setSignUser(false)} style={{cursor:'pointer', color:'blue'}}>Log In</span></p> 
                : 
                <p>Do not have an account ? <span onClick={()=>setSignUser(true)} style={{cursor:'pointer', color:'blue'}}>Sign In</span></p>
            } 
  
        </div>
    );
};

export default Login;