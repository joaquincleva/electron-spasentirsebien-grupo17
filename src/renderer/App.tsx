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
import Consulta from './app/pages/consultas/consulta'
import Turno from './app/pages/turnos/turnos';
import Servicios from './app/pages/servicios/servicios';
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
                <Route path="about" element={<About/>} />
                <Route path="imagenes" element={<Imagenes />} />
                <Route path="usuarios" element={<Usuarios />} />
                <Route path="perfil" element={<Perfil />} />                    {/* no-cargar-queda-en-spinner */}
                <Route path="servicios" element={<Servicios />} />              {/* no-carga-detalles */}
                <Route path="consulta" element={<Consulta />} />                {/* no-carga */}
                {/* <Route path="turnos" element={<Turno />} />                  falta-solucionar-calendario */}
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
