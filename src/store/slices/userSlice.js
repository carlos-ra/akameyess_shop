import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut, GoogleAuthProvider, signInWithPopup, updateProfile, FirebaseError } from 'firebase/auth';
import { auth } from '../../config/firebase';
const initialState = {
    user: null,
    loading: false,
    error: null,
};
export const registerUser = createAsyncThunk('user/register', async ({ email, password, displayName }, { rejectWithValue }) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName });
        return {
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            displayName,
            photoURL: userCredential.user.photoURL,
        };
    }
    catch (error) {
        if (error instanceof FirebaseError) {
            return rejectWithValue(error.message);
        }
        return rejectWithValue('An unknown error occurred');
    }
});
export const loginUser = createAsyncThunk('user/login', async ({ email, password }, { rejectWithValue }) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return {
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            displayName: userCredential.user.displayName,
            photoURL: userCredential.user.photoURL,
        };
    }
    catch (error) {
        return rejectWithValue(error.message);
    }
});
export const signInWithGoogle = createAsyncThunk('user/googleSignIn', async (_, { rejectWithValue }) => {
    try {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        return {
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            displayName: userCredential.user.displayName,
            photoURL: userCredential.user.photoURL,
        };
    }
    catch (error) {
        return rejectWithValue(error.message);
    }
});
export const signOut = createAsyncThunk('user/signOut', async (_, { rejectWithValue }) => {
    try {
        await firebaseSignOut(auth);
    }
    catch (error) {
        return rejectWithValue(error.message);
    }
});
const userSlice = createSlice({
    name: 'user',
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
            // Register
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
            // Login
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
            // Google Sign In
            .addCase(signInWithGoogle.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(signInWithGoogle.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
            .addCase(signInWithGoogle.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            // Sign Out
            .addCase(signOut.fulfilled, (state) => {
            state.user = null;
        });
    },
});
export const { setUser, clearError } = userSlice.actions;
export default userSlice.reducer;
