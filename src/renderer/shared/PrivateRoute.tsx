import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../Context/AuthContext';

const PrivateRoute = () => {
  const { authUser, setAuthUser } = useAuthContext();

  const userInfo = window.localStorage.getItem('user');

  if (!userInfo) {
    return <Navigate to={'/login'} />;
  }

  try {
    const parsedUserInfo = JSON.parse(userInfo);
    setAuthUser(parsedUserInfo);
  } catch (e) {
    console.error('Error parsing user info from localStorage:', e);
    return <Navigate to={'/login'} />;
  }

  return <Outlet />;
};

export default PrivateRoute;