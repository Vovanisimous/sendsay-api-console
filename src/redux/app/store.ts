import {
   configureStore,
   combineReducers,
   getDefaultMiddleware
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authSlice from "../features/auth/authSlice";
import watcherSaga from "../sagas";

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
   auth: authSlice
});

const store = configureStore({
reducer,
middleware: [...getDefaultMiddleware({ thunk: false, serializableCheck: false }), sagaMiddleware]
});

sagaMiddleware.run(watcherSaga);

export type RootState = ReturnType<typeof store.getState>
export default store;