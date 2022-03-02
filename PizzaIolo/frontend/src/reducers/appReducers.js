import {
  PIZZA_LIST_REQUEST,
  PIZZA_LIST_SUCCESS,
  PIZZA_LIST_FAIL,
  PIZZA_INGREDIENTS_REQUEST,
  PIZZA_INGREDIENTS_SUCCESS,
  PIZZA_INGREDIENTS_FAIL,
  MAKE_PIZZA_REQUEST,
  MAKE_PIZZA_SUCCESS,
  MAKE_PIZZA_FAIL,
  MAKE_PIZZA_RESET,
  GET_PIZZA_SUCCESS,
  GET_PIZZA_FAIL,
  GET_PIZZA_REQUEST,
  BASKET_ADD_ITEM,
  BASKET_REMOVE_ITEM,
  BASKET_CLEAR_ITEMS,
  BASKET_SAVE_SHIPPING_ADDRESS,
  BASKET_SAVE_PAYMENT_METHOD,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_RESET,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
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

export const pizzaListReducer = (state = { pizzas: [] }, action) => {
  switch (action.type) {
    case PIZZA_LIST_REQUEST:
      return { loading: true, pizzas: [] };
    case PIZZA_LIST_SUCCESS:
      return {
        loading: false,
        pizzas: action.payload,
      };
    case PIZZA_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const pizzaIngredientsReducer = (
  state = { crusts: [], sauces: [], cheeses: [], veggies: [] },
  action
) => {
  switch (action.type) {
    case PIZZA_INGREDIENTS_REQUEST:
      return {
        loading: true,
        crusts: [],
        sauces: [],
        cheeses: [],
        veggies: [],
      };
    case PIZZA_INGREDIENTS_SUCCESS:
      return {
        loading: false,
        crusts: action.payload.crusts,
        sauces: action.payload.sauces,
        cheeses: action.payload.cheeses,
        veggies: action.payload.veggies,
      };
    case PIZZA_INGREDIENTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const makePizzaReducer = (state = { pizza: {} }, action) => {
  switch (action.type) {
    case MAKE_PIZZA_REQUEST:
      return { loading: true };
    case MAKE_PIZZA_SUCCESS:
      return { loading: false, success: true, pizza: action.payload };
    case MAKE_PIZZA_FAIL:
      return { loading: false, error: action.payload };
    case MAKE_PIZZA_RESET:
      return {};
    default:
      return state;
  }
};

export const pizzaDetailReducer = (
  state = { pizza: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case GET_PIZZA_REQUEST:
      return { loading: true, ...state };
    case GET_PIZZA_SUCCESS:
      return {
        loading: false,
        success: true,
        pizza: action.payload,
      };
    case GET_PIZZA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case BASKET_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.pizza === item.pizza);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.pizza === existItem.pizza ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case BASKET_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.pizza !== action.payload),
      };

    case BASKET_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case BASKET_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    case BASKET_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_LIST_MY_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case ORDER_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_LIST_MY_RESET:
      return {
        orders: [],
      };
    default:
      return state;
  }
};

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        loading: true,
      };
    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const changeOrderStatus = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_ORDER_STATUS_REQUEST:
      return {
        loading: true,
      };
    case CHANGE_ORDER_STATUS_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CHANGE_ORDER_STATUS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CHANGE_ORDER_STATUS_RESET:
      return {};
    default:
      return state;
  }
};

export const createPizzaReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PIZZA_REVIEW_REQUEST:
      return { loading: true };
    case CREATE_PIZZA_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case CREATE_PIZZA_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_PIZZA_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};
