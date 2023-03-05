import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeSubreddit, getArticles } from '../articles/articleSlice';
import { removeIcon, addIconToAdd } from '../user/userSlice';
import { useSelector } from 'react-redux';


const ShortcutBar = () => {

    const dispatch = useDispatch();

    // logged in bool based on state.user
    const isLoggedIn = useSelector((state) => state.user.email);

    const shortcutIcons = useSelector((state) => state.user.user.icons);
    const shortcutIconsToAdd = useSelector((state) => state.user.user.library);
    const menuVisible = useSelector((state) => state.user.menuVisible);
    const isEditing = useSelector((state) => state.user.isEditing);

    // current user from state
    const currentUser = useSelector((state) => state.user.user);

    // first use effect to add onclick functions to shortcut bar icons
    useEffect(() => {

        let list = document.querySelectorAll('.shortcut-icon');
        for (let i = 0; i < list.length; i++){
        list[i].onclick = function(e){
            let j = 0;
            while(j < list.length){
                list[j++].className = 'shortcut-icon';
            }
            list[i].className = 'shortcut-icon active-icon';
            dispatch(changeSubreddit(e.target.id));
            dispatch(getArticles(e.target.id));
        }
    }

    }, [shortcutIcons, shortcutIconsToAdd, menuVisible])
    
    const deleteIcon = async (e) => {

        // get icon name from id of target's parent
        let currentIcon = e.target.parentNode.id;

        // async call to delete from icons and add to library on db
        try {
            await fetch('/backend/auth/removeicon', {
                method: 'PATCH',
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    email: currentUser.email,
                    iconName: currentIcon,
                    currentIcons: currentUser.icons,
                    currentLibrary: currentUser.library,
                })

            })

             // change redux states
            dispatch(addIconToAdd(currentIcon));
            dispatch(removeIcon(currentIcon));

            console.log("This all fired!")

        } catch (error) {
            console.log(error.message)
        }
        
    }

    return (
            <nav className="navigation-shortcuts">
                { !shortcutIcons && (<p className="login-for-shortcuts">Please login to use shortcuts</p>) }
                <ul>
                    {
                        shortcutIcons && shortcutIcons.map((icon, index) => {
                            return (
                                <li id={icon + "-div"} className={icon} key={index}>
                                    <div id={icon} className="shortcut-icon">
                                    {isEditing && <div className="remove-icon-cross" onClick={deleteIcon}>x</div>}
                                    </div>
                                </li>
                            )                            
                        })
                            
                    }
                    
                </ul>
            </nav>
    )
}

export default ShortcutBar;

                    /* OLD HARD-CODED ICONS */

                    /*<li>
                        <div id="Ghost" className="shortcut-icon"></div>
                    </li>
                    <li>
                        <div id="Alien" className="shortcut-icon"></div>
                    </li>
                    <li>
                        <div id="UFO" className="shortcut-icon"></div>
                    </li>
                    <li>
                        <div id="Cryptid" className="shortcut-icon"></div>
                    </li>
                    <li>
                        <div id="Bigfoot" className="shortcut-icon"></div>
                    </li>
                    <li>
                        <div id="Telekinesis" className="shortcut-icon"></div>
                    </li>*/