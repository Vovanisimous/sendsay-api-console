import {
   configureStore,
   combineReducers,
   getDefaultMiddleware
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authSlice from "../features/auth/authSlice";
import requestHistorySlice from "../features/request_history/requestHistorySlice";
import watcherSaga from "../sagas";

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
   auth: authSlice,
   requestHistory: requestHistorySlice
});

const store = configureStore({
reducer,
middleware: [...getDefaultMiddleware({ thunk: false, serializableCheck: false }), sagaMiddleware]
});

sagaMiddleware.run(watcherSaga);

export type RootState = ReturnType<typeof store.getState>
export default store;