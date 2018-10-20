// TypeScript Version: 2.3
export interface Duck<TDuckState = any> {
  reducer: (state: TDuckState, action: Action) => TDuckState;
  actions: Record<string, ActionCreator>;
  selectors: Record<string, (state: TDuckState) => any>;
}

export interface Action {
  type: string;
}
export type ActionCreator<TReturn extends Action = any> = (
  ...args: any[]
) => TReturn;

export type Selector<TState> = (state: TState) => any;

export type Reducer<TState> = (state: TState, action: Action) => TState;

export type PaddlingOfDucks = Record<string, Duck>;

/**
 * `composeActionCreators`
 *
 * Given an object containing ducks as values, returns another object whose
 * values are the `actions` property of each duck.
 */
export function composeActionCreators<TDucks extends PaddlingOfDucks>(
  ducks: TDucks,
): {
  [D in keyof TDucks]: {
    [DAC in keyof (TDucks[D]['actions'])]: TDucks[D]['actions'][DAC]
  }
};
export function composeActionCreators<
  TDucks extends PaddlingOfDucks,
  TExtra extends Record<string, ActionCreator>
>(
  ducks: TDucks,
  extraActionCreators?: TExtra,
): {
  [D in keyof TDucks]: {
    [DAC in keyof (TDucks[D]['actions'])]: TDucks[D]['actions'][DAC]
  }
} &
  TExtra;

/**
 * `composeSelectors`
 *
 * Given an object containing ducks as values, returns another object whose
 * values are the `selectors` property of each duck.
 * The portion of state under the duck's key will be passed to the underlying
 * selector.
 */
export function composeSelectors<TDucks extends PaddlingOfDucks>(
  ducks: TDucks,
): {
  [D in keyof TDucks]: {
    [DS in keyof (TDucks[D]['selectors'])]: TDucks[D]['selectors'][DS]
  }
};
export function composeSelectors<
  TDucks extends PaddlingOfDucks,
  TExtra extends Record<string, Selector<any>>
>(
  ducks: TDucks,
  extraSelectors?: TExtra,
): {
  [D in keyof TDucks]: {
    [DS in keyof (TDucks[D]['selectors'])]: TDucks[D]['selectors'][DS]
  }
} &
  TExtra;

/**
 * `createRootReducer`
 *
 * Given an object containing ducks as values, returns a function that is the
 * result of calling Redux's `combineReducers` on all the `reducer`s.
 */
export function createRootReducer<TState>(
  ducks: PaddlingOfDucks,
  extraReducers?: Record<string, Reducer<any>>,
): (state: TState, action: Action) => TState;
