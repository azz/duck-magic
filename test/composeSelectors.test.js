import { composeSelectors } from '../src';

test('composes multple selectors', () => {
  const ducks = {
    duck: {
      selectors: {
        feathers: state => state.feathers,
      },
    },
    dog: {
      selectors: {
        isGoodBoy: () => true,
        age: state => state.ageDogYears * 7,
      },
    },
  };
  const selectors = composeSelectors(ducks);

  expect(selectors).toMatchInlineSnapshot(`
Object {
  "dog": Object {
    "age": [Function],
    "isGoodBoy": [Function],
  },
  "duck": Object {
    "feathers": [Function],
  },
}
`);

  expect(selectors.dog.isGoodBoy({ dog: {} })).toEqual(true);
  expect(selectors.dog.age({ dog: { ageDogYears: 1 } })).toEqual(7);
});

test('accepts extra top-level selectors', () => {
  const ducks = {
    duck: {
      selectors: {
        feathers: state => state.feathers,
      },
    },
  };
  const extraSelectors = { getBanana: state => state.banana };
  const selectors = composeSelectors(ducks, extraSelectors);

  expect(selectors.getBanana({ banana: 'boat' })).toEqual('boat');
});
