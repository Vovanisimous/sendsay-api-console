import { createAction } from '@reduxjs/toolkit';
import {all, put, call, takeLatest} from 'redux-saga/effects';
import api from '../../helpers/sendsay';
import {setLoading, setUser, removeUser, setError} from '../features/auth/authSlice';

interface IAuthenticate {
   type: string;
   payload: IAuthParams
}

export interface IAuthParams {
   login: string;
   sublogin: string;
   password: string;
}

export const authenticationCheckAction = createAction('auth/authenticationCheck');
export const authenticateAction = createAction<IAuthParams>('auth/authenticate');
export const logoutAction = createAction('auth/logout')

function* authenticationCheck() {
  try {
    yield api.sendsay.request({
      action: 'pong',
    });
  } catch (error) {
    if (error.id === 'error/auth/failed') {
      yield call(removeUser);
    }
  }
}

function* authenticate({payload}: IAuthenticate){
   try {
      yield put(setLoading())
      yield put(setError({error: ''}))

      yield api.sendsay
         .login({
            login: payload.login,
            sublogin: payload.sublogin,
            password: payload.password,
         });

      document.cookie = `sendsay_session=${api.sendsay.session}`;

      yield put(
         setUser({
         session: api.sendsay.session,
         login: payload.login,
         sublogin: payload.sublogin,
         })
      );
   }catch (err) {
      yield call(logout)
      const {request, ...error} = err
      yield put(
         setError({error: JSON.stringify(error)})
      )
      console.log('err', err);
   }
}

function* logout() {
  yield put(removeUser());
  document.cookie = '';
}

export default function* root() {
  yield all([
    takeLatest(authenticationCheckAction.type, authenticationCheck),
    takeLatest(authenticateAction.type, authenticate), 
    takeLatest(logoutAction.type, logout),
  ]);
}