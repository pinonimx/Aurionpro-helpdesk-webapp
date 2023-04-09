import React from 'react';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Page from './pages';
import Manager from './pages/managerView/User';
import Dataentry from './pages/Dataentry';
  
function App() {
    return (
        <Router>
        <Routes>
            <Route exact path='/' element={<Page />} />
            <Route path='/user' element={<Manager />} />
            <Route path='/dataentry' element={<Dataentry />} />
        </Routes>
        </Router>
    );
}
  
export default App;