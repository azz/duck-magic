// TypeScript Version: 2.3
export interface Duck<TDuckState = any> {
  reducer: (state: TDuckState, action: any) => TDuckState;
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

export type PaddlingOfDucks<TDuckNames extends string> = Record<
  TDuckNames,
  Duck
>;

/**
 * `composeActionCreators`
 */

export function composeActionCreators<
  TDuckNames extends string,
  TExtraACNames extends string = never
>(
  ducks: PaddlingOfDucks<TDuckNames>,
  extraActionCreators?: Record<TExtraACNames, ActionCreator>,
): Record<TDuckNames, Record<string, ActionCreator>> &
  Record<TExtraACNames, ActionCreator>;

/**
 * `composeSelectors`
 */

export function composeSelectors<
  TDuckNames extends string,
  TExtraSelectorNames extends string = never
>(
  ducks: PaddlingOfDucks<TDuckNames>,
  extraSelectors?: Record<TExtraSelectorNames, Selector<any>>,
): Record<TDuckNames, Record<string, Selector<any>>> &
  Record<TExtraSelectorNames, Selector<any>>;

/**
 * `createRootReducer`
 */

export function createRootReducer<TState>(
  ducks: PaddlingOfDucks<string>,
  extraReducers?: Record<string, Reducer<any>>,
): (state: TState, action: Action) => TState;
