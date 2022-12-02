import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute(props) {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  var currentLocation = window.location.pathname;

  async function validateToken() {
    let token = localStorage.getItem("token");
    if (token) {
      setIsAuth(true);
      return;
    } else {
      navigate.push("/login");
    }
  }

  useEffect(() => {
    validateToken();
  }, [currentLocation]);

  if (isAuth === null) return null;

  return props.children;
}

export default ProtectedRoute;
