import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { history, Role } from './_helpers';
import { authenticationService } from './_services/authentication.service';
import PrivateRoute from './_components/PrivateRoute';
import Page from './pages';
import ManagerView from './pages/managerView/index';
import EmployeeView from './pages/employeeView';
import UserView from './pages/userView';

  
function App() {
    function logout() {
        authenticationService.logout();
        history.push('/');
        window.location.reload(true);
    }

    return (
        <Router history={history}>
            <Routes>
                <Route exact path='/' element={<Page history={history}/>} />
                <Route path="/user" element = { <PrivateRoute roles={[Role.User]} element={<UserView logout={logout} />} /> } />
                <Route path="/employee" element = { <PrivateRoute roles={[Role.Employee]} element={<EmployeeView logout={logout} />} /> } />
                <Route path="/manager" element = { <PrivateRoute roles={[Role.Manager]} element={<ManagerView logout={logout} />} /> } />
            </Routes>
        </Router>
    );
}
  
export default App;