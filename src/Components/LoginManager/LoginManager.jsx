import firebaseConfig from "../Login/fireConfiger";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword } from "firebase/auth";

export const initializeLoginFramework = ()=>{
    initializeApp(firebaseConfig);
}

// new User Create Email and Password
export const createUserEmailAndPassword =( name ,email, password)=>{
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password)
    .then((result) => {
        
        const userInfo = result.user;
        userInfo.error = '';
        userInfo.success=true;
        alert('User created Successfully');
        // updateUserName(name);
        return userInfo;
        
    })
    .catch((error) => {
        const userInfo = {};
        alert('User created Unsuccessfull');
        userInfo.error = "User Already Exists";
        userInfo.success=false;
        return userInfo;
    });
}


// Log In user email and password
export const loginUserAndPassword =(email,password)=>{
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
    .then((result) => {
        
        const userInfo = result.user;
        alert('User loggin Successfully');
        userInfo.error = '';
        userInfo.success=true;
        return userInfo;
        
    })
    .catch((error) => {
        const userInfo = {};
        alert('User loggin UnSuccessful');
        userInfo.success=false;
        userInfo.error = "Invalid Email or Password";
        return userInfo;
    });
}