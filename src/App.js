
import * as React from 'react';
import Dashboard from './components/dashboard';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { NextUIProvider } from '@nextui-org/react';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App">
      
       <NextUIProvider>
      <Provider store={store}>
        <Dashboard />
      </Provider>
      </NextUIProvider>
      
    </div>
  );
}

export default App;
