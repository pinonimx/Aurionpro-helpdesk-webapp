import React from 'react';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Page from './pages';
import User from './pages/User';
  
function App() {
    return (
        <Router>
        <Routes>
            <Route exact path='/' element={<Page />} />
            <Route path='/user' element={<User />} />
        </Routes>
        </Router>
    );
}
  
export default App;