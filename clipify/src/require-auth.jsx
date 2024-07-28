import { useEffect } from "react";
import { urlContextState } from "./context";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const RequireAuth = ({ children }) => {
  const { isAuthenticated, loading } = urlContextState();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated && loading === false) navigate("/auth");
  }, [isAuthenticated, loading]);
  if (loading) return <BarLoader width={"100%"} color="#36d7b7"></BarLoader>;
  if(isAuthenticated) return children;
};

export default RequireAuth;
