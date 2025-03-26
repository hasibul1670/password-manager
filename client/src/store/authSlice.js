import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  isEmailVerified: false,
  isAuthenticated: false,
  otpSent: false,
  otpVerified: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setOtpSent: (state, action) => {
      state.otpSent = action.payload;
    },
    setOtpVerified: (state, action) => {
      state.otpVerified = action.payload;
      state.isAuthenticated = action.payload;
    },
    logout: (state) => {
      state.email = '';
      state.isEmailVerified = false;
      state.isAuthenticated = false;
      state.otpSent = false;
      state.otpVerified = false;
    }
  }
});

export const { setEmail, setOtpSent, setOtpVerified, logout } = authSlice.actions;

export default authSlice.reducer;