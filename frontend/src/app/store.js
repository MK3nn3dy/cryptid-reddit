import { configureStore } from "@reduxjs/toolkit";
import articleReducer from '../features/articles/articleSlice';
import shortcutReducer from '../features/shortcutbar/shortcutSlice';
import loginMenuReducer from "../features/login/loginMenuSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
    reducer: {
        articles: articleReducer,
        shortcuts: shortcutReducer,
        login: loginMenuReducer,
        user: userReducer
    }
}) 