import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthError } from '@supabase/supabase-js';
import { supabase } from '../../config/supabase';
const initialState = {
    user: null,
    loading: false,
    error: null,
};
export const registerUser = createAsyncThunk('auth/register', async ({ email, password, displayName }, { rejectWithValue }) => {
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    display_name: displayName
                }
            }
        });
        if (error) {
            if (error.message.includes('email_address_not_authorized')) {
                throw new Error('This email domain is not authorized. Please use a valid email address.');
            }
            throw error;
        }
        return {
            uid: data.user.id,
            email: data.user.email || null,
            displayName,
            photoURL: null,
        };
    }
    catch (error) {
        if (error instanceof Error) {
            return rejectWithValue(error.message);
        }
        return rejectWithValue('An unknown error occurred');
    }
});
export const loginUser = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        if (error)
            throw error;
        return {
            uid: data.user.id,
            email: data.user.email || null,
            displayName: data.user.user_metadata?.display_name || null,
            photoURL: data.user.user_metadata?.photo_url || null,
        };
    }
    catch (error) {
        if (error instanceof AuthError) {
            return rejectWithValue(error.message);
        }
        return rejectWithValue('An unknown error occurred');
    }
});
export const signOut = createAsyncThunk('auth/signOut', async (_, { rejectWithValue }) => {
    try {
        const { error } = await supabase.auth.signOut();
        if (error)
            throw error;
    }
    catch (error) {
        if (error instanceof AuthError) {
            return rejectWithValue(error.message);
        }
        return rejectWithValue('An unknown error occurred');
    }
});
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
            .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
            .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(signOut.fulfilled, (state) => {
            state.user = null;
        });
    },
});
export const { setUser, clearError } = authSlice.actions;
export default authSlice.reducer;
