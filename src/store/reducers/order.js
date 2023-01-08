import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

/// Purchaseinit
const purchaseinit = (state, action) => {
  return updateObject(state, {
    purchased: false
  });
};

const purchaseStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const purchaseSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.orderId });
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder)
  });
};

const purchaseFail = (state, action) => {
  return updateObject(state, { loading: false });
};
const fetchOrderStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const fetchOrderSuccess = (state, action) => {
  return updateObject(state, { orders: action.orders, loading: false });
};
const fetchOrderFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    /// Purchase Initializing
    case actionTypes.PURCHASE_INIT:
      return purchaseinit(state, action);

    ///Purchase will start fetching
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseStart(state, action);

    /// Purchase fatching success
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseSuccess(state, action);

    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseFail(state, action);

    case actionTypes.FETCH_ORDERS_START:
      return fetchOrderStart(state, action);

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrderSuccess(state, action);

    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchOrderFail(state, action);

    default:
      return state;
  }
};

export default reducer;
