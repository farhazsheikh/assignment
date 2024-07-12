import {
  ADD_EXPENSE,
  UPDATE_EXPENSE,
  DELETE_EXPENSE,
  MOVE_EXPENSE,
} from "./type";

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});

export const updateExpense = (expense) => ({
  type: UPDATE_EXPENSE,
  payload: expense,
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  payload: id,
});

export const moveExpense = (id, newCategory) => ({
  type: MOVE_EXPENSE,
  payload: { id, newCategory },
});
