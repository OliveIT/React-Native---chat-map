import { AsyncStorage } from 'react-native';
import devTools from 'remote-redux-devtools';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import reducer from './reducers';
import promise from './promise';
let store;
export function configureStore(onCompletion:()=>void):any {
  const enhancer = compose(
    applyMiddleware(thunk, promise),
    devTools({
      name: 'nativestarterkit', realtime: true,
    }),
  );

  store = createStore(reducer, enhancer);
  persistStore(store, { storage: AsyncStorage }, onCompletion);

  return store;
}

export function getStore() {
  return store;
}
