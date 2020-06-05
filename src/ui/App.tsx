import React from 'react';

import { MainView } from './pages/MainView';
import { Router } from 'react-router-dom';
import { browserHistory } from 'lib/browser';

const App: React.FC = (): JSX.Element => {
  return (
    <div>
      <Router history={browserHistory}>
        <MainView />
      </Router>
    </div>
  );
};

export default App;
