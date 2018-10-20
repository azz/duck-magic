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
      setA: a => ({ type: 'SET_A', payload: a }),
      setB: b => ({ type: 'SET_B', payload: b }),
    },
  },
};

const john: Duck = ducks.john;

composeActionCreators(); // $ExpectError

const actionsA = composeActionCreators(ducks);
actionsA.john;
actionsA.john.setA(1);

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
// selectorsA.john.getFoo({}); // $ExpectError
selectorsA.john.getA({});

const selectorsB = composeSelectors(ducks, { getC: state => state.c });
selectorsB.john;
selectorsB.getC(); // $ExpectError
selectorsB.getC({});
