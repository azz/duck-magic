export function composeSelectors(ducks, extraSelectors = {}) {
  return {
    ...Object.keys(ducks).reduce(
      (object, key) => ({
        ...object,
        [key]: _composeSelectors(ducks[key].selectors, state => state[key]),
      }),
      {},
    ),
    ...extraSelectors,
  };
}

function _composeSelectors(selectors, getState) {
  return Object.keys(selectors).reduce(
    (composed, key) => ({
      ...composed,
      [key]: rootState => {
        return selectors[key](getState(rootState));
      },
    }),
    {},
  );
}
