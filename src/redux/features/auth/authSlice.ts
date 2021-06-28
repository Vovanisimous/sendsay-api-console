import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
   loading: boolean;
   session: string;
   login: string;
   sublogin: string;
   error: string;
}

export interface ISetUserAction {
   type: string;
   payload: {
      session: string;
      login: string;
      sublogin: string;
   }
}

export interface ISetErrorAction {
   type: string;
   payload: {
      error: string;
   }
}

const initialState: IInitialState = {
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
      setError: (state, action: ISetErrorAction) => {
         state.error = action.payload.error
      },
      setUser: (state, action: ISetUserAction) => {
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