import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import directoryReducer from './directory/directory.reducer';
import fpsReducer from './fps/fps.reducer';
import userReducer from './user/user.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['fps'],
};

const rootReducer = combineReducers({
  fps: fpsReducer,
  directory: directoryReducer,
  user: userReducer,
});

export default persistReducer(persistConfig, rootReducer);
