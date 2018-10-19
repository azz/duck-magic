import { combineReducers } from 'redux';

export function createRootReducer(ducks, extraReducers = {}) {
  const localReducers = Object.keys(ducks).reduce(
    (object, key) => ({ ...object, [key]: ducks[key].reducer }),
    {},
  );

  return combineReducers({
    ...localReducers,
    ...extraReducers,
  });
}
