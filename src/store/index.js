import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './bookReducer';
import authReducer from './authSlice'; //

export const store = configureStore({
    reducer: {
        catalog: bookReducer,
        auth: authReducer,
    },
});

export default store;