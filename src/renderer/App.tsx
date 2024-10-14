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
// >>> Tyncho andubo por aqui...
import About from './app/pages/about';
import Imagenes from './app/pages/imagenes';
//import Usuarios from './app/pages/usuarios';
// >>> ...tratando que le reconozcan el url.(borrar esto)
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
            {/* Sobre nosotros >>> NavBar */}
            <Route path="/about" element={<About/>} />
            {/* Imagenes >>> NavBar */}
            <Route path="/imagenes" element={<Imagenes/>} />
            {/* Usuarios >>> NavBar */}
            {/* <Route path="/usuarios" element={<Usuarios/>} /> */}
          </Routes>
        </Router>
      </ServiceProvider>
    </AuthProvider>
  );
}
