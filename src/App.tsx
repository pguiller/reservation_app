import React, { Suspense } from 'react';
import CCircularProgress from './components/UI/CCircularProgress/CCircularProgress';
import { Route, Routes } from 'react-router';
import ProtectedRoute from './components/PrivateRoute/PrivateRoute';
import HomePage from './pages/HomePage/HomePage';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import AdminPage from './pages/AdminPage/AdminPage';
import PicturesPage from './pages/PicturesPage/PicturesPage';

function App() {
  return (
    <Suspense fallback={<CCircularProgress />}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <HomePage>
                <Suspense fallback={<CCircularProgress />}>
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <ProtectedRoute redirectPath="/">
                          <LandingPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin"
                      element={
                        <ProtectedRoute redirectPath="/" isAdminPath={true}>
                          <AdminPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/photos"
                      element={
                        <ProtectedRoute redirectPath="/">
                          <PicturesPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="*" element={<ErrorPage />} />
                  </Routes>
                </Suspense>
              </HomePage>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
