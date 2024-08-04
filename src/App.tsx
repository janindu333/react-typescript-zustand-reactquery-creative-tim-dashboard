import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import useStore from './store';
import { MaterialUIControllerProvider } from './context'; // Adjust the import path as necessary

const App: React.FC = () => {
  const user = useStore(state => state.user);

  return (
    <MaterialUIControllerProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Login />} />
          <Route path="/" element={user ? <Dashboard /> : <Login />} />
        </Routes>
      </Router>
    </MaterialUIControllerProvider>
  );
};

export default App;
