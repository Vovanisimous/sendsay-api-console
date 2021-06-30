import { createSlice } from "@reduxjs/toolkit";

const inititialState = () => {
  const localHistory = localStorage.getItem("request-history");

  return localHistory
    ? {
        requestHistory: JSON.parse(localHistory),
        request: {},
        response: {},
      }
    : {
        requestHistory: [],
        request: {},
        response: {},
      };
};

const requestHistorySlice = createSlice({
  name: "requestHistory",
  initialState: inititialState(),
  reducers: {
    setHistory(state, action) {
      const history = {
        request: action.payload.request,
        response: action.payload.response,
      };

      const equalHistoryIndex = state.requestHistory.findIndex((item: any) => {
        return item.request.action === history.request.action;
      });

      if (equalHistoryIndex === -1) {
        if (state.requestHistory.length === 15) state.requestHistory.pop();

        state.requestHistory.unshift(history);
      } else {
        state.requestHistory[equalHistoryIndex] = history;
      }

      localStorage.setItem(
        "request-history",
        JSON.stringify(state.requestHistory)
      );
    },
    deleteHistory(state) {
      state.requestHistory = [];
      localStorage.setItem("request-history", JSON.stringify([]));
    },
    deleteOneHistory(state, action) {
      state.requestHistory.splice(action.payload.index, 1);
      localStorage.setItem(
        "request-history",
        JSON.stringify(state.requestHistory)
      );
    },
    setRequestAndResponse(state, action) {
      state.request = action.payload.request;
      state.response = action.payload.response;
    },
  },
});

export const {
  setHistory,
  setRequestAndResponse,
  deleteHistory,
  deleteOneHistory,
} = requestHistorySlice.actions;

export default requestHistorySlice.reducer;
