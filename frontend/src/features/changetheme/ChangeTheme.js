import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ChangeTheme = () => {

    const currentUserEmail = useSelector((state) => state.user.user.email)

    const handleThemeChange = async (e) => {

        // get root of document
        const root = document.querySelector(':root');

        // set root's color variable to the target color ids in template below)
        root.style.setProperty('--color', e.target.id);

        // asynchronously change color in supabase db
        // This will be fetch to backend route and controller
        const updateDbTheme = await fetch('/backend/auth/changetheme', {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                color: e.target.id,
                email: currentUserEmail,
            })
        })
        const response = await updateDbTheme.json();
    }

    return (
        <div className="changeTheme">
            <h4>Theme</h4>
            <div id="DarkOrange" className="themeButton" onClick={handleThemeChange}></div>
            <div id="LightSkyBlue"className="themeButton" onClick={handleThemeChange}></div>
            <div id="DarkSeaGreen"className="themeButton" onClick={handleThemeChange}></div>
            <div id="LightPink" className="themeButton" onClick={handleThemeChange}></div>
        </div>
    )

}

export default ChangeTheme;