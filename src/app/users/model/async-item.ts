export enum AsyncItemState {
  UNINITIALIZED = "uninitialized",
  LOADING  = "loading",
  POLLING = "refreshing",
  LOADED  = "loaded",
  ERROR   = "error"
}


export interface AsyncItem<T> {    
    state     : AsyncItemState;
    error    ?: Error;
    cachedAt ?: Date;

    isPolling: boolean;
    isLoading: boolean;
    isLoaded: boolean;
    isError: boolean;

    data     ?: T;          
}

/**
 * Wrapper function to easily determine async state
 */
export function queryState<T>(item:AsyncItem<T>) {
  return {
    isPolling : () => item.state === AsyncItemState.POLLING,
    isLoading : () => item.state === AsyncItemState.LOADING,
    isLoaded  : () => item.state === AsyncItemState.LOADED
  };
}

/**
 * Simple construction function...
 */
export function makeAsyncItem<T>(data:T = null, state = AsyncItemState.LOADING) {
  return { state, data };
}