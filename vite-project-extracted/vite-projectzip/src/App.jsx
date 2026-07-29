import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import HomePage       from './pages/HomePage';
import DashboardLayout from './pages/DashboardLayout';
import './App.css';

function AppRouter() {
  const { page, theme, accent } = useApp();

  if (page === 'home') {
    return (
      <div className={`app theme-${theme} accent-${accent}`}>
        <HomePage />
      </div>
    );
  }

  return <DashboardLayout />;
}

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
