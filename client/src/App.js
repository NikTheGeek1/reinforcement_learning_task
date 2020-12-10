import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import Dashboard from './pages/Dashboard/Dashboard';

import GameTypeReducer from './store/reducers/gameType';
import parametersReducer from './store/reducers/parameters';

const rootReducer = combineReducers({
  gameType: GameTypeReducer,
  parameters: parametersReducer
});

const store = createStore(rootReducer);


const App = props => {

  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
};

export default App;