import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { getIsAuthenticated } from '../../services/redux/selectors';
import Login from '../Login';
import Register from '../Register';
import CreatePost from '../CreatePost';
import Posts from '../Posts';
import { logout } from '../../services/redux/slices';
import { store } from '../../services/redux/store';

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, isAuthenticated }) => {
  const location = useLocation();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Navigation Links Component
interface NavLinksProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ isAuthenticated, onLogout }) => {
  if (isAuthenticated) {
    return (
      <>
        <Button color="inherit" component={Link} to="/create-post">
          Create Post
        </Button>
        <Button color="inherit" component={Link} to="/my-posts">
          My Posts
        </Button>
        <Button color="inherit" onClick={onLogout}>
          Logout
        </Button>
      </>
    );
  }

  return (
    <>
      <Button color="inherit" component={Link} to="/login">
        Login
      </Button>
      <Button color="inherit" component={Link} to="/register">
        Register
      </Button>
    </>
  );
};

// Main Navigation Component
export const RootNavigation: React.FC = () => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('bornov-token');
    dispatch(logout());
    store.dispatch(logout());
  };

  return (
    <BrowserRouter>
      <Box className="min-h-screen flex flex-col">
        <AppBar position="static">
          <Toolbar className="justify-between">
            <Typography 
              variant="h6" 
              component={Link} 
              to="/" 
              className="no-underline text-white hover:text-gray-200 transition-colors"
            >
              Blog App
            </Typography>
            <div className="space-x-2">
              <NavLinks isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            </div>
          </Toolbar>
        </AppBar>

        <Box className="flex-1">
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/my-posts" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/my-posts" replace />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/register"
              element={
                isAuthenticated ? (
                  <Navigate to="/my-posts" replace />
                ) : (
                  <Register />
                )
              }
            />

            {/* Protected Routes */}
            <Route
              path="/create-post"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <CreatePost />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-post/:id"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <CreatePost />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-posts"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Posts />
                </ProtectedRoute>
              }
            />

            {/* 404 Route */}
            <Route
              path="*"
              element={
                <Box className="flex items-center justify-center min-h-[400px]">
                  <Typography variant="h4">404 - Page Not Found</Typography>
                </Box>
              }
            />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
};
