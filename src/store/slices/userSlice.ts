import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isAuthenticated: boolean;
  email: string | null;
  name: string | null;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
  };
}

const initialState: UserState = {
  isAuthenticated: false,
  email: null,
  name: null,
  preferences: {
    theme: 'light',
    notifications: true,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ email: string; name: string }>) => {
      state.isAuthenticated = true;
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.email = null;
      state.name = null;
    },
    updatePreferences: (state, action: PayloadAction<Partial<UserState['preferences']>>) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
  },
});

export const { setUser, logout, updatePreferences } = userSlice.actions;
export default userSlice.reducer; 