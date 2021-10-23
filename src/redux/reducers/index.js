import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import fpsReducer from './fps/fps.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['fps'],
};

const rootReducer = combineReducers({
  fps: fpsReducer,
});

export default persistReducer(persistConfig, rootReducer);
