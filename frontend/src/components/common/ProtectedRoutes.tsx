import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";

const ProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: JSX.Element;
  allowedRoles: string[];
}) => {
  const { user } = useAppSelector((state) => state.auth);
  console.log(user)
  return user && allowedRoles.includes(user.role) ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
