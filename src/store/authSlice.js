import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = 'http://localhost:8080/api/v1/auth'; //

// Helper to handle Fetch responses safely
const handleFetchResponse = async (response) => {
    const rawText = await response.text();
    if (!response.ok) {
        throw new Error(rawText);
    }
    try {
        const data = JSON.parse(rawText);
        return data;

    } catch (error) {
        return rawText;
    }
};

// Async Thunk: Registration
export const registerUser = createAsyncThunk(
    '/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            return await handleFetchResponse(response);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Async Thunk: Login
export const loginUser = createAsyncThunk(
    '/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });

            const data = await handleFetchResponse(response);

            if (data.token) {
                localStorage.setItem('userToken', data.token);
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    user: null,
    token: localStorage.getItem('userToken') || null,
    isLoading: false,
    error: null,
    success: false, // Used to track successful registration redirections
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('userToken');
            state.user = null;
            state.token = null;
            state.error = null;
            state.success = false;
        },
        clearError: (state) => {
            state.error = null;
        },
        resetSuccess: (state) => {
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Registration Action States
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.isLoading = false;
                state.success = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Login Action States
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, clearError, resetSuccess } = authSlice.actions;
export default authSlice.reducer;