export function composeActionCreators(ducks, extraActionCreators) {
  return {
    ...Object.keys(ducks).reduce(
      (object, key) => ({ ...object, [key]: ducks[key].actions }),
      {},
    ),
    ...extraActionCreators,
  };
}
