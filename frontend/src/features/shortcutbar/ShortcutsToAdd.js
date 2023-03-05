import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChangeTheme from '../changetheme/ChangeTheme';
import { login, logout, addIcon, removeIconToAdd, showHideMenu, showHideWarning, toggleEditIcons, updateUsersIcons, updateUserIconsToAdd} from '../user/userSlice';
import { toggleLogin, toggleSignin } from '../login/loginMenuSlice';
// import { login, logout } from '../user/userSlice';

const ShortcutsToAdd = () => {

    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.user.user);
    let currentUserName;
    if(currentUser.email){
        currentUserName = currentUser.email.split("@")[0];
    }
    

    const shortcutIcons = useSelector((state) => state.user.user.icons);
    const shortcutLibrary = useSelector((state) => state.user.user.library);
    const menuVisible = useSelector((state) => state.user.menuVisible);
    const warningVisible = useSelector((state) => state.user.warningVisible);
    const isEditing = useSelector((state) => state.user.isEditing);

    // when app loads, check local storage. If there's a token,
    // grab user from supabase and set local state.
    useEffect(() => {

        //for debugging
        // console.log("UseEffect in icon library ran.");

        // define async fetch function for user
        const initialGetUser = async (id) => {

        // fetch user from API GET endpoint
        const jsonUser = await fetch('/backend/auth/' + id)

        // change response to JS object
        const data = await jsonUser.json();
        // for debugging
        // console.log(data[0].email);

        const newUserState = {
            email: data[0].email,
            icons: data[0].usericons,
            library: data[0].userlibrary,
            theme: data[0].theme
        }

        // for debugging
        // console.log("Current user: ", currentUser);

        // set redux stores user state to the user retrieved
        dispatch(login(newUserState));

        // update redux state icons to users icons when bottom menu renders
        dispatch(updateUsersIcons(data[0].usericons))
        dispatch(updateUserIconsToAdd(data[0].userlibrary))

        //get root element of DOM
        const root = document.querySelector(':root');

            // set root's color variable to the target color ids in template below)
            root.style.setProperty('--color', data[0].theme);
            // for debugging
            // console.log(data[0].theme)

    }

        // check local storage for user and parse to JS object
        const localstorageuser = JSON.parse(localStorage.getItem('user'));

        if(localstorageuser){
        // if there is a user in local storage, call async function with id from local storage
        initialGetUser(localstorageuser.userid);
        }
        
    }, [])


    // dispatches to state to add to shortcut icon array and remove from icons to add array
    // asynchronous to make changes to supabase db through backend too
    const handleClick = async (event) => {
    
        // add to backend icons and remove from backend library
        try {
            await fetch('/backend/auth/addicon', {
                method: 'PATCH',
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    email: currentUser.email,
                    iconName:event.target.innerHTML,
                    currentIcons: currentUser.icons,
                    currentLibrary: currentUser.library
                })
            })
        } catch (error) {
            console.log(error);
        }


        if(shortcutIcons.length < 5){
            dispatch(addIcon(event.target.innerHTML));
            dispatch(removeIconToAdd(event.target.innerHTML));
            console.log(event.target.innerHTML);
        } else {
            dispatch(showHideWarning(!warningVisible));
        } 
    }

    const toggleIconLibrary = (event) => {
        const nextVisibility = !menuVisible;
        if(nextVisibility === false){
            dispatch(toggleEditIcons(false))
        }
        dispatch(showHideMenu(nextVisibility));
    }

    const editShortcuts = (e) => {
        const nextEditState = !isEditing;
        if(nextEditState === false){
            e.target.innerHTML = "Remove shortcuts"
        } else {
            e.target.innerHTML = "Stop editing"
        }
        dispatch(toggleEditIcons(nextEditState));
        console.log(nextEditState);
    }

    const showSignIn = (e) => {
        dispatch(toggleSignin(true));
    }

    const showLogIn = (e) => {
        dispatch(toggleLogin(true));
    }
    
    const handleLogout = (e) => {
        // remove token from local storage
        localStorage.removeItem('user');
        // dispatch logout to user slice
        dispatch(logout());
    }
    
    return (
        <aside id="shortcutLibrary">
            {!currentUser.email && (<h3 onClick={toggleIconLibrary}><div className="shortcuts-to-add-menu-icon"></div>Shortcuts / Theme</h3>)}
            {currentUser.email && (<h3 onClick={toggleIconLibrary}><div className="shortcuts-to-add-menu-icon"></div>{currentUserName}'s Options</h3>)}
            {(currentUser.email && menuVisible) && (<p className="logout" onClick={handleLogout}>Logout</p>)}
            {(menuVisible && currentUser.email) && <ChangeTheme />}
            {(menuVisible && currentUser.email) && <div className="edit-shortcuts-button" onClick={editShortcuts}>Remove Shortcuts</div>}
            <ul id="shortcutLibraryUL">
               {
                (menuVisible && shortcutLibrary) && shortcutLibrary.map((shortcut, index) => {
                    return (
                        <li key={index}>
                            <div 
                                id={shortcut}
                                className="shortcut-icon"
                            >
                            </div>
                            <div className="addIconText">
                                <h4 onClick={handleClick}>{shortcut}</h4>
                            </div>
                        </li>
                    )
                })
               }
            </ul>
            {(!currentUser.email && menuVisible) &&(
                <div className="please-login-signup">
                    <p>Please <span onClick={showLogIn} className="login-link">log in</span> or <span className="signin-link" onClick={showSignIn}>sign up</span> to change themes and customise your shortcuts bar!</p>
                </div>
            )}
        </aside>
    )

}

export default ShortcutsToAdd;