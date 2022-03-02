import {
  PIZZA_LIST_REQUEST,
  PIZZA_LIST_SUCCESS,
  PIZZA_LIST_FAIL,
  MAKE_PIZZA_REQUEST,
  MAKE_PIZZA_SUCCESS,
  MAKE_PIZZA_FAIL,
  MAKE_PIZZA_RESET,
  PIZZA_INGREDIENTS_REQUEST,
  PIZZA_INGREDIENTS_SUCCESS,
  PIZZA_INGREDIENTS_FAIL,
  GET_PIZZA_SUCCESS,
  GET_PIZZA_FAIL,
  GET_PIZZA_REQUEST,
  BASKET_ADD_ITEM,
  BASKET_REMOVE_ITEM,
  BASKET_SAVE_PAYMENT_METHOD,
  BASKET_SAVE_SHIPPING_ADDRESS,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  BASKET_CLEAR_ITEMS,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  CHANGE_ORDER_STATUS_REQUEST,
  CHANGE_ORDER_STATUS_SUCCESS,
  CHANGE_ORDER_STATUS_FAIL,
  CHANGE_ORDER_STATUS_RESET,
  CREATE_PIZZA_REVIEW_REQUEST,
  CREATE_PIZZA_REVIEW_SUCCESS,
  CREATE_PIZZA_REVIEW_FAIL,
  CREATE_PIZZA_REVIEW_RESET,
} from "../constants/appConstants";
import axios from "axios";
import { Action } from "history";

export const listPizzas = () => async (dispatch) => {
  try {
    dispatch({ type: PIZZA_LIST_REQUEST });
    const { data } = await axios.get("/api/app/");
    dispatch({
      type: PIZZA_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PIZZA_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listPizzaIngredients = () => async (dispatch) => {
  try {
    dispatch({ type: PIZZA_INGREDIENTS_REQUEST });
    const { data } = await axios.get("/api/app/pizza/ingredients/");
    dispatch({
      type: PIZZA_INGREDIENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PIZZA_INGREDIENTS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const makePizza = (pizza) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MAKE_PIZZA_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/app/pizza/make/`, pizza, config);

    dispatch({
      type: MAKE_PIZZA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MAKE_PIZZA_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getPizzaDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_PIZZA_REQUEST });
    const { data } = await axios.get(`/api/app/pizza/${id}`);
    dispatch({
      type: GET_PIZZA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PIZZA_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const addToBasket = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/app/pizza/${id}`);

  dispatch({
    type: BASKET_ADD_ITEM,
    payload: {
      pizza: data.id,
      name: data.name,
      image: data.image,
      price:
        Number(data.crust.price) +
        Number(data.sauce.price) +
        Number(data.cheese.price) +
        Number(data.veggie.price),
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromBasket = (id) => (dispatch, getState) => {
  dispatch({
    type: BASKET_REMOVE_ITEM,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post("/api/app/orders/add/", order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: BASKET_CLEAR_ITEMS,
      payload: data,
    });
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/app/orders/${id}/`, config);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: BASKET_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: BASKET_SAVE_PAYMENT_METHOD,
    payload: data,
  });
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/app/orders/myorders/`, config);

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/app/orders/`, config);

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const changeOrderStatus =
  (order, status) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CHANGE_ORDER_STATUS_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/app/orders/${order.id}/changestatus/`,
        status,
        config
      );

      dispatch({
        type: CHANGE_ORDER_STATUS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CHANGE_ORDER_STATUS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const createPizzaReview =
  (pizzaId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_PIZZA_REVIEW_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/app/pizzas/${pizzaId}/reviews/`,
        review,
        config
      );

      dispatch({
        type: CREATE_PIZZA_REVIEW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_PIZZA_REVIEW_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
