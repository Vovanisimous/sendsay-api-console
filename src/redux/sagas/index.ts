import { all, fork } from "redux-saga/effects";

import auth from "./auth";
import requestHistory from "./requestHistory";

export default function* root() {
  yield all([fork(auth), fork(requestHistory)]);
}
