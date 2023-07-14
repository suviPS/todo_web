import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { api, headers } from '../../configuration'

const initialState = {
    showRegister: false,
    showLogin: false,
    token: null,
    statusMessage: ""
};

export const apiRegister = createAsyncThunk('auth/register', async (registerInfo) => {
  const response = await axios.post(`${api}/auth/register`, registerInfo);
    return response.data
})

export const apiLogin = createAsyncThunk('auth/login', async (loginInfo) => {
  const response = await axios.post(`${api}/auth/login`, loginInfo, {
        headers: headers,
    });
    return response.data
})

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    showRegisterFun: (state) => {
        state.showRegister = true
        state.showLogin = false
      },
      showLoginFun: (state) => {
        state.showRegister = false
        state.showLogin = true
      },
  },
  extraReducers: {
    [apiRegister.fulfilled]: (state, action) => {
      state.token = null
      state.showLogin = true
      state.showRegister = false
      state.statusMessage = "Registracija uspjesna!"
      console.log(action.payload)
    },
    [apiRegister.rejected]: (state, action) => {
      state.token = null
      state.statusMessage = "Korisnik vec postoji!"
      console.log(action.payload)
    },
    [apiLogin.fulfilled]: (state, action) => {
      state.token = action.payload.token
      state.statusMessage = ""
    },
    [apiLogin.rejected]: (state, action) => {
      state.token = null
      state.statusMessage = action.error.message
    },
  }
});

export const { showRegisterFun, showLoginFun } = authSlice.actions;

export default authSlice.reducer;