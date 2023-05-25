import { Navigate} from 'react-router-dom';
import { authenticationService } from '../_services/authentication.service';

export default function PrivateRoute({ roles = [], element }) {
  const currentUser = authenticationService.getCurrentUser();

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  if (roles.length > 0 && !roles.includes(currentUser.role)) {
    return <Navigate to="/" replace />;
  }

  return (element);
}
