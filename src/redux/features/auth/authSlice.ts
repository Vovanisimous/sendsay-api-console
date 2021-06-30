import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   session: '',
   login: '',
   sublogin: '',
   loading: false,
   error: '',
}

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      setLoading: (state) => {
         state.loading = true
      },
      setError: (state, action) => {
         state.error = action.payload.error
      },
      setUser: (state, action) => {
         state.loading = false;
         state.session = action.payload.session;
         state.login = action.payload.login;
         state.sublogin = action.payload.sublogin;
      },
      removeUser: (state) => {
         state.loading = false;
         state.session = '';
         state.login = '';
         state.sublogin = '';
      }
   }
})

export const {setLoading, setUser, removeUser, setError} = authSlice.actions;

export default authSlice.reducer;