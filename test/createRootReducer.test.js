import { createRootReducer } from '../src';

test('returns a function combining reducers', () => {
  const reducer = createRootReducer({
    math: {
      reducer: (state, action) => state + action,
    },
  });

  expect(reducer).toMatchInlineSnapshot(`[Function]`);
  expect(reducer({ math: 2 }, 2)).toEqual({ math: 4 });
});

test('accepts extra reducers', () => {
  const extraReducers = {
    minus: (state = 0, action) => {
      if (action.type == 'minus') return state - action.value;
      return state;
    },
  };
  const reducer = createRootReducer(
    {
      add: {
        reducer: (state = 0, action) => {
          if (action.type == 'add') return state + action.value;
          return state;
        },
      },
    },
    extraReducers,
  );

  expect(reducer({ add: 2 }, { type: 'add', value: 2 })).toEqual({
    add: 4,
    minus: 0,
  });
  expect(reducer({ minus: 4 }, { type: 'minus', value: 1 })).toEqual({
    add: 0,
    minus: 3,
  });
});
