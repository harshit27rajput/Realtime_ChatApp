import React, { useContext } from 'react';
import Chat from './components/Chat';
import Login from './pages/Login';
import { AuthProvider, AuthContext } from './auth/AuthContext';

function AppContent() {
  const { user } = useContext(AuthContext);

  return user ? <Chat /> : <Login />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
