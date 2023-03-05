// imports
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLogin } from "./loginMenuSlice";
import { updateUsersIcons, updateUserIconsToAdd } from "../user/userSlice";
import { login } from '../user/userSlice';

const Login = () => {

    // local state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [formError, setFormError ] = useState(null);

    // get dispatch method in variable
    const dispatch = useDispatch();

    // handlers
    const closeLogin = (e) => {
        dispatch(toggleLogin(false));
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    // This async fetch is called within the handlesubmit
    const loginFetchUser = async () => {

        // reset error to null
        setFormError(null);

        const response = await fetch('/backend/auth/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        // destructure data and token properties from object from .json()
        const { data, token, error } = await response.json();
       
        // is there an error property on response?
        if(error){
            // if there is, set local state and return
            setFormError(error);
            return;
        }

        // define new userState as object
        const newUserState = {
            email: data[0].email,
            icons: data[0].usericons,
            library: data[0].userlibrary,
            theme: data[0].theme
        }

        // update redux user state
        dispatch(login(newUserState));

        // update icons and library to user's arrays from db
        dispatch(updateUsersIcons(data[0].usericons))
        dispatch(updateUserIconsToAdd(data[0].userlibrary))

        // update theme to users choice
        const root = document.querySelector(':root');

        root.style.setProperty('--color', data[0].theme);

        // send user ID and token to localstorage
        localStorage.setItem('user', JSON.stringify({ userid: data[0].id, token}));

        // toggle off the login panel
        dispatch(toggleLogin(false));

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        loginFetchUser();
    }

    return (
        <div className="login-panel">
            <form className="login-form">
            <div className="close-login-signup" onClick={closeLogin}>X</div>
            <h4>Log In</h4>
                { formError && (<div className="form-error">{formError}</div>)}
                <label htmlFor="email">Email: </label>
                <input type="text" 
                       id="email"
                       name="email"
                       onChange={handleEmailChange}
                       value={email}/>
                <label htmlFor="password">Password: </label>
                <input type="password" 
                       id="password" 
                       name="password" 
                       onChange={handlePasswordChange} 
                       value={password}/>
                <button onClick={handleSubmit}>Log in</button>
            </form>
        </div>
    )
}

export default Login;