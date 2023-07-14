import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { api, authHeaders } from '../../configuration'
import { useDispatch } from "react-redux";

const initialState = {
    initLoad: false,
    todoList: [],
    statusMessage: ""
};

export const apiGetTodos = createAsyncThunk('todo/all', async (token) => {
  const response = await axios.get(`${api}/todo/all`, { headers: authHeaders(token) });
    return response.data
})

export const apiAddTodo = createAsyncThunk('todo/create', async (data) => {
    const response = await axios.post(`${api}/todo/create`, { content: data.todo }, { headers: authHeaders(data.token) });
    return response.data
  })

  export const apiCompleteTodo = createAsyncThunk('todo/complete', async (data) => {
    const response = await axios.post(`${api}/todo/complete`, { id: data.todoId }, { headers: authHeaders(data.token) });
    return response.data
  })

  export const apiDeleteTodo = createAsyncThunk('todo/delete', async (data) => {
    const response = await axios.post(`${api}/todo/delete`, { id: data.todoId }, { headers: authHeaders(data.token) });
    return response.data
  })


const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
  },
  extraReducers: {
    [apiGetTodos.fulfilled]: (state, action) => {
        state.todoList = action.payload
    },
    [apiGetTodos.rejected]: (state, action) => {
      state.todoList = []
    },
    [apiAddTodo.fulfilled]: (state, action) => {
        state.statusMessage = ""
    },
    [apiAddTodo.rejected]: (state, action) => {
      state.statusMessage = "Greska pri dodavanju!"
    },
    [apiCompleteTodo.fulfilled]: (state, action) => {
        state.statusMessage = ""
    },
    [apiCompleteTodo.rejected]: (state, action) => {
      state.statusMessage = "Greska pri editovanju!"
    },
    [apiDeleteTodo.fulfilled]: (state, action) => {
        state.statusMessage = ""
    },
    [apiDeleteTodo.rejected]: (state, action) => {
      state.statusMessage = "Greska pri brisanju!"
    },
  }
});

export default todoSlice.reducer;