# `duck-magic`

[![Travis](https://img.shields.io/travis/azz/duck-magic.svg?style=flat-square)](https://travis-ci.org/azz/duck-magic)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![npm](https://img.shields.io/npm/v/duck-magic.svg?style=flat-square)](https://npmjs.org/duck-magic)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)

> Utilities for Ducks - Modular Redux

The library is a small set of utilities for managing ducks written to the **[Ducks Modular Redux](https://github.com/erikras/ducks-modular-redux)** design. However, to reduce the boilerplate, the interface for a "duck" when using this library is:

```ts
interface Duck<State> {
  reducer: (state: State, action) => State;
  actions: Record<string, Function>;
  selectors: Record<string, (state: State) => any>;
}
```

## Install

With `yarn`:

```shellsession
yarn add duck-magic
```

With `npm`:

```shellsession
npm install --save duck-magic
```

# Example

```js
// ducks/math.js
const ADD = 'ADD';
const SUB = 'SUB';

export const reducer = (state = 0, { type, payload }) => {
  switch (type) {
    case ADD:
      return state + payload;
    case SUB:
      return state - payload;
    default:
      return state;
  }
};

export const actions = {
  add: value => ({ type: ADD, payload: value }),
  subtract: value => ({ type: SUB, payload: value }),
};

export const selectors = {
  isEven: state => state % 2 === 0,
  getValue: state => state,
};
```

Then in your index file:

```js
// ducks/index.js
import {
  composeActionCreators,
  composeSelectors,
  createRootReducer,
} from 'duck-magic';

import * as math from './math';

const ducks = {
  math,
  // the rest of your reducers...
};

export const rootReducer = createRootReducer(ducks);
export const actions = composeActionCreators(ducks);
export const selectors = composeSelectors(ducks);
```

And finally, in your component:

```js
import { connect } from 'react-redux';
import { selectors, actions } from '../ducks';

function Counter({ value, onAdd, onSubtract }) {
  // ...
}

const mapState = state => {
  value: selectors.math.getValue(state),
};
const mapDispatch = {
  onAdd: actions.math.add,
  onSubtract: actions.math.subtract,
};

export default connect(
  mapState,
  mapDispatch,
)(Counter);
```

## API

## `composeActionCreators(ducks, [extraActionCreators])

Given an object containing ducks as values, returns another object whose values are the `actions` property of each duck.

## `composeSelectors(ducks, [extraSelectors])

Given an object containing ducks as values, returns another object whose values are the `selectors` property of each duck. The portion of state under the duck's key will be passed to the underlying selector.

## `createRootReducer(ducks, [extraReducers])

Given an object containing ducks as values, returns a function that is the result of calling Redux's `combineReducers` on all the `reducer`s.
