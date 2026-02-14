import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AllBusinesses from './pages/AllBusinesses';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import BusinessDetails from './pages/BusinessDetails';
import UserRegister from './pages/UserRegister';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          {/* Main wrapper for sticky footer layout preference */}
          <div className="flex flex-col min-h-screen">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/businesses" element={<AllBusinesses />} />
              <Route path="/register" element={<Register />} />
              <Route path="/register-user" element={<UserRegister />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/business/:id" element={<BusinessDetails />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
