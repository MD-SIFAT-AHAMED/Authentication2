import React, { useState } from 'react';
import { createUserEmailAndPassword, initializeLoginFramework, loginUserAndPassword } from '../LoginManager/LoginManager';

const Login = () => {
    initializeLoginFramework();
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
    const handelSubmit =(e)=>{
        if(signUser && user.email && user.password)
        {
            createUserEmailAndPassword(user.name,user.email,user.password)
            .then((userInfo)=>{
                
                setUser(userInfo);
                
            })
        }
        if(!signUser && user.email && user.password)
        {
            loginUserAndPassword(user.email,user.password)
            .then((userInfo)=>{
                setUser(userInfo);
            })
        }
        
        e.preventDefault();
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
            <p style={{color:'red'}}>{user.error}</p>
            {user.success && <p style={{color:"green"}}>user {signUser ? "Created" : "Logged In"} Successfully</p>}
            
            {
                signUser ?
                <p>Do have an account ? <span onClick={()=>setSignUser(false)} style={{cursor:'pointer', color:'blue'}}>Log In</span></p> 
                : 
                <p>Do not have an account ? <span onClick={()=>setSignUser(true)} style={{cursor:'pointer', color:'blue'}}>Sign In</span></p>
            } 


            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Password: {user.password}</p>
        </div>
    );
};

export default Login;