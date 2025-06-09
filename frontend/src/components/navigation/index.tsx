
import { useSelector } from 'react-redux';
import React from 'react';
import {  AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'

import { getIsAuthenticated } from '../../services/redux/selectors';
import Login from '../Login';
import CreatePost from '../CreatePost';
import MyPosts from '../MyPosts';


export const RootNavigation: React.FC = () => {

  const isAuthenticated = useSelector(getIsAuthenticated);
  



  return (
    <BrowserRouter>
        <Box className="min-h-screen flex flex-col">
          <AppBar position="static">
            <Toolbar className="justify-between">
              <Typography variant="h6" component={Link} to="/" className="no-underline text-white">
                Blog App
              </Typography>
              <div className="space-x-2">
                {isAuthenticated ? (
                  <>
                    <Button color="inherit" component={Link} to="/create">
                      Create Post
                    </Button>
                    <Button color="inherit" component={Link} to="/my-posts">
                      My Posts
                    </Button>
                    <Button color="inherit">
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button color="inherit" component={Link} to="/login">
                    Login
                  </Button>
                )}
              </div>
            </Toolbar>
          </AppBar>

          <Box className="flex-1">
            <Routes>
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
                path="/create"
                element={
                  isAuthenticated ? (
                    <CreatePost />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/my-posts"
                element={
                  isAuthenticated ? (
                    <MyPosts />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
  );
};
