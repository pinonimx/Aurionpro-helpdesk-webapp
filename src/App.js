import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Page from './pages';
import ManagerView from './pages/managerView/index';
import Dataentry from './pages/Dataentry';
import EmployeeView from './pages/employeeView';
import UserView from './pages/userView';
  
function App() {
    return (
        <Router>
        <Routes>
            <Route exact path='/' element={<Page />} />
            <Route path='/manager' element={<ManagerView />} />
            <Route path='/dataentry' element={<Dataentry />} />
            <Route path='/employee' element={<EmployeeView />} />
            <Route path='/user' element={<UserView />} />
        </Routes>
        </Router>
    );
}
  
export default App;