import {
  //  React,
  useEffect,
  useState,
} from "react";
import { useHistory } from "react-router-dom";

function ProtectedRoute(props) {
  const [isAuth, setIsAuth] = useState(false);
  const history = useHistory();
  var currentLocation = window.location.pathname;

  async function validateToken() {
    let token = localStorage.getItem("token");
    console.log("🚀 ~ file: ProtectedRoute.js:15 ~ validateToken ~ token", token)
    if (token) {
      setIsAuth(true);
      return;
    } else {
      // history.push("/login");
    }
  }

  useEffect(() => {
    // validateToken();
  }, [currentLocation]);

  if (isAuth === null) return null;

  return props.children;
}

export default ProtectedRoute;
