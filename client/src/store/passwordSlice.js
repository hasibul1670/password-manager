import { createSlice } from '@reduxjs/toolkit';
import CryptoJS from 'crypto-js';
import { demoPasswords } from './demoData';

const initialState = {
  passwords: demoPasswords,
  categories: ['Personal', 'Work', 'Finance', 'Social'],
  searchTerm: '',
  selectedCategory: 'All',
};

export const passwordSlice = createSlice({
  name: 'passwords',
  initialState,
  reducers: {
    addPassword: (state, action) => {
      const { title, username, password, category, notes } = action.payload;
      const encryptedPassword = CryptoJS.AES.encrypt(
        password,
        import.meta.env.VITE_ENCRYPTION_KEY || 'default-key'
      ).toString();

      state.passwords.push({
        id: Date.now(),
        title,
        username,
        password: encryptedPassword,
        category,
        notes,
        createdAt: new Date().toISOString(),
      });
    },
    deletePassword: (state, action) => {
      state.passwords = state.passwords.filter(
        (password) => password.id !== action.payload
      );
    },
    updatePassword: (state, action) => {
      const { id, ...updates } = action.payload;
      const passwordIndex = state.passwords.findIndex((p) => p.id === id);
      if (passwordIndex !== -1) {
        if (updates.password) {
          updates.password = CryptoJS.AES.encrypt(
            updates.password,
            import.meta.env.VITE_ENCRYPTION_KEY || 'default-key'
          ).toString();
        }
        state.passwords[passwordIndex] = {
          ...state.passwords[passwordIndex],
          ...updates,
        };
      }
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    addCategory: (state, action) => {
      if (!state.categories.includes(action.payload)) {
        state.categories.push(action.payload);
      }
    },
  },
});

export const {
  addPassword,
  deletePassword,
  updatePassword,
  setSearchTerm,
  setSelectedCategory,
  addCategory,
} = passwordSlice.actions;

export default passwordSlice.reducer;