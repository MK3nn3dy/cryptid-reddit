import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {
            email: null,
            icons: null,
            library: null,
            theme: "orange"
        },
        menuVisible: false,
        warningVisible: false,
        isEditing: false,
    },
    reducers: {
        login:(state, action) => {
            state.user = action.payload;
        },
        logout:(state) => {
            state.user.email = null;
            state.user.icons = null;
            state.user.library = null;
            state.user.theme = "DarkOrange";
        },
        /* Adds icon to shortcut menu */
        addIcon:(state, action) => {
            state.user.icons.push(action.payload);
        },
        /* Removes icon from shortcut menu */
        removeIcon: (state, action) => {
            state.user.icons.splice(state.user.icons.indexOf(action.payload), 1);
        },
        /* Adds an icon to the "icons to add" menu */
        addIconToAdd: (state, action) => {
            state.user.library.push(action.payload);
        },
        /* Removes an icon from the "icons to add" menu */
        removeIconToAdd: (state, action) => {
            console.log(action.payload);
            state.user.library.splice(state.user.library.indexOf(action.payload), 1);
        },
        // update all shortcut icons to users from db
        updateUsersIcons: (state, action) => {
            state.user.icons = action.payload;
        },
        // update all icons to add to users from db
        updateUserIconsToAdd: (state, action) => {
            state.user.library = action.payload;
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
})

export const {
    login,
    logout,
    addIcon,
    removeIcon,
    addIconToAdd,
    removeIconToAdd,
    updateUsersIcons,
    updateUserIconsToAdd,
    showHideMenu,
    showHideWarning,
    toggleEditIcons
} = userSlice.actions;

export default userSlice.reducer;