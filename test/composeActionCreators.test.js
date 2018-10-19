import { composeActionCreators } from '../src';

test('composes multiple action creators', () => {
  const ducks = {
    duck: {
      actions: {
        quack: () => ({ type: 'QUACK' }),
      },
    },
    dog: {
      actions: {
        bark: () => ({ type: 'BARK' }),
        woof: () => ({ type: 'WOOF' }),
      },
    },
  };
  const actions = composeActionCreators(ducks);

  expect(actions).toMatchInlineSnapshot(`
Object {
  "dog": Object {
    "bark": [Function],
    "woof": [Function],
  },
  "duck": Object {
    "quack": [Function],
  },
}
`);

  expect(actions.dog.woof()).toEqual({ type: 'WOOF' });
});

test('accepts additional top-level action creators', () => {
  const ducks = {
    duck: {
      actions: {
        quack: () => ({ type: 'QUACK' }),
      },
    },
  };
  const otherActionCreator = { random: () => ({ type: 'RANDOM' }) };
  const actions = composeActionCreators(ducks, otherActionCreator);

  expect(actions).toMatchInlineSnapshot(`
Object {
  "duck": Object {
    "quack": [Function],
  },
  "random": [Function],
}
`);

  expect(actions.random()).toEqual({ type: 'RANDOM' });
});
