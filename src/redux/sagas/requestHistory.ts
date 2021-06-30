import { createAction } from "@reduxjs/toolkit";
import { all, put, call, takeLatest } from "redux-saga/effects";
import api from "../../helpers/sendsay";
import { setRequestAndResponse } from "../features/request_history/requestHistorySlice";

export const requestExecutionAction = createAction<any>(
  "request_history/requestExecution"
);

const afv = async (request: any): Promise<any> => {
  return await api.sendsay.request(request);
};

function* requestExecution({ payload }: any): any {
  try {
    console.log(payload.request);
    const response = yield api.sendsay.request(payload.request);
    console.log(response);
    const request = payload.request;
    yield put(setRequestAndResponse({ request, response }));
  } catch (response) {
    const request = payload.request;
    yield put(setRequestAndResponse({ request, response }));
  }
}

export default function* root() {
  yield all([takeLatest(requestExecutionAction.type, requestExecution)]);
}
