import firebaseConfig from "../Login/fireConfiger";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,updateProfile,signOut  } from "firebase/auth";

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
       // alert('User created Successfully');
        userNameUpdate(name)
        return userInfo;
        
    })
    .catch((error) => {
        const userInfo = {};
        //alert('User created Unsuccessfull');
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
        //alert('User loggin Successfully');
        userInfo.error = '';
        userInfo.success=true;
        userInfo.name=userInfo.displayName;
        return userInfo;
        
    })
    .catch((error) => {
        const userInfo = {};
        //alert('User loggin UnSuccessful');
        userInfo.success=false;
        userInfo.error = "Invalid Email or Password";
        return userInfo;
    });
}

// Log in user google account
const provider = new GoogleAuthProvider();
export const loginGoogleAccount =()=>{
    const auth = getAuth();
    return signInWithPopup(auth, provider)
    .then((result) => {
        const {displayName,email} = result.user;
        alert('User loggin Successfully');
        const userInfo = {
            name: displayName,
            email: email,
            success: true,
            error: ''
        }
        return userInfo;
        
    }).catch((error) => {
        const errorMessage = error.message;
        return errorMessage;
    });
}

const userNameUpdate = (name)=>{
    const auth = getAuth();
    updateProfile(auth.currentUser, {
    displayName: name})
    .then(() => {
    // Profile updated!
    
    }).catch((error) => {
    // An error occurred
    
    });
}

//Log Out 
export const loggedOut = ()=>{
    const auth = getAuth();
    return signOut(auth)
    .then(() => {
    // Sign-out successful.
    const logOutUser={
        name:'',
        email:'',
        success:false,
        error: ''
    }
    return logOutUser;
    }).catch((error) => {
    // An error happened.
    return error.message;
});
}