import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MantineProvider, AppShell } from '@mantine/core';
import { AuthProvider } from './contexts/SpotifyAuthContext';
import { AppHeader } from './components/Navbar';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import AlbumDetail from './pages/AlbumDetail';
import LoginRedirect from './components/LoginRedirect';
import './App.css';


function App() {
  return (
    <MantineProvider>
      <Router>
        <AuthProvider>
          <AppShell
            header={{ height: 60 }}
            padding="md"
          >
            <AppShell.Header>
              <AppHeader />
            </AppShell.Header>

            <AppShell.Main style={{ paddingTop: 76 }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/album/:id" element={<AlbumDetail />} />
                <Route path="/callback" element={<LoginRedirect />} />
              </Routes>
            </AppShell.Main>
          </AppShell>
        </AuthProvider>
      </Router>
    </MantineProvider>
  );
}

export default App;
