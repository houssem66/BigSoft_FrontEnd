
import * as React from 'react';
import Dashboard from './components/dashboard';
import DashboardUser from './components/dashboardUser';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { NextUIProvider } from '@nextui-org/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import authService from './Services/AuthServices';
function App() {
  const [role,setRole]=React.useState('');
  React.useEffect(() => {
    var user = authService.getCurrentUser();
    if (user!=null){
      setRole(user.role)
    }
   
  }, [])
  return (
    <div className="App">

      <NextUIProvider>
        <Provider store={store}>
          {
          (role=="Grossiste")?( <Dashboard />):(<DashboardUser></DashboardUser>)}
         
        </Provider>
      </NextUIProvider>

    </div>
  );
}

export default App;
