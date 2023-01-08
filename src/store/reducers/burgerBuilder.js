import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.igName]: state.ingredients[action.igName] + 1
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.igName],
    building: true
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const updatedIngredient = {
    [action.igName]: state.ingredients[action.igName] - 1
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.igName],
    building: true
  };
  return updateObject(state, updatedState);
};

const setIngredient = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.cheese
    },
    totalPrice: 4,
    error: false,
    building: false
  });
};
const fetchIngredient = (state, action) => {
  return updateObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    /// Add Ingredients
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);

    /// Remove Ingredient
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);

    /// Set Ingredient from server
    case actionTypes.SET_INGREDIENT:
      return setIngredient(state, action);

    /// Fetch Ingredient Error
    case actionTypes.FETCH_INGREDIENT_FAILED:
      return fetchIngredient(state, action);

    default:
      return state;
  }
};

export default reducer;
