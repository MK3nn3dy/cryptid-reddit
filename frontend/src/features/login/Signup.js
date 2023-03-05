import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSignin } from "./loginMenuSlice";
import { login } from '../user/userSlice';
import { updateUsersIcons, updateUserIconsToAdd } from "../shortcutbar/shortcutSlice";

const Signup = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [formError, setFormError] = useState(null);

    const checkingCurrentUser = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const closeSignup = (e) => {
        dispatch(toggleSignin(false));
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const signupCreateUser = async () => {
        // reset local state form error
        setFormError(null)
        // create new user - checks done on backend
        const response = await fetch('/backend/auth/signup', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        const { data, token, error } = await response.json();
        // check if error property
        console.log(error)
        if(error){
            // if there is, set local state and return
            setFormError(error);
            return;
        }

        const newUserState = {
            email: data[0].email,
            icons: data[0].usericons,
            library: data[0].userlibrary,
            theme: data[0].theme
        }

        // set redux stores user state to the user retrieved
        dispatch(login(newUserState));

        // set icons in icons slice of redux state to be the users icons
        dispatch(updateUsersIcons(data[0].usericons))
        dispatch(updateUserIconsToAdd(data[0].userlibrary))

        // send user ID and token to localstorage
        localStorage.setItem('user', JSON.stringify({ userid: data[0].id, token}));

        // close signup window
        dispatch(toggleSignin(false));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        signupCreateUser();
    }

    return (
        <div className="login-panel">
            <form className="login-form" method="post" action="#">
            <div className="close-login-signup" onClick={closeSignup}>X</div>
            <h4>Sign Up</h4>
                { formError && (<div className="form-error">{formError}</div>)}
                <p>Sign up to change themes and customise your shortcuts bar!</p>
                <label htmlFor="email">Email: </label>
                <input type="text" 
                       id="email"
                       name="email"
                       onChange={handleEmailChange}
                       value={email}/>
                <label htmlFor="password">Password: </label>
                <input type="text" 
                       id="password" 
                       name="password" 
                       onChange={handlePasswordChange} 
                       value={password}/>
                <button onClick={handleSubmit}>Sign up</button>
            </form>
        </div>
    )
}

export default Signup;