import { configureStore } from '@reduxjs/toolkit';
import { StateScheme } from 'app/providers/StoreProvider/config/stateScheme';
import { counterReducer } from 'entities/Counter';

export function createReduxStore(initialState?: StateScheme) {
    return configureStore<StateScheme>({
        reducer: {
            counter: counterReducer,
        },
        devTools: __IS_DEV__,
        preloadedState: initialState,
    });
}
