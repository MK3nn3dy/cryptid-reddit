import React from 'react';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    icons: [
        "Ghost",
        "Alien",
        "UFO",
        "Bigfoot",
        "Cryptids",
        "Telekinesis",
    ],
    iconsLibrary: [
        "WendigoStories",
        "Mothman",
        "Lochnessmonster",
        "Alienabduction",
        "Crawlersightings",
        "Cryptozoology",
        "Humanoidencounters"
    ],
    menuVisible: false,
    warningVisible: false,
    isEditing: false,
};

const shortcutSlice = createSlice({
    name: 'shortcuts',
    initialState: initialState,
    reducers: {
        /* Adds icon to shortcut menu */
        addIcon:(state, action) => {
            state.icons.push(action.payload);
        },
        /* Removes icon from shortcut menu */
        removeIcon: (state, action) => {
            state.icons.splice(state.icons.indexOf(action.payload), 1);
        },
        /* Adds an icon to the "icons to add" menu */
        addIconToAdd: (state, action) => {
            state.iconsLibrary.push(action.payload);
        },
        /* Removes an icon from the "icons to add" menu */
        removeIconToAdd: (state, action) => {
            console.log(action.payload);
            state.iconsLibrary.splice(state.iconsLibrary.indexOf(action.payload), 1);
        },
        // update all shortcut icons to users from db
        updateUsersIcons: (state, action) => {
            state.icons = action.payload;
        },
        // update all icons to add to users from db
        updateUserIconsToAdd: (state, action) => {
            state.iconsLibrary = action.payload;
        },
        /* Shows and hides the "icons to add" menu */
        showHideMenu: (state, action) => {
            state.menuVisible = action.payload;
        },
        showHideWarning: (state, action) => {
            state.warningVisible = action.payload;
        },
        toggleEditIcons: (state, action) => {
            state.isEditing = action.payload;
        }
    }
});

export const { addIcon,
               removeIcon, 
               addIconToAdd, 
               removeIconToAdd, 
               updateUsersIcons,
               updateUserIconsToAdd,
               showHideMenu, 
               showHideWarning,
               toggleEditIcons } = shortcutSlice.actions;

export default shortcutSlice.reducer;