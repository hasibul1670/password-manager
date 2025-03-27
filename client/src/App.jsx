import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddPassword from './pages/AddPassword';
import Login from './pages/Login';
import PasswordList from './pages/PasswordList';

const App = () => {
  // TODO: Implement proper authentication check
  const isAuthenticated = true;

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/passwords"
          element={
            <PrivateRoute>
              <PasswordList />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-password"
          element={
            <PrivateRoute>
              <AddPassword />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/passwords" />} />
      </Routes>
    </Router>
  );
};

export default App;
