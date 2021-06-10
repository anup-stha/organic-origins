import axios from "axios";
import * as actions from "../api";

const api = (store) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const {
    url,
    method,
    data,
    onStart,
    onSuccess,
    items,
    itemName,
    onError,
    headers,
  } = action.payload;
  if (onStart) store.dispatch({ type: onStart });
  next(action);

  try {
    const response = await axios.request({
      baseURL: "/",
      url,
      method,
      data,
      headers,
    });
    store.dispatch(actions.apiCallSuccess(response.data));
    if (onSuccess && !items)
      store.dispatch({ type: onSuccess, payload: response.data });
    if (onSuccess && items)
      store.dispatch({
        type: onSuccess,
        payload: { ...response.data, [itemName]: items },
      });
  } catch (error) {
    console.log(error.message);
    if (onError)
      store.dispatch({
        type: onError,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
  }
};

export default api;
