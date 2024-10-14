import {
  MemoryRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  Navigate,
} from 'react-router-dom';
import './App.css';
import './styles.css';
import { AuthProvider } from './Context/AuthContext';
import Login from './app/auth/login/page';
import NotFound from './shared/NotFound';
import PrivateRoute from './shared/PrivateRoute';
import Layout from './shared/Layout';
import Home from './app/pages/Home';
import SecondaryPage from './app/pages/SecondaryPage';
import { ServiceProvider } from './Context/ServiceContext';

export default function App() {
  return (
    <AuthProvider>
      <ServiceProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to={'/private'} />} />
            <Route path="private/*" element={<PrivateRoute />}>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="secondary" element={<SecondaryPage />} />
              </Route>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ServiceProvider>
    </AuthProvider>
  );
}
