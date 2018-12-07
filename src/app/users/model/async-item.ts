export interface AsyncItem<T> {
    isLoading : boolean;
    
    data     ?: T;
    uid      ?: string;

    error    ?: Error;
    cachedAt ?: Date;
}

export function makeAsyncItem<T>(data:T = null) {
  return {
    isLoading: true,
    error: false,
    data
  };
}