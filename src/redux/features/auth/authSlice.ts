import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
   loading: boolean;
   session: string;
   login: string;
   sublogin: string;
}

export interface ISetUserAction {
   type: string;
   payload: {
      session: string;
      login: string;
      sublogin: string;
   }
}

const initialState: IInitialState = {
   session: '',
   login: '',
   sublogin: '',
   loading: false
}

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      setLoading: (state) => {
         state.loading = true
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

export const {setLoading, setUser, removeUser} = authSlice.actions;

export default authSlice.reducer;