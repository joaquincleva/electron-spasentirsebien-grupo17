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
import About from './app/pages/about';
import Imagenes from './app/pages/imagenes';
import Usuarios from './app/pages/usuarios';
import Perfil from './app/pages/perfiles/perfil';
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
            <Route path="/about" element={<About/>} />
            <Route path="/imagenes" element={<Imagenes/>} />
            <Route path="/usuarios" element={<Usuarios/>} />
            <Route path="/pages/perfiles/perfil" element={<Perfil/>} />
          </Routes>
        </Router>
      </ServiceProvider>
    </AuthProvider>
  );
}
