import {
  composeActionCreators,
  createRootReducer,
  composeSelectors,
  Duck,
} from 'duck-magic';

const ducks = {
  john: {
    selectors: {
      getA: state => state.a,
      getB: state => state.b,
    },
    reducer: (state, action) => state,
    actions: {
      setA: (a: string) => ({ type: 'SET_A', payload: a }),
      setB: (b: number) => ({ type: 'SET_B', payload: b }),
    },
  },
};

const john: Duck = ducks.john;

composeActionCreators(); // $ExpectError

const actionsA = composeActionCreators(ducks);
actionsA.john;
actionsA.john.setA(1); // $ExpectError
actionsA.john.setA('a');

const actionsB = composeActionCreators(ducks, {
  setC: () => ({ type: 'SET_C' }),
});
actionsB.john;
actionsB.setC();

createRootReducer(); // $ExpectError

const reducerA = createRootReducer(ducks);
reducerA({}, {}); // $ExpectError
reducerA({}, { type: 'x' });

const reducerB = createRootReducer(ducks, { bob: (state, action) => state });
reducerB({}, {}); // $ExpectError
reducerB({}, { type: 'x' });

composeSelectors(); // $ExpectError

const selectorsA = composeSelectors(ducks);
selectorsA.john;
selectorsA.john.getA(); // $ExpectError
selectorsA.john.getFoo({}); // $ExpectError
selectorsA.john.getA({});

const selectorsB = composeSelectors(ducks, { getC: state => state.c });
selectorsB.john;
selectorsB.getC(); // $ExpectError
selectorsB.getC({});
